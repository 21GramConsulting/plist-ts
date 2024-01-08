import {PlistNode, isPlistNode} from "./PlistNode";

export type PlistComment = string;
export type PlistCommentNode = PlistNode<`COMMENT`, PlistComment>;

export function isPlistCommentNode(candidate: any): candidate is PlistComment {
  if (!isPlistNode(candidate, `COMMENT`)) return false;
  if (typeof candidate.value !== `string`) return false;
  return true;
}

export const PlistCommentNode = (
  value: PlistComment
): PlistCommentNode => ({type: `COMMENT`, value});