import {PlistNode, isPlistNode} from "./PlistNode";

export type PlistString = string;
export type PlistStringNode = PlistNode<`STRING`, PlistString>;

export function isPlistStringNode(candidate: any): candidate is PlistString {
  if (!isPlistNode(candidate, `STRING`)) return false;
  if (typeof candidate.value !== `string`) return false;
  return true;
}

export const PlistStringNode = (
  value: PlistString
): PlistStringNode => ({type: `STRING`, value});