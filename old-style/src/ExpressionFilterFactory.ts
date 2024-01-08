import {ExpressionFactory} from "./ExpressionFactory";
import {ExpressionFilter} from "./ExpressionFilter";
import {Parsable} from "./Parsable";

export class ExpressionFilterFactory {
  private expressionFactories: ExpressionFactory<any>[];

  constructor(expressions: ExpressionFactory<any>[]) {
    this.expressionFactories = expressions;
  }

  create(parsable: Parsable): ExpressionFilter {
    return new ExpressionFilter(this.expressionFactories, parsable);
  }
}