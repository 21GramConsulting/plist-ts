import {Node, isNode} from ".";

export type Comment = string;
export type CommentNode = Node<`COMMENT`, Comment>;

export function isCommentNode(candidate: any): candidate is Comment {
  if (!isNode(candidate, `COMMENT`)) return false;
  if (typeof candidate.value !== `string`) return false;
  return true;
}