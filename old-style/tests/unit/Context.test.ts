import {Context} from '#old-style/Context';

describe(`Context`, () => {
  describe(`with an empty string as input`, () => {
    describe(`#whole`, () => {
      it(`is an empty string`, () => {expect(new Context(`value`, ``).whole).toBe(``);});
    });

    describe(`#past`, () => {
      it(`is an empty string`, () => {expect(new Context(`value`, ``).past).toBe(``);});
    });

    describe(`#present`, () => {
      it(`is an empty string`, () => {expect(new Context(`value`, ``).present).toBe(``);});
    });

    describe(`#future`, () => {
      it(`is an empty string`, () => {expect(new Context(`value`, ``).future).toBe(``);});
    });

    describe(`#hasFuture`, () => {
      it(`is false`, () => {expect(new Context(`value`, ``).hasFuture).toBe(false);});
    });

    describe(`#updatePresent`, () => {
      it(`does nothing`, () => {expect(new Context(`value`, ``).updatePresent()).toBeUndefined();});
    });

    describe(`#commitPresent`, () => {
      it(`does nothing`, () => {expect(new Context(`value`, ``).commitPresent()).toBeUndefined();});
    });

    describe(`#console`, () => {
      const log = jest.spyOn(console, `log`).mockImplementation(() => {});

      it(`Logs with additional information.`, () => {
        expect(new Context(`value`, ``).console(`log`, `foo`)).toBeUndefined();
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 1`);
      });
    });
  });

  describe(`with some string as input`, () => {
    describe(`#whole`, () => {
      it(`is the input string`, () => {expect(new Context(`value`, `foo`).whole).toBe(`foo`);});
    });

    describe(`#past`, () => {
      it(`is an empty string`, () => {expect(new Context(`value`, `foo`).past).toBe(``);});
    });

    describe(`#present`, () => {
      it(`should be initially empty`, () => {
        expect(new Context(`value`, `foo`).present).toBe(``);
      });

      it(`should be updated by #updatePresent`, () => {
        const context = new Context(`value`, `foo`);
        context.updatePresent();
        expect(context.present).toBe(`f`);
      });
    });

    describe(`#future`, () => {
      it(`should be initially the whole string`, () => {
        expect(new Context(`value`, `foo`).future).toBe(`foo`);
      });

      it(`should be updated by #updatePresent`, () => {
        const context = new Context(`value`, `foo`);
        context.updatePresent();
        expect(context.future).toBe(`oo`);
        context.updatePresent();
        expect(context.future).toBe(`o`);
        context.updatePresent();
        expect(context.future).toBe(``);
        context.updatePresent();
        expect(context.future).toBe(``);
      });
    });

    describe(`#hasFuture`, () => {
      it(`should be initially true`, () => {
        expect(new Context(`value`, `foo`).hasFuture).toBe(true);
      });

      it(`should be updated by #updatePresent`, () => {
        const context = new Context(`value`, `foo`);
        context.updatePresent();
        expect(context.hasFuture).toBe(true);
        context.updatePresent();
        expect(context.hasFuture).toBe(true);
        context.updatePresent();
        expect(context.hasFuture).toBe(false);
        context.updatePresent();
        expect(context.hasFuture).toBe(false);
      });
    });

    describe(`#console`, () => {
      const log = jest.spyOn(console, `log`).mockImplementation(() => {});

      it(`Logs with additional information.`, () => {
        const context = new Context(`value`, `foo\nbar`);
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 1`);
        context.updatePresent();
        expect(context.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 2`);
        context.updatePresent();
        expect(context.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 3`);
        context.updatePresent();
        expect(context.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 2, column 1`);
        context.updatePresent();
        expect(context.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 2, column 2`);
        context.updatePresent();
        expect(context.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 2, column 3`);
      });
    });
  });

  describe(`#intent`, () => {
    it(`is the intent passed to the constructor`, () => {
      expect(new Context(`value`, ``).intent).toBe(`value`);
      expect(new Context(`tree`, ``).intent).toBe(`tree`);
    });
  });
});