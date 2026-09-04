import { defineRule } from "@oxlint/plugins";
import type { ESTree } from "@oxlint/plugins";

const FORBIDDEN_SYMBOL_NAME = "shape";

/** "shapeOfThing" -> ["shape", "Of", "Thing"]; "HTMLShape" -> ["HTML", "Shape"]; "SHAPE_ID" -> ["SHAPE", "ID"]. */
function nameSegments(name: string): string[] {
  return name
    .split(
      /[^a-zA-Z0-9]+|(?<=[a-z0-9])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=[a-zA-Z])(?=[0-9])|(?<=[0-9])(?=[a-zA-Z])/u
    )
    .filter(Boolean);
}

/** Whole-word / camel-segment match: "shapeOfThing" and "SHAPE_ID" yes, "shapeless" no. */
function containsForbiddenSymbolName(name: string): boolean {
  return nameSegments(name).some((segment) => segment.toLowerCase() === FORBIDDEN_SYMBOL_NAME);
}

/**
 * Only names the author chose: declared bindings, type declarations, and own
 * property keys. Member accesses, imported names, and JSX attributes name
 * someone else's API and cannot be renamed here.
 */
function isAuthorOwnedName(node: ESTree.Node): boolean {
  const { parent } = node;
  if (parent === null) return false;
  switch (parent.type) {
    case "VariableDeclarator":
      return parent.id === node;
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "TSDeclareFunction":
    case "TSEmptyBodyFunctionExpression":
      return parent.id === node || parent.params.some((param) => param === node);
    case "ArrowFunctionExpression":
      return parent.params.some((param) => param === node);
    case "ClassDeclaration":
    case "ClassExpression":
    case "TSTypeAliasDeclaration":
    case "TSInterfaceDeclaration":
    case "TSEnumDeclaration":
    case "TSModuleDeclaration":
      return parent.id === node;
    case "TSTypeParameter":
      return parent.name === node;
    case "CatchClause":
      return parent.param === node;
    case "LabeledStatement":
      return parent.label === node;
    // Destructuring, defaults, and rest: the local binding is ours, the source key is not.
    case "AssignmentPattern":
      return parent.left === node;
    case "ArrayPattern":
    case "RestElement":
      return true;
    case "Property":
      return parent.parent.type === "ObjectPattern"
        ? parent.value === node
        : parent.key === node && !parent.computed;
    case "PropertyDefinition":
    case "TSAbstractPropertyDefinition":
    case "MethodDefinition":
    case "TSAbstractMethodDefinition":
    case "AccessorProperty":
    case "TSAbstractAccessorProperty":
    case "TSPropertySignature":
    case "TSMethodSignature":
      return parent.key === node && !parent.computed;
    case "TSEnumMember":
      return parent.id === node;
    default:
      return false;
  }
}

/** Ban "shape" as a word or camel-case segment in symbol names the author controls. */
export const noForbiddenTermInSymbolNamesRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        'Disallow the word "shape" in declared JavaScript, TypeScript, and private symbol names and own property keys.',
    },
    messages: {
      forbiddenSymbolName:
        'Rename symbol "{{name}}" for its domain role; "shape" describes structure rather than ownership.',
    },
  },
  createOnce(context) {
    const reportForbiddenSymbolName = (node: ESTree.Node & { name: string }) => {
      if (!containsForbiddenSymbolName(node.name) || !isAuthorOwnedName(node)) return;
      context.report({
        node,
        messageId: "forbiddenSymbolName",
        data: { name: node.name },
      });
    };

    return {
      Identifier: reportForbiddenSymbolName,
      PrivateIdentifier: reportForbiddenSymbolName,
    };
  },
});
