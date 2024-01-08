import {PlistCommentNode, isPlistCommentNode} from "#plist/PlistComment";


describe(`isPlistCommentNode`, () => {
  describe(`with a comment node candidate`, () => {
    it(`should return true`, () => {
      const candidate = {type: `COMMENT`, value: `Hello, World!`};
      expect(isPlistCommentNode(candidate)).toBe(true);
    });
  });

  describe(`with a non-node candidate`, () => {
    it(`should return false`, () => {
      const candidate = `Hello, World!`;
      expect(isPlistCommentNode(candidate)).toBe(false);
    });
  });

  describe(`with a non-string value in the node`, () => {
    it(`should return false`, () => {
      const candidate = {
        type: `COMMENT`,
        value: 123
      };
      expect(isPlistCommentNode(candidate)).toBe(false);
    });
  });
});

describe(`PlistCommentNode`, () => {
  it(`should create a comment node`, () => {
    const value = `Hello, World!`;
    const result = PlistCommentNode(value);
    expect(result).toEqual({type: `COMMENT`, value});
  });
});