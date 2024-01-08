import {Parsable} from '#old-style/Parsable';

describe(`Parsable`, () => {
  describe(`with an empty string as input`, () => {
    describe(`#whole`, () => {
      it(`is an empty string`, () => {expect(new Parsable(``).whole).toBe(``);});
    });

    describe(`#past`, () => {
      it(`is an empty string`, () => {expect(new Parsable(``).past).toBe(``);});
    });

    describe(`#present`, () => {
      it(`is an empty string`, () => {expect(new Parsable(``).present).toBe(``);});
    });

    describe(`#future`, () => {
      it(`is an empty string`, () => {expect(new Parsable(``).future).toBe(``);});
    });

    describe(`#hasFuture`, () => {
      it(`is false`, () => {expect(new Parsable(``).hasFuture).toBe(false);});
    });

    describe(`#updatePresent`, () => {
      it(`does nothing`, () => {expect(new Parsable(``).updatePresent()).toBeUndefined();});
    });

    describe(`#commitPresent`, () => {
      it(`does nothing`, () => {expect(new Parsable(``).commitPresent()).toBeUndefined();});
    });

    describe(`#console`, () => {
      const log = jest.spyOn(console, `log`).mockImplementation(() => {});

      it(`Logs with additional information.`, () => {
        expect(new Parsable(``).console(`log`, `foo`)).toBeUndefined();
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 1`);
      });
    });
  });

  describe(`with some string as input`, () => {
    describe(`#whole`, () => {
      it(`is the input string`, () => {expect(new Parsable(`foo`).whole).toBe(`foo`);});
    });

    describe(`#past`, () => {
      it(`is an empty string`, () => {expect(new Parsable(`foo`).past).toBe(``);});
    });

    describe(`#present`, () => {
      it(`should be initially empty`, () => {
        expect(new Parsable(`foo`).present).toBe(``);
      });

      it(`should be updated by #updatePresent`, () => {
        const parsable = new Parsable(`foo`);
        parsable.updatePresent();
        expect(parsable.present).toBe(`f`);
      });
    });

    describe(`#future`, () => {
      it(`should be initially the whole string`, () => {
        expect(new Parsable(`foo`).future).toBe(`foo`);
      });

      it(`should be updated by #updatePresent`, () => {
        const parsable = new Parsable(`foo`);
        parsable.updatePresent();
        expect(parsable.future).toBe(`oo`);
        parsable.updatePresent();
        expect(parsable.future).toBe(`o`);
        parsable.updatePresent();
        expect(parsable.future).toBe(``);
        parsable.updatePresent();
        expect(parsable.future).toBe(``);
      });
    });

    describe(`#hasFuture`, () => {
      it(`should be initially true`, () => {
        expect(new Parsable(`foo`).hasFuture).toBe(true);
      });

      it(`should be updated by #updatePresent`, () => {
        const parsable = new Parsable(`foo`);
        parsable.updatePresent();
        expect(parsable.hasFuture).toBe(true);
        parsable.updatePresent();
        expect(parsable.hasFuture).toBe(true);
        parsable.updatePresent();
        expect(parsable.hasFuture).toBe(false);
        parsable.updatePresent();
        expect(parsable.hasFuture).toBe(false);
      });
    });

    describe(`#console`, () => {
      const log = jest.spyOn(console, `log`).mockImplementation(() => {});

      it(`Logs with additional information.`, () => {
        const parsable = new Parsable(`foo\nbar`);
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 1`);
        parsable.updatePresent();
        expect(parsable.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 2`);
        parsable.updatePresent();
        expect(parsable.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 1, column 3`);
        parsable.updatePresent();
        expect(parsable.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 2, column 1`);
        parsable.updatePresent();
        expect(parsable.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 2, column 2`);
        parsable.updatePresent();
        expect(parsable.console(`log`, `foo`));
        expect(log).toHaveBeenCalledWith(`foo`, `line 2, column 3`);
      });
    });
  });
});