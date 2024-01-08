import {isPlistCommentNode} from "./PlistComment";
import {PlistNode, isPlistNode} from "./PlistNode";

export type PlistBinary = Uint8Array;
export type PlistBinaryNode = PlistNode<
  `BINARY`,
  PlistBinary,
  PlistNode<`BINARY` | `COMMENT`>
>;

export function isPlistBinaryNode(candidate: any): candidate is PlistBinary {
  if (!isPlistNode(candidate, `BINARY`)) return false;
  if (!(candidate.value instanceof Uint8Array)) return false;
  if (!(`children` in candidate)) return false;
  if (!Array.isArray(candidate.children)) return false;
  for (const child of candidate.children) {
    if (isPlistBinaryNode(child)) continue;
    if (isPlistCommentNode(child)) continue;
    return false;
  }
  return true;
}

export const PlistBinaryNode = (
  value: PlistBinary,
  children: PlistBinaryNode[`children`]
): PlistBinaryNode => ({type: `BINARY`, value, children});