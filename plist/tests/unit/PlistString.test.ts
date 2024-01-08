import {PlistStringNode, isPlistStringNode} from "#plist/PlistString";

describe(`isPlistStringNode`, () => {
  describe(`with a string node candidate`, () => {
    it(`should return true`, () => {
      const candidate = {
        type: `STRING`,
        value: `Hello, World!`
      };
      expect(isPlistStringNode(candidate)).toBe(true);
    });
  });

  describe(`with a non-node candidate`, () => {
    it(`should return false`, () => {
      const candidate = `Hello, World!`;
      expect(isPlistStringNode(candidate)).toBe(false);
    });
  });

  describe(`with a non-string value in the node`, () => {
    it(`should return false`, () => {
      const candidate = {
        type: `STRING`,
        value: 123
      };
      expect(isPlistStringNode(candidate)).toBe(false);
    });
  });
});

describe(`PlistStringNode`, () => {
  it(`should create a string node`, () => {
    expect(PlistStringNode(`Hello, World!`)).toEqual({
      type: `STRING`,
      value: `Hello, World!`
    });
  });
});