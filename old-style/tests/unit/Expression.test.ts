import {Expression} from '#old-style/Expression';
import {Context} from '#old-style/Context';

describe(`Expression`, () => {
  let expression: TestExpression;

  beforeEach(() => {
    expression = new TestExpression(new Context(`foo`));
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
      const spy = jest.spyOn(expression, `error`);
      expression.error(`foo`);
      expect(spy).toHaveBeenCalledWith(`foo`);
    });
  });
});

class TestExpression extends Expression<string> {
  public shouldSucceed: boolean = true;
  private alreadyExercised: boolean = false;
  protected resolve(): string | void {
    if (this.alreadyExercised) {
      fail(`Expression should not be exercised more than once.`);
    }
    this.alreadyExercised = true;
    if (!this.shouldSucceed) return;
    return `foo`;
  }
}