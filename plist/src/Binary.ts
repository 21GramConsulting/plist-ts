import {CommentNode, Node, isCommentNode, isNode} from ".";

export type Binary = Uint8Array;
export type BinaryNode = Node<
  `BINARY`,
  Binary,
  | Node<`BINARY`>
  | CommentNode
>;

export function isBinaryNode(candidate: any): candidate is Binary {
  if (!isNode(candidate, `BINARY`)) return false;
  if (!(candidate.value instanceof Uint8Array)) return false;
  if (!(`children` in candidate)) return false;
  if (!Array.isArray(candidate.children)) return false;
  for (const child of candidate.children) {
    if (isBinaryNode(child)) continue;
    if (isCommentNode(child)) continue;
    return false;
  }
  return true;
}