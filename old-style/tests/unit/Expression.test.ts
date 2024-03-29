import {Expression} from '#old-style/Expression';
import {Context} from '#old-style/Context';
import {PlistStringNode} from '@21gram-consulting/plist';

describe(`Expression`, () => {
  let expression: TestExpression;
  let context: Context;

  beforeEach(() => {
    context = new Context(`foo`);
    expression = new TestExpression(context);
  });

  describe(`#value`, () => {
    describe(`successfully resolved`, () => {
      describe(`#isComplete`, () => {
        it(`is true`, () => {
          expect(expression.isComplete).toBe(false);
          expression.value;
          expect(expression.isComplete).toBe(true);
        });
      });

      describe(`#value`, () => {
        it(`is the result of #resolve`, () => {
          expect(expression.value).toBe(`foo`);
        });
      });
    });

    describe(`unsuccessfully resolved`, () => {
      beforeEach(() => {
        expression.shouldSucceed = false;
      });

      describe(`#isComplete`, () => {
        it(`is true`, () => {
          expect(expression.isComplete).toBe(false);
          expression.value;
          expect(expression.isComplete).toBe(true);
        });
      });

      describe(`#value`, () => {
        it(`is undefined`, () => {
          expect(expression.value).toBe(undefined);
        });
      });
    });
  });

  describe(`#error`, () => {
    it(`calls console.error`, () => {
      const spy = jest
        .spyOn(context, `console`)
        .mockImplementation(() => {});
      expression.error(`foo`);
      expect(spy).toHaveBeenCalledWith(`error`, `foo`);
    });
  });
});

class TestExpression extends Expression<PlistStringNode> {
  public shouldSucceed: boolean = true;
  private alreadyExercised: boolean = false;
  protected resolve(): PlistStringNode | void {
    if (this.alreadyExercised) {
      fail(`Expression should not be exercised more than once.`);
    }
    this.alreadyExercised = true;
    if (!this.shouldSucceed) return;
    return PlistStringNode(`foo`);
  }
}