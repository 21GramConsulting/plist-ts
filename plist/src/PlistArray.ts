import {PlistNode, isPlistNode} from "./PlistNode";

export type PlistArray = any[];
export type PlistArrayNode = PlistNode<`ARRAY`, PlistArray, PlistNode>;

export function isPlistArrayNode(candidate: any): candidate is PlistArray {
  if (!isPlistNode(candidate, `ARRAY`)) return false;
  if (!Array.isArray(candidate.value)) return false;
  if (!(`items` in candidate)) return false;
  if (!Array.isArray(candidate.items)) return false;
  if (!candidate.items.every(v => isPlistNode(v))) return false;
  return true;
}

export const PlistArrayNode = (
  value: PlistArray,
  children: PlistNode[]
): PlistArrayNode => ({type: `ARRAY`, value, children});
