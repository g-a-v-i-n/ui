import { defineRule } from "@oxlint/plugins";

import type { ESTree, SourceCode } from "@oxlint/plugins";

type TypeAssertion = ESTree.TSAsExpression | ESTree.TSTypeAssertion;

const commentOwnerKinds = new Set([
  "ExportDefaultDeclaration",
  "ExportNamedDeclaration",
  "ExpressionStatement",
  "PropertyDefinition",
  "ReturnStatement",
  "ThrowStatement",
  "VariableDeclaration",
]);

function isTypeAssertion(node: ESTree.Node): node is TypeAssertion {
  return node.type === "TSAsExpression" || node.type === "TSTypeAssertion";
}

function isExportDeclaration(node: ESTree.Node): boolean {
  return node.type === "ExportNamedDeclaration" || node.type === "ExportDefaultDeclaration";
}

function isConstAssertion(node: TypeAssertion): boolean {
  return (
    node.typeAnnotation.type === "TSTypeReference" &&
    node.typeAnnotation.typeName.type === "Identifier" &&
    node.typeAnnotation.typeName.name === "const"
  );
}

/** In a chain like `x as unknown as T`, the outermost non-const assertion carries the one report. */
function hasEnclosingNonConstAssertion(node: TypeAssertion): boolean {
  let current: ESTree.Expression = node;
  let parent: ESTree.Node = node.parent;
  while (parent.type === "ParenthesizedExpression" || isTypeAssertion(parent)) {
    if (parent.expression !== current) return false;
    if (isTypeAssertion(parent) && !isConstAssertion(parent)) return true;
    current = parent;
    parent = parent.parent;
  }
  return false;
}

function hasSafetyComment(sourceCode: SourceCode, node: TypeAssertion): boolean {
  let current: ESTree.Node = node;
  while (true) {
    if (
      sourceCode
        .getCommentsBefore(current)
        .some((comment) => comment.end <= node.start && /\bSAFETY\s*:/u.test(comment.value))
    ) {
      return true;
    }
    const parent: ESTree.Node | null = current.parent;
    if (parent === null || parent.type === "Program") return false;
    // `export const x = raw as T;` keeps its comment before the `export` keyword,
    // so an owner statement defers to its enclosing export declaration.
    if (commentOwnerKinds.has(current.type) && !isExportDeclaration(parent)) return false;
    current = parent;
  }
}

/** Require every non-const type assertion to state the invariant TypeScript cannot express. */
export const requireSafetyCommentForTypeAssertionRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Require a nearby SAFETY comment for every TypeScript type assertion except const assertions.",
    },
    messages: {
      missingSafetyComment:
        "This type assertion has no `SAFETY:` justification. State the checked invariant immediately before the assertion or its containing statement.",
    },
  },
  createOnce(context) {
    const checkAssertion = (node: TypeAssertion) => {
      if (
        isConstAssertion(node) ||
        hasEnclosingNonConstAssertion(node) ||
        hasSafetyComment(context.sourceCode, node)
      ) {
        return;
      }
      context.report({ node, messageId: "missingSafetyComment" });
    };

    return {
      TSAsExpression: checkAssertion,
      TSTypeAssertion: checkAssertion,
    };
  },
});
