import {PlistArrayNode, isPlistArrayNode} from "#plist/PlistArray";

describe(`isPlistArrayNode`, () => {
  describe(`when the candidate is not a node`, () => {
    it(`should return false for null`, () => {
      expect(isPlistArrayNode(null)).toBe(false);
    });

    it(`should return false for undefined`, () => {
      expect(isPlistArrayNode(undefined)).toBe(false);
    });

    it(`should return false for a string`, () => {
      expect(isPlistArrayNode(`not a node`)).toBe(false);
    });

    it(`should return false for a number`, () => {
      expect(isPlistArrayNode(123)).toBe(false);
    });

    it(`should return false for a boolean`, () => {
      expect(isPlistArrayNode(true)).toBe(false);
    });

    it(`should return false for an object`, () => {
      expect(isPlistArrayNode({foo: `bar`})).toBe(false);
    });
  });

  it(`should return false for an array with no type`, () => {
    expect(isPlistArrayNode([])).toBe(false);
  });

  it(`should return false for an array with an invalid type`, () => {
    expect(isPlistArrayNode({type: `INVALID`})).toBe(false);
  });

  it(`should return false for an array with an invalid value`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: null})).toBe(false);
  });

  it(`should return false for an array with no children`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: []})).toBe(false);
  });

  it(`should return false for an array with non-array value candidates`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: [], items: 123})).toBe(false);
  });

  it(`should return false for an array with non-node value candidates`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: [], items: [123]})).toBe(false);
  });

  it(`should return true for an array with no value candidates`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: [], items: []})).toBe(true);
  });

  it(`should return true for an array with node value candidates`, () => {
    expect(isPlistArrayNode({
      type: `ARRAY`,
      value: [`foo`],
      items: [{type: `STRING`, value: `foo`}]
    })).toBe(true);
  });

  it(`should return true for an array with node value candidates and a value`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: [], items: [{type: `STRING`, value: `foo`}]})).toBe(true);
  });

  it(`should return true for an array with node value candidates and a value`, () => {
    expect(isPlistArrayNode({type: `ARRAY`, value: [], items: [{type: `STRING`, value: `foo`}]})).toBe(true);
  });

});

describe(`PlistArrayNode`, () => {
  it(`should return a node with the correct type`, () => {
    expect(PlistArrayNode([], []).type).toBe(`ARRAY`);
  });

  it(`should return a node with the correct value`, () => {
    expect(PlistArrayNode([], []).value).toEqual([]);
    expect(PlistArrayNode([`foo`], []).value).toEqual([`foo`]);
  });

  it(`should return a node with the correct children`, () => {
    expect(PlistArrayNode([], []).children).toEqual([]);
    expect(PlistArrayNode([], [{type: `STRING`, value: `foo`}]).children).toEqual([{type: `STRING`, value: `foo`}]);
  });
});
