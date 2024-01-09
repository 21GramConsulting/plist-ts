import {CommentFactory} from "#old-style/Expressions/CommentFactory";
import {Context} from "#old-style/Context";
import {CommentExpression} from "#old-style/Expressions/CommentExpression";

describe(`CommentFactory`, () => {
  jest.spyOn(global.console, `error`).mockImplementation(() => {});

  beforeEach(() => {jest.resetAllMocks();});

  describe(`#couldMatch`, () => {
    it(`should return true if the context is empty.`, () => {
      const context = new Context(``);
      const factory = new CommentFactory();
      expect(factory.couldMatch(context)).toBe(true);
    });

    it(`should return false if the context doesn't start with a slash.`, () => {
      const context = new Context(`a`);
      context.updatePresent();
      expect(new CommentFactory().couldMatch(context)).toBe(false);
    });

    it(`should return true if the context starts with a slash and there is no second character yet.`, () => {
      const context = new Context(`/`);
      context.updatePresent();
      expect(new CommentFactory().couldMatch(context)).toBe(true);
    });

    it(`should return true if the context starts with a slash and the second character is a slash.`, () => {
      const context = new Context(`//`);
      context.updatePresent();
      expect(new CommentFactory().couldMatch(context)).toBe(true);
    });

    it(`should return true if the context starts with a slash and the second character is a star.`, () => {
      const context = new Context(`/*`);
      expect(new CommentFactory().couldMatch(context)).toBe(true);
    });

    it(`should return false if the context starts with a slash and the second character is neither a slash nor a star.`, () => {
      const context = new Context(`/a`);
      context.updatePresent();
      context.updatePresent();
      expect(new CommentFactory().couldMatch(context)).toBe(false);
    });
  });

  describe(`#doesMatch`, () => {
    it(`should return false if the context is empty.`, () => {
      const context = new Context(``);
      expect(new CommentFactory().doesMatch(context)).toBe(false);
    });

    it(`should return false if the context doesn't start with a slash.`, () => {
      const context = new Context(`a`);
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(false);
    });

    it(`should return false if the context starts with a slash and there is no second character yet.`, () => {
      const context = new Context(`/`);
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(false);
    });

    it(`should return true if the context starts with a slash and the second character is a slash.`, () => {
      const context = new Context(`//`);
      context.updatePresent();
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(true);
    });

    it(`should return false if the context starts with a slash and the second character is neither a slash nor a star.`, () => {
      const context = new Context(`/a`);
      context.updatePresent();
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(false);
    });

    it(`should return true if the context starts with a slash and the second character is a star and there is no third character yet.`, () => {
      const context = new Context(`/* `);
      context.updatePresent();
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(true);
    });

    it(`should return true if the context starts with a slash and the second character is a star and the third character is not a slash.`, () => {
      const context = new Context(`/*a`);
      context.updatePresent();
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(true);
    });

    it(`should return false when the first two characters are /* but the context has no future.`, () => {
      const context = new Context(`/*`);
      context.updatePresent();
      context.updatePresent();
      expect(new CommentFactory().doesMatch(context)).toBe(false);
    });
  });

  describe(`#create`, () => {
    it(`should return undefined if the context does not match.`, () => {
      const context = new Context(``);
      const console = jest.spyOn(context, `console`);
      expect(new CommentFactory().create(context)).toBeUndefined();
      expect(console).toHaveBeenCalledWith(
        `error`,
        `Context does not match Comment.`
      );
    });

    it(`should return a CommentExpression if the context matches.`, () => {
      const context = new Context(`//`);
      context.updatePresent();
      context.updatePresent();
      const expression = new CommentFactory().create(context);
      expect(expression).toBeInstanceOf(CommentExpression);
      expect(expression?.context).toBe(context);
    });
  });
});
