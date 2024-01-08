import {isStringNode} from "#plist/String";

describe(`isStringNode`, () => {
  describe(`with a string node candidate`, () => {
    it(`should return true`, () => {
      const candidate = {
        type: `STRING`,
        value: `Hello, World!`
      };
      expect(isStringNode(candidate)).toBe(true);
    });
  });

  describe(`with a non-node candidate`, () => {
    it(`should return false`, () => {
      const candidate = `Hello, World!`;
      expect(isStringNode(candidate)).toBe(false);
    });
  });

  describe(`with a non-string value in the node`, () => {
    it(`should return false`, () => {
      const candidate = {
        type: `STRING`,
        value: 123
      };
      expect(isStringNode(candidate)).toBe(false);
    });
  });
});
