import {isBinaryNode} from "#plist/Binary";

describe(`isBinaryNode`, () => {
  describe(`when the candidate is not a node`, () => {
    it(`should return false`, () => {
      const candidate = null;
      const result = isBinaryNode(candidate);
      expect(result).toBe(false);
    });

    it(`should return false`, () => {
      const candidate = 123;
      const result = isBinaryNode(candidate);
      expect(result).toBe(false);
    });
  });

  it(`should return false when the candidate's value is not a Uint8Array`, () => {
    const candidate = {
      type: `BINARY`,
      value: null,
      children: []
    };
    const result = isBinaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false when the candidate doesn't have a children field`, () => {
    const candidate = {type: `BINARY`, value: new Uint8Array()};
    const result = isBinaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false when the candidate's children is not an array`, () => {
    const candidate = {type: `BINARY`, value: new Uint8Array(), children: null};
    const result = isBinaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return false when at least one child is neither a binary nor a comment`, () => {
    const candidate = {type: `BINARY`, value: new Uint8Array(), children: [123]};
    const result = isBinaryNode(candidate);
    expect(result).toBe(false);
  });

  it(`should return true when the candidate is a binary node with no children`, () => {
    const candidate = {type: `BINARY`, value: new Uint8Array(), children: []};
    const result = isBinaryNode(candidate);
    expect(result).toBe(true);
  });

  it(`should return true when the candidate is a binary node with children`, () => {
    const candidate = {
      type: `BINARY`,
      value: new Uint8Array(),
      children: [
        {type: `BINARY`, value: new Uint8Array(), children: []}
      ]
    };
    const result = isBinaryNode(candidate);
    expect(result).toBe(true);
  });

  it(`should return true when the candidate is a binary node with comments`, () => {
    const candidate = {
      type: `BINARY`,
      value: new Uint8Array(),
      children: [
        {type: `COMMENT`, value: `foo`}
      ]
    };
    const result = isBinaryNode(candidate);
    expect(result).toBe(true);
  });

});