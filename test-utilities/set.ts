export function set<T extends jest.MockedObject<any>, K extends keyof T>(
  on: T,
  key: K,
  value: T[K]
) {
  on[key] = value;
}