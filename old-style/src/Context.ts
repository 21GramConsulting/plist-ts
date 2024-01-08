import {ConditionalKeys} from "type-fest";

export class Context {
  public readonly whole: string;

  private window: {start: number, end: number};
  private humanFriendlyPosition = {line: 1, column: 1};

  public get past(): string {
    return this.whole.slice(0, this.window.start);
  }

  public get present(): string {
    return this.whole.slice(this.window.start, this.window.end);
  }

  public get future(): string {
    return this.whole.slice(this.window.end);
  }

  public get hasFuture(): boolean {
    return this.window.end < this.whole.length;
  }

  constructor(input: string) {
    this.whole = input;
    this.window = {start: 0, end: 0};
  }

  public updatePresent(): void {
    if (!this.hasFuture) return;
    if (/\r?\n/.test(this.whole[this.window.end + 1]!)) {
      this.humanFriendlyPosition.line++;
      this.humanFriendlyPosition.column = 1;
    } else {
      this.humanFriendlyPosition.column++;
    }
    this.window.end++;
  }

  public commitPresent() {
    this.window.start = this.window.end;
  }

  public console<Method extends ConditionalKeys<Console, (...args: any) => any>>(
    method: Method,
    arg: Parameters<Console[Method]>[0]
  ) {
    console[method](
      arg,
      `line ${this.humanFriendlyPosition.line}, column ${this.humanFriendlyPosition.column}`
    );
  }

}