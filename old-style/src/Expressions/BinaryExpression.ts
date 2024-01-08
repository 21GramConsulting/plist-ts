import {PlistBinaryNode} from "@21gram-consulting/plist";
import {Expression} from "../Expression";
import {CommentFactory} from "./CommentFactory";

export class BinaryExpression extends Expression<PlistBinaryNode> {
  protected resolve(): PlistBinaryNode | void {
    const bytes: number[] = [];
    const children: PlistBinaryNode[`children`] = [];
    const commentFactory = new CommentFactory();

    this.context.commitPresent();
    let didClose = false;
    let previousHexBit: HexBit | undefined;
    while (this.context.hasFuture) {
      this.context.updatePresent();

      if (commentFactory.couldMatch(this.context)) {
        if (commentFactory.doesMatch(this.context)) {
          const comment = commentFactory.create(this.context);
          if (comment === undefined) return this.error(`Comment could not be created.`);
          if (!comment.isComplete) return this.error(`Incomplete comment.`);
          if (comment.node === undefined) return this.error(`Comment node is undefined.`);
          children.push(comment.node);
        }
        continue;
      }

      if (/\s/.test(this.context.present)) {
        this.context.commitPresent();
        continue;
      }

      if (this.context.present === `>`) {
        didClose = true;
        this.context.commitPresent();
        break;
      }

      if (isHexBit(this.context.present)) {
        if (previousHexBit === undefined) {
          previousHexBit = this.context.present;
        } else {
          const byte = parseInt(previousHexBit.concat(this.context.present), 16);
          bytes.push(byte);
          children.push(PlistBinaryNode(new Uint8Array([byte]), []));
          previousHexBit = undefined;
        }
        this.context.commitPresent();
        continue;
      }

      return this.error(`Unexpected character in binary: ${this.context.present}`);
    }

    if (!didClose) return this.error(`Unclosed binary.`);

    this.context.commitPresent();
    return PlistBinaryNode(new Uint8Array(bytes), children);
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
