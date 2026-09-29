/**
 * Generate the props tables for the preview docs site.
 *
 * Walks every ui/src/components/<dir>/index.tsx and, for each exported
 * component, records its props (name, type, required, default, description)
 * via the TypeScript compiler API. Props inherited from React's own DOM
 * typings (HTML/SVG/ARIA attributes) are dropped — the table notes that native
 * attributes are accepted instead — while props from Radix and the library
 * itself are kept. Defaults come from the component's destructuring defaults
 * or a `@default` JSDoc tag.
 *
 * Run (Node >= 23.6 strips TS types natively):
 *   node scripts/generate-docs-props.ts
 *
 * Writes preview/src/generated/props.json.
 */

import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMPONENTS_DIR = path.join(ROOT, "ui/src/components");
const OUT_FILE = path.join(ROOT, "preview/src/generated/props.json");

type PropDoc = {
  name: string;
  type: string;
  required: boolean;
  default?: string;
  description?: string;
};

type ComponentDoc = {
  description?: string;
  props: PropDoc[];
  /** True when props from React's DOM attribute types were dropped. */
  acceptsHtmlAttributes: boolean;
};

type Output = Record<string, Record<string, ComponentDoc>>;

// Props declared only by React's DOM typings are noise in a table.
const NATIVE_DECL = /node_modules\/(@types\/react|csstype)\//;
const SKIP_PROPS = new Set(["ref", "key"]);

const configPath = path.join(ROOT, "ui/tsconfig.json");
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
if (configFile.error) {
  throw new Error(ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n"));
}
const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));

const dirs = readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const entryFiles = dirs
  .map((dir) => path.join(COMPONENTS_DIR, dir, "index.tsx"))
  .filter((file) => existsSync(file));

const program = ts.createProgram({
  rootNames: entryFiles,
  options: { ...parsed.options, noEmit: true },
});
const checker = program.getTypeChecker();

const TYPE_FLAGS =
  ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;

function isLiteralLike(type: ts.Type): boolean {
  return Boolean(
    type.flags &
      (ts.TypeFlags.StringLiteral |
        ts.TypeFlags.NumberLiteral |
        ts.TypeFlags.BooleanLiteral |
        ts.TypeFlags.BigIntLiteral)
  );
}

/* Print a prop's type for the table. Optional props carry `| undefined`,
   which is stripped. A union made only of literals is spelled out member by
   member so local aliases like `Size` show their values; anything else keeps
   its alias name (ReactNode, CSSProperties, …). */
function formatType(type: ts.Type, optional: boolean): string {
  if (type.isUnion()) {
    const members = type.types.filter(
      (member) => !(member.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null))
    );
    if (members.length > 0 && members.every(isLiteralLike)) {
      const parts: string[] = [];
      let sawTrue = false;
      let sawFalse = false;
      for (const member of members) {
        const text = checker.typeToString(member, undefined, TYPE_FLAGS);
        if (text === "true") sawTrue = true;
        else if (text === "false") sawFalse = true;
        else parts.push(text);
      }
      if (sawTrue && sawFalse) parts.push("boolean");
      else if (sawTrue) parts.push("true");
      else if (sawFalse) parts.push("false");
      return parts.join(" | ");
    }
  }
  const text = checker.typeToString(type, undefined, TYPE_FLAGS);
  return optional ? text.replace(/ \| undefined$/, "") : text;
}

/* Defaults from the destructured first parameter: `size = "md"`, `as: Tag = "span"`. */
function readDefaults(declaration: ts.Declaration): Record<string, string> {
  let fn: ts.SignatureDeclaration | undefined;
  if (ts.isFunctionDeclaration(declaration)) {
    fn = declaration;
  } else if (
    ts.isVariableDeclaration(declaration) &&
    declaration.initializer &&
    (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))
  ) {
    fn = declaration.initializer;
  }
  const param = fn?.parameters[0];
  if (!param || !ts.isObjectBindingPattern(param.name)) return {};

  const defaults: Record<string, string> = {};
  for (const element of param.name.elements) {
    if (!element.initializer) continue;
    const name = element.propertyName ?? element.name;
    if (ts.isIdentifier(name)) defaults[name.text] = element.initializer.getText();
  }
  return defaults;
}

function describeComponent(exported: ts.Symbol): ComponentDoc | null {
  const symbol =
    exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!declaration) return null;

  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  const signature = signatures.find((sig) => sig.parameters.length > 0);
  if (!signature) return null;

  // Only React components: one props object in, something renderable out.
  const returnText = checker.typeToString(checker.getReturnTypeOfSignature(signature));
  if (!/Element|ReactNode|ReactElement/.test(returnText)) return null;

  const propsType = checker.getTypeOfSymbolAtLocation(signature.parameters[0], declaration);
  if (!(propsType.flags & ts.TypeFlags.Object) && !propsType.isUnionOrIntersection()) return null;

  const defaults = readDefaults(declaration);
  const props: PropDoc[] = [];
  let nativeCount = 0;

  for (const prop of checker.getPropertiesOfType(propsType)) {
    if (SKIP_PROPS.has(prop.name)) continue;
    const declarations = prop.declarations ?? [];
    const isNative =
      declarations.length > 0 &&
      declarations.every((decl) => NATIVE_DECL.test(decl.getSourceFile().fileName));
    if (isNative) {
      nativeCount += 1;
      continue;
    }

    const optional = Boolean(prop.flags & ts.SymbolFlags.Optional);
    const propType = checker.getTypeOfSymbolAtLocation(prop, declaration);
    const description = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();
    const defaultTag = prop
      .getJsDocTags(checker)
      .find((tag) => tag.name === "default" || tag.name === "defaultValue");
    const defaultValue = defaults[prop.name] ?? (defaultTag && ts.displayPartsToString(defaultTag.text).trim());

    const doc: PropDoc = { name: prop.name, type: formatType(propType, optional), required: !optional };
    if (defaultValue) doc.default = defaultValue;
    if (description) doc.description = description;
    props.push(doc);
  }

  const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
  const doc: ComponentDoc = { props, acceptsHtmlAttributes: nativeCount > 0 };
  if (description) doc.description = description;
  return doc;
}

const output: Output = {};
for (const dir of dirs) {
  const file = path.join(COMPONENTS_DIR, dir, "index.tsx");
  const source = program.getSourceFile(file);
  if (!source) continue;
  const moduleSymbol = checker.getSymbolAtLocation(source);
  if (!moduleSymbol) continue;

  const components: Record<string, ComponentDoc> = {};
  for (const exported of checker.getExportsOfModule(moduleSymbol)) {
    const doc = describeComponent(exported);
    if (doc) components[exported.name] = doc;
  }
  if (Object.keys(components).length > 0) output[dir] = components;
}

mkdirSync(path.dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, `${JSON.stringify(output, null, 2)}\n`);

const componentCount = Object.values(output).reduce((n, mod) => n + Object.keys(mod).length, 0);
console.log(
  `Wrote ${path.relative(ROOT, OUT_FILE)}: ${componentCount} components across ${Object.keys(output).length} modules`
);
