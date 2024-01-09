import {Context} from "#old-style/Context";
import {StringExpression} from "#old-style/Expressions/StringExpression";
import {set} from "#test-utilities/set";
import {PlistStringNode} from "@21gram-consulting/plist";

describe(`StringExpression`, () => {
  let context: Context;
  let expression: StringExpression;
  let console: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    context = new Context(``);
    expression = new StringExpression(context);
    console = jest.spyOn(context, `console`).mockImplementation(() => {});

    expect(expression.context).toStrictEqual(context);
  });

  afterEach(() => {
    expect(expression.isComplete).toBe(true);
  });

  describe(`resolution failures`, () => {
    let expectedMessage: string;

    afterEach(() => {
      expect(expression.node).toBeUndefined();
      expect(expression.value).toBe(undefined);
      expect(console).toHaveBeenCalledWith(`error`, expectedMessage);
    });

    it.each([
      `"`, `"a`, `"asdf\nqwer`
    ])(`should fail if the string is quoted but unclosed`, (input) => {
      set(context, `whole`, input);
      context.updatePresent();
      expectedMessage = `Unclosed string.`;
    });
  });

  describe(`correct quoted string`, () => {
    afterEach(() => {expect(console).not.toHaveBeenCalled();});

    it.each([
      `"a"`,
      `"asdf"`,
      `"asdf qwer"`,
      `"asdf\\nqwer"`,
      `"asdf\\"qwer"`,
      `"asdf\\\\"`
    ])(`should resolve %s`, (input) => {
      set(context, `whole`, input);
      context.updatePresent();
      const expected = input.slice(1, -1);
      expect(expression.node).toStrictEqual(PlistStringNode(expected));
      expect(expression.value).toBe(expected);
    });
  });

  describe(`correct simple string`, () => {
    afterEach(() => {expect(console).not.toHaveBeenCalled();});

    it.each([
      [`a`, `a`],
      [`asdf`, `asdf`],
      [`asdf qwer`, `asdf`],
      [`asdf\\nqwer`, `asdf`],
      [`asdf\nqwer`, `asdf`],
      [`asdf\\"qwer`, `asdf`],
      [`asdf\\\\`, `asdf`]
    ])(`should resolve from %s to %s`, (input, output) => {
      set(context, `whole`, input);
      context.updatePresent();
      expect(expression.node).toStrictEqual(PlistStringNode(output));
      expect(expression.value).toBe(output);
    });
  });
});
