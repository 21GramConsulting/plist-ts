import {Simplify} from 'type-fest';

export const types = [`ARRAY`, `BINARY`, `COMMENT`, `DICTIONARY`, `STRING`] as const;
export type Type = typeof types[number];
export type Node<
  T extends Type = any,
  Value = any,
  Child = void
> = Simplify<
  & {type: T; value: Value}
  & (
    Child extends void
    ? {}
    : {children: Child[]}
  )
>;

export function isNode<T extends Type>(candidate: any, type: T): candidate is Node<T, any>;
export function isNode(candidate: any): candidate is Node<any, any>;
export function isNode(candidate: any, type?: any): candidate is Node<any, any> {
  if (typeof candidate !== `object`) return false;
  if (candidate === null) return false;
  if (typeof candidate.type !== `string`) return false;
  if (!types.includes(candidate.type)) return false;
  if (type !== undefined && candidate.type !== type) return false;
  if (!(`value` in candidate)) return false;
  return true;
}