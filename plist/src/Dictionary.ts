import {Node, isNode} from ".";

export type Dictionary = Record<string, any>;
export type DictionaryNode = Node<`DICTIONARY`, Dictionary, Node>;

export function isDictionaryNode(candidate: any): candidate is Dictionary {
  if (!isNode(candidate, `DICTIONARY`)) return false;
  if (typeof candidate.value !== `object`) return false;
  if (candidate.value === null) return false;
  if (!(`children` in candidate)) return false;
  if (!Array.isArray(candidate.children)) return false;
  if (!candidate.children.every(v => isNode(v))) return false;
  return true;
}