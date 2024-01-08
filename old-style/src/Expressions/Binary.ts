import {error} from "console";
import {Expression} from "../Expression";
import {CommentFactory} from "./CommentFactory";

export class Binary extends Expression<Uint8Array> {
  protected resolve(): Uint8Array | void {
    const result: number[] = [];
    const commentFactory = new CommentFactory();

    this.parsable.commitPresent();
    let didClose = false;
    let previousHexBit: HexBit | undefined;
    while (this.parsable.hasFuture) {
      this.parsable.updatePresent();
      if (commentFactory.couldMatch(this.parsable)) {
        if (commentFactory.doesMatch(this.parsable)) {
          const comment = commentFactory.create(this.parsable);
          if (comment === undefined) return error(`Comment could not be created.`);
          if (!comment.isComplete) return error(`Incomplete comment.`);
          comment.value;
        }
        continue;
      }

      if (/\s/.test(this.parsable.present)) {
        this.parsable.commitPresent();
        continue;
      }

      if (this.parsable.present === `>`) {
        didClose = true;
        this.parsable.commitPresent();
        break;
      }

      if (isHexBit(this.parsable.present)) {
        if (previousHexBit === undefined) {
          previousHexBit = this.parsable.present;
        } else {
          result.push(parseInt(previousHexBit.concat(this.parsable.present), 16));
          previousHexBit = undefined;
        }
        this.parsable.commitPresent();
        continue;
      }

      return error(`Unexpected character in binary: ${this.parsable.present}`);
    }

    if (!didClose) return error(`Unclosed binary.`);

    this.parsable.commitPresent();
  }

}

// TODO: janky as fuck, revisit and see if TypeScript can do better.
const hexBits = [
  `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`,
  `A`, `B`, `C`, `D`, `E`, `F`,
  `a`, `b`, `c`, `d`, `e`, `f`
] as const;
type HexBit = typeof hexBits[number];
function isHexBit(s: any): s is HexBit {return hexBits.includes(s);}
