import {Expression} from "./Expression";
import {ExpressionFactory} from "./ExpressionFactory";
import {Parsable} from "./Parsable";

export class ExpressionFilter {
  public readonly parsable: Parsable;
  private expressions: ExpressionFactory<any>[];

  constructor(
    parsable: Parsable,
    expressions: ExpressionFactory<any>[]
  ) {
    this.expressions = expressions;
    this.parsable = parsable;
  }

  public get outOfOptions(): boolean {
    return this.expressions.length === 0;
  }

  public get undecided(): boolean {
    return this.expressions.length > 1;
  }

  public get expression(): Expression<any> | void {
    if (this.outOfOptions) return;
    if (this.undecided) return;
    return this.expressions[0]?.create(this.parsable);
  }

}