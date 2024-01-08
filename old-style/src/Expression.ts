import {PlistNode} from "@21gram-consulting/plist";
import {Context} from "./Context";

export abstract class Expression<Node extends PlistNode> {
  public isComplete: boolean = false;
  protected readonly context: Context;
  private result: Node | void = undefined;

  constructor(context: Context) {
    this.context = context;
  }

  public error(message: string): void {this.context.console(`error`, message);}

  public get value(): Node[`value`] | void {
    this.assureCompletion();
    return this.result?.value;
  }

  public get node(): Node | void {
    this.assureCompletion();
    return this.result;
  }

  protected abstract resolve(): Node | void;
  private assureCompletion() {
    if (this.isComplete) return;
    const result = this.resolve();
    this.result = result;
    this.isComplete = true;
  }
}