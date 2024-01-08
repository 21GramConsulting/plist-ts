import {ExpressionFactory} from "./ExpressionFactory";
import {ExpressionFilter} from "./ExpressionFilter";
import {Parsable} from "./Parsable";

export class ExpressionFilterFactory {
  private expressionFactories: ExpressionFactory[];

  constructor(expressions: ExpressionFactory[]) {
    this.expressionFactories = expressions;
  }

  create(parsable: Parsable): ExpressionFilter {
    return new ExpressionFilter(this.expressionFactories, parsable);
  }
}