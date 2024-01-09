import {Context} from "#old-style/Context";
import {CommentExpression} from "#old-style/Expressions/CommentExpression";
import {set} from "#test-utilities/set";
import {PlistCommentNode} from "@21gram-consulting/plist";

describe(`CommentExpression`, () => {
  let context: Context;
  let expression: CommentExpression;
  let console: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    context = new Context(``);
    expression = new CommentExpression(context);
    console = jest.spyOn(context, `console`).mockImplementation(() => {});

    expect(expression.context).toStrictEqual(context);
  });

  describe(`resolution failures`, () => {
    let expectedMessage: string;

    afterEach(() => {
      expect(expression.node).toBeUndefined();
      expect(expression.value).toBe(undefined);
      expect(console).toHaveBeenCalledWith(`error`, expectedMessage);
    });

    it.each([``, `a`])(`should fail if the first character is not a slash`, (input) => {
      set(context, `whole`, input);
      context.updatePresent();
      expectedMessage = `First character of comment expression is invalid. Comments should start as "//" or "/*". Received "${input}"`;
    });

    it.each([`/a`, `/`])(`should fail if the second character is not a slash or a star`, (input) => {
      set(context, `whole`, input);
      repeatedUpdate(2, context);
      expectedMessage = `Second character of comment expression is invalid. Comments should start as "//" or "/*". Received "${input}".`;
    });

    it.each(
      [`/*`, `/* asdf`, `/* asdf \n asdf`]
    )(`should fail if the block comment is not closed`, (input) => {
      set(context, `whole`, input);
      repeatedUpdate(2, context);
      expectedMessage = `Unclosed block comment.`;
    });
  });

  describe(`correct line comment`, () => {
    afterEach(() => {expect(console).not.toHaveBeenCalled();});

    it(`should resolve when we only have //`, () => {
      set(context, `whole`, `//`);
      repeatedUpdate(2, context);
      expect(expression.value).toBe(``);
      expect(expression.node).toEqual(PlistCommentNode(``));
    });

    it.each([
      `//1`,
      `// asdf2`,
      `// asdf3 \n asdf`,
      `// asdf4 \r\n asdf`,
      `// asdf5 \r asdf`,
      `// asdf6 \r asdf \n asdf`,
      `// asdf7 \n asdf \r asdf`,
      `// asdf8 \n asdf \r\n asdf`,
      `//9 `,
      `// asdf10 `,
      `// asdf11\n asdf`,
      `// asdf12\r\n asdf`,
      `// asdf13\r asdf`,
      `// asdf14\r asdf \n asdf`,
      `// asdf15\n asdf \r asdf`,
      `// asdf16\n asdf \r\n asdf`
    ])(`shouldresolve %s`, input => {
      set(context, `whole`, input);
      repeatedUpdate(2, context);
      const expected = input.slice(2).split(/(\r|\n)/)[0]!;
      expect(expression.value).toBe(expected);
      expect(expression.node).toEqual(PlistCommentNode(expected));
    });
  });

  afterEach(() => {
    expect(expression.isComplete).toBe(true);
  });

  describe(`correct block comment`, () => {
    afterEach(() => {expect(console).not.toHaveBeenCalled();});

    it(`should resolve when we only have /**/`, () => {
      set(context, `whole`, `/**/`);
      repeatedUpdate(2, context);
      expect(expression.value).toBe(``);
      expect(expression.node).toEqual(PlistCommentNode(``));
    });

    it.each([
      `/*1*/`,
      `/* asdf2*/`,
      `/* asdf3 \n asdf*/`,
      `/* asdf4 \r\n asdf*/`,
      `/* asdf5 \r asdf*/`,
      `/* asdf6 \r asdf \n asdf*/`,
      `/* asdf7 \n asdf \r asdf*/`,
      `/* asdf8 \n asdf \r\n asdf*/`,
      `/*9 */`,
      `/* asdf10 */`,
      `/* asdf11\n asdf*/`,
      `/* asdf12\r\n asdf*/`,
      `/* asdf13\r asdf*/`,
      `/* asdf14\r asdf \n asdf*/`,
      `/* asdf15\n asdf \r asdf*/`,
      `/* asdf16\n asdf \r\n asdf*/`
    ])(`should resolve %s`, input => {
      set(context, `whole`, input);
      repeatedUpdate(2, context);
      const expected = input.slice(2, -2);
      expect(expression.value).toBe(expected);
      expect(expression.node).toEqual(PlistCommentNode(expected));
    });
  });
});

function repeatedUpdate(count: number, context: Context): void {
  for (let i = 0; i < count; i++) context.updatePresent();
}