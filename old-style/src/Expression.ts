import {Parsable} from "./Parsable";

export abstract class Expression<Value> {
  public isComplete: boolean = false;
  protected readonly parsable: Parsable;
  private result: Value | void = undefined;

  constructor(parsable: Parsable) {
    this.parsable = parsable;
  }

  public get value(): Value | void {
    if (!this.isComplete) {
      const result = this.resolve();
      this.result = result;
      this.isComplete = true;
    }
    return this.result;
  }

  protected abstract resolve(): Value | void;
}