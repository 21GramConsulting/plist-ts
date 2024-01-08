import {isCommentNode} from "#plist/Comment";


describe(`isCommentNode`, () => {
  describe(`with a comment node candidate`, () => {
    it(`should return true`, () => {
      const candidate = {type: `COMMENT`, value: `Hello, World!`};
      expect(isCommentNode(candidate)).toBe(true);
    });
  });

  describe(`with a non-node candidate`, () => {
    it(`should return false`, () => {
      const candidate = `Hello, World!`;
      expect(isCommentNode(candidate)).toBe(false);
    });
  });

  describe(`with a non-string value in the node`, () => {
    it(`should return false`, () => {
      const candidate = {
        type: `COMMENT`,
        value: 123
      };
      expect(isCommentNode(candidate)).toBe(false);
    });
  });
});