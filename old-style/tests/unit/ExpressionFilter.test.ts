import {Expression} from '#old-style/Expression';
import {ExpressionFactory} from '#old-style/ExpressionFactory';
import {ExpressionFilter} from '#old-style/ExpressionFilter';
import {Parsable} from '#old-style/Parsable';

describe(`ExpressionFilter`, () => {
  const stubParsable = new Parsable(``);

  describe(`#outOfOptions`, () => {
    it(`returns true when there are no expressions`, () => {
      const filter = new ExpressionFilter(stubParsable, []);
      expect(filter.outOfOptions).toBe(true);
    });
    it(`returns false when there are expressions`, () => {
      const filter = new ExpressionFilter(stubParsable, [{} as any]);
      expect(filter.outOfOptions).toBe(false);
    });
  });

  describe(`#undecided`, () => {
    it(`returns true when there are multiple expressions`, () => {
      const filter = new ExpressionFilter(stubParsable, [{}, {}] as any);
      expect(filter.undecided).toBe(true);
    });
    it(`returns false when there is one expressionFactory`, () => {
      const filter = new ExpressionFilter(stubParsable, [{}] as any);
      expect(filter.undecided).toBe(false);
    });
  });

  describe(`#expression`, () => {
    it(`returns undefined when there are no expressions`, () => {
      const filter = new ExpressionFilter(stubParsable, []);
      expect(filter.expression).toBe(undefined);
    });
    it(`returns undefined when there are multiple expressions`, () => {
      const filter = new ExpressionFilter(stubParsable, [{}, {}] as any);
      expect(filter.expression).toBe(undefined);
    });
    it(`returns the expression when there is one expression factory`, () => {
      const expression = {} as Expression<any>;
      const expressionFactory = {create: (_i) => expression} as ExpressionFactory<any>;
      const spy = jest.spyOn(expressionFactory, `create`);
      const filter = new ExpressionFilter(stubParsable, [expressionFactory]);
      expect(filter.expression).toBe(expression);
      expect(spy).toHaveBeenCalledWith(stubParsable);
    });
  });
});