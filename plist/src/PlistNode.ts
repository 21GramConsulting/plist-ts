import {Simplify} from 'type-fest';

export const plistTypes = [`ARRAY`, `BINARY`, `COMMENT`, `DICTIONARY`, `STRING`] as const;
export type PlistType = typeof plistTypes[number];
export type PlistNode<
  Type extends PlistType = any,
  Value = any,
  Child = void
> = Simplify<
  & {type: Type; value: Value}
  & (
    Child extends void
    ? {}
    : {children: Child[]}
  )
>;

export function isPlistNode<T extends PlistType>(candidate: any, type: T): candidate is PlistNode<T, any>;
export function isPlistNode(candidate: any): candidate is PlistNode<any, any>;
export function isPlistNode(candidate: any, type?: any): candidate is PlistNode<any, any> {
  if (typeof candidate !== `object`) return false;
  if (candidate === null) return false;
  if (typeof candidate.type !== `string`) return false;
  if (!plistTypes.includes(candidate.type)) return false;
  if (type !== undefined && candidate.type !== type) return false;
  if (!(`value` in candidate)) return false;
  return true;
}