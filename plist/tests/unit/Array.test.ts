import {isArrayNode} from "#plist/Array";

describe(`isArrayNode`, () => {
  describe(`when the candidate is not a node`, () => {
    it(`should return false for null`, () => {
      expect(isArrayNode(null)).toBe(false);
    });

    it(`should return false for undefined`, () => {
      expect(isArrayNode(undefined)).toBe(false);
    });

    it(`should return false for a string`, () => {
      expect(isArrayNode(`not a node`)).toBe(false);
    });

    it(`should return false for a number`, () => {
      expect(isArrayNode(123)).toBe(false);
    });

    it(`should return false for a boolean`, () => {
      expect(isArrayNode(true)).toBe(false);
    });

    it(`should return false for an object`, () => {
      expect(isArrayNode({foo: `bar`})).toBe(false);
    });
  });

  it(`should return false for an array with no type`, () => {
    expect(isArrayNode([])).toBe(false);
  });

  it(`should return false for an array with an invalid type`, () => {
    expect(isArrayNode({type: `INVALID`})).toBe(false);
  });

  it(`should return false for an array with an invalid value`, () => {
    expect(isArrayNode({type: `ARRAY`, value: null})).toBe(false);
  });

  it(`should return false for an array with no children`, () => {
    expect(isArrayNode({type: `ARRAY`, value: []})).toBe(false);
  });

  it(`should return false for an array with non-array value candidates`, () => {
    expect(isArrayNode({type: `ARRAY`, value: [], items: 123})).toBe(false);
  });

  it(`should return false for an array with non-node value candidates`, () => {
    expect(isArrayNode({type: `ARRAY`, value: [], items: [123]})).toBe(false);
  });

  it(`should return true for an array with no value candidates`, () => {
    expect(isArrayNode({type: `ARRAY`, value: [], items: []})).toBe(true);
  });

  it(`should return true for an array with node value candidates`, () => {
    expect(isArrayNode({
      type: `ARRAY`,
      value: [`foo`],
      items: [{type: `STRING`, value: `foo`}]
    })).toBe(true);
  });

  it(`should return true for an array with node value candidates and a value`, () => {
    expect(isArrayNode({type: `ARRAY`, value: [], items: [{type: `STRING`, value: `foo`}]})).toBe(true);
  });

  it(`should return true for an array with node value candidates and a value`, () => {
    expect(isArrayNode({type: `ARRAY`, value: [], items: [{type: `STRING`, value: `foo`}]})).toBe(true);
  });

});