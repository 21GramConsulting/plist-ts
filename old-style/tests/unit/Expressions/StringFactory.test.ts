import {StringFactory} from "#old-style/Expressions/StringFactory";
import {Context} from "#old-style/Context";
import {StringExpression} from "#old-style/Expressions/StringExpression";

describe(`StringFactory`, () => {
  jest.spyOn(global.console, `error`).mockImplementation(() => {});

  beforeEach(() => {jest.resetAllMocks();});

  describe(`#couldMatch`, () => {
    it(`should return true if the context is empty.`, () => {
      const context = new Context(``);
      expect(new StringFactory().couldMatch(context)).toBe(true);
    });

    it(`should return false if the context starts with a double quote but has no future`, () => {
      const context = new Context(`"`);
      context.updatePresent();
      expect(new StringFactory().couldMatch(context)).toBe(false);
    });

    it(`should return true if the context starts with a double quote and has a future.`, () => {
      const context = new Context(`"a`);
      context.updatePresent();
      expect(new StringFactory().couldMatch(context)).toBe(true);
    });

    it(`should return false if the context starts with a non-acceptable character.`, () => {
      const context = new Context(`  `);
      context.updatePresent();
      expect(new StringFactory().couldMatch(context)).toBe(false);
    });

    it(`should return true if the context starts with an acceptable character.`, () => {
      const context = new Context(`_$asdf:qwer`);
      context.updatePresent();
      expect(new StringFactory().couldMatch(context)).toBe(true);
    });

    it(`should return true if the context starts with a double quote and has a future.`, () => {
      const context = new Context(`a`);
      context.updatePresent();
      expect(new StringFactory().couldMatch(context)).toBe(true);
    });
  });

  describe(`#doesMatch`, () => {
    it(`should return false if the context is empty.`, () => {
      const context = new Context(``);
      expect(new StringFactory().doesMatch(context)).toBe(false);
    });

    it(`should return false if the context starts with a double quote but has no future`, () => {
      const context = new Context(`"`);
      context.updatePresent();
      expect(new StringFactory().doesMatch(context)).toBe(false);
    });

    it.each([
      ` `, `\n`, `'`, `(`
    ])(`should return false if the context contains an unacceptable character.`, (start) => {
      const context = new Context(`${start}asdf`);
      context.updatePresent();
      expect(new StringFactory().doesMatch(context)).toBe(false);
    });

    it(`should return true if the content starts with an acceptable character, even if it has a future.`, () => {
      const context = new Context(`_`);
      context.updatePresent();
      expect(new StringFactory().doesMatch(context)).toBe(true);
    });
  });

  describe(`#create`, () => {
    it(`should return undefined if the context is empty.`, () => {
      const context = new Context(``);
      expect(new StringFactory().create(context)).toBe(undefined);
    });

    it(`should return undefined if the context starts with a double quote but has no future`, () => {
      const context = new Context(`"`);
      context.updatePresent();
      expect(new StringFactory().create(context)).toBe(undefined);
    });

    it(`should return undefined if the context starts with a non-acceptable character.`, () => {
      const context = new Context(`  `);
      context.updatePresent();
      expect(new StringFactory().create(context)).toBe(undefined);
    });

    it(`should return a StringExpression if the context starts with an acceptable character.`, () => {
      const context = new Context(`_$asdf:qwer`);
      context.updatePresent();
      expect(new StringFactory().create(context)).toBeInstanceOf(StringExpression);
    });

    it(`should return a StringExpression if the context starts with a double quote and has a future.`, () => {
      const context = new Context(`a`);
      context.updatePresent();
      expect(new StringFactory().create(context)).toBeInstanceOf(StringExpression);
    });
  });
});