import {PlistNode, isPlistNode} from "./PlistNode";

export type PlistDictionary = Record<string, any>;
export type PlistDictionaryNode = PlistNode<`DICTIONARY`, PlistDictionary, PlistNode>;

export function isPlistDictionaryNode(candidate: any): candidate is PlistDictionary {
  if (!isPlistNode(candidate, `DICTIONARY`)) return false;
  if (typeof candidate.value !== `object`) return false;
  if (candidate.value === null) return false;
  if (!(`children` in candidate)) return false;
  if (!Array.isArray(candidate.children)) return false;
  if (!candidate.children.every(v => isPlistNode(v))) return false;
  return true;
}

export const PlistDictionaryNode = (
  value: PlistDictionary,
  children: PlistNode[]
): PlistDictionaryNode => ({type: `DICTIONARY`, value, children});