import {Node, isNode} from ".";

export type String = string;
export type StringNode = Node<`STRING`, String>;

export function isStringNode(candidate: any): candidate is String {
  if (!isNode(candidate, `STRING`)) return false;
  if (typeof candidate.value !== `string`) return false;
  return true;
}