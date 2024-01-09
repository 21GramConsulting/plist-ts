import {Expression} from "./Expression";
import {ExpressionFactory} from "./ExpressionFactory";
import {Context} from "./Context";

export class ExpressionFilter {
  public readonly context: Context;
  private expressions: ExpressionFactory<any>[];

  constructor(
    context: Context,
    expressions: ExpressionFactory<any>[]
  ) {
    this.expressions = expressions;
    this.context = context;
  }

  public get outOfOptions(): boolean {
    return this.expressions.length === 0;
  }

  public get undecided(): boolean {
    return this.expressions.length > 1;
  }

  public narrowDown(): void {
    this.expressions = this.expressions.filter(e => e.couldMatch(this.context));
  }

  public get expression(): Expression<any> | void {
    if (this.outOfOptions) return;
    if (this.undecided) return;
    return this.expressions[0]?.create(this.context);
  }

}