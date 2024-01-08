import {Node, isNode} from "./Node";

export type Array = any[];
export type ArrayNode = Node<`ARRAY`, Array, Node>;

export function isArrayNode(candidate: any): candidate is Array {
  if (!isNode(candidate, `ARRAY`)) return false;
  if (!Array.isArray(candidate.value)) return false;
  if (!(`items` in candidate)) return false;
  if (!Array.isArray(candidate.items)) return false;
  if (!candidate.items.every(v => isNode(v))) return false;
  return true;
}