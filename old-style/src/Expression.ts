import {Context} from "./Context";

export abstract class Expression<Value> {
  public isComplete: boolean = false;
  protected readonly context: Context;
  private result: Value | void = undefined;

  constructor(context: Context) {
    this.context = context;
  }

  public error(message: string): void {this.context.console(`error`, message);}

  public get value(): Value | void {
    if (!this.isComplete) {
      const result = this.resolveNode();
      this.result = result;
      this.isComplete = true;
    }
    return this.result;
  }

  protected abstract resolveNode(): Value | void;
}