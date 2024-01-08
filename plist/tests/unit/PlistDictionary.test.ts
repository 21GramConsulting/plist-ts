import {PlistDictionaryNode, isPlistDictionaryNode} from "#plist/PlistDictionary";

describe(`isPlistDictionaryNode`, () => {
  describe(`when the candidate is not a node`, () => {
    it(`should return false for null`, () => {
      const candidate = null;
      const result = isPlistDictionaryNode(candidate);
      expect(result).toBe(false);
    });

    it(`should return false for undefined`, () => {
      const candidate = undefined;
      const result = isPlistDictionaryNode(candidate);
      expect(result).toBe(false);
    });

    it(`should return false for a string`, () => {
      const candidate = `not a node`;
      const result = isPlistDictionaryNode(candidate);
      expect(result).toBe(false);
    });

    it(`should return false for a number`, () => {
      const candidate = 123;
      const result = isPlistDictionaryNode(candidate);
      expect(result).toBe(false);
    });

    it(`should return false for a boolean`, () => {
      const candidate = true;
      const result = isPlistDictionaryNode(candidate);
      expect(result).toBe(false);
    });

    it(`should return false for an array`, () => {
      const candidate = [1, 2, 3];
      const result = isPlistDictionaryNode(candidate);
      expect(result).toBe(false);
    });
  });

  it(`should return false for a null object`, () => {
    const candidate = Object.create(null);
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false for an object with no prototype`, () => {
    const candidate = Object.create(null);
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false for an object with a prototype`, () => {
    const candidate = Object.create({foo: `bar`});
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false when the value is a non-object`, () => {
    const candidate = {type: `DICTIONARY`, value: 123, children: []};
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false for a node with a null value`, () => {
    const candidate = {
      type: `DICTIONARY`,
      value: null,
      children: []
    };
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false when it has no children field defined`, () => {
    const candidate = {
      type: `DICTIONARY`,
      value: {}
    };
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false for a node with a non-array children`, () => {
    const candidate = {
      type: `DICTIONARY`,
      value: {},
      children: 123
    };
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false for a node with a children array with non-nodes`, () => {
    const candidate = {
      type: `DICTIONARY`,
      value: {},
      children: [123]
    };
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return true for a node with a children array with nodes`, () => {
    const candidate = {
      type: `DICTIONARY`,
      value: {},
      children: [{type: `STRING`, value: `foo`}]
    };
    const result = isPlistDictionaryNode(candidate);
    expect(result).toBe(true);
  });

});

describe(`PlistDictionaryNode`, () => {
  it(`should create a node with the correct type`, () => {
    expect((PlistDictionaryNode({}, [])).type).toEqual(`DICTIONARY`);
  });

  it(`should create a node with the correct value`, () => {
    expect((PlistDictionaryNode({}, [])).value).toEqual({});
  });

  it(`should create a node with the correct children`, () => {
    expect((PlistDictionaryNode({}, [])).children).toEqual([]);
  });
});
