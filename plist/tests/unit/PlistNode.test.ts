import {isPlistNode} from "#plist/PlistNode";

describe(`isPlistNode`, () => {
  describe(`with a type argument`, () => {
    it(`returns true for a valid node`, () => {
      expect(isPlistNode({type: `STRING`, value: `foo`}, `STRING`)).toBe(true);
    });

    it(`returns false for a null input`, () => {
      expect(isPlistNode(null, `STRING`)).toBe(false);
    });

    it(`returns false for a non-object input`, () => {
      expect(isPlistNode(123, `STRING`)).toBe(false);
    });

    it(`returns false for a non-node`, () => {
      expect(isPlistNode({type: `INTEGER`, value: 123}, `STRING`)).toBe(false);
    });

    it(`returns false for a node with missing 'type' property`, () => {
      expect(isPlistNode({value: `foo`}, `STRING`)).toBe(false);
    });

    it(`returns false for a node with missing 'value' property`, () => {
      expect(isPlistNode({type: `STRING`}, `STRING`)).toBe(false);
    });

    it(`returns false for a node with incorrect 'type' property`, () => {
      expect(isPlistNode({type: `NUMBER`, value: `foo`}, `STRING`)).toBe(false);
    });

    it(`returns true for a node with incorrect 'value' property type, because it's not its responsibility to watch for.`, () => {
      expect(isPlistNode({type: `STRING`, value: 123}, `STRING`)).toBe(true);
    });
  });

  describe(`without a type argument`, () => {
    it(`returns true for a valid node`, () => {
      expect(isPlistNode({type: `STRING`, value: `foo`})).toBe(true);
    });

    it(`returns false for a null input`, () => {
      expect(isPlistNode(null)).toBe(false);
    });

    it(`returns false for a non-object input`, () => {
      expect(isPlistNode(123)).toBe(false);
    });

    it(`returns false for a non-node`, () => {
      expect(isPlistNode({type: `INTEGER`, value: 123})).toBe(false);
    });

    it(`returns false for a node with missing 'type' property`, () => {
      expect(isPlistNode({value: `foo`})).toBe(false);
    });

    it(`returns false for a node with missing 'value' property`, () => {
      expect(isPlistNode({type: `STRING`})).toBe(false);
    });

    it(`returns false for a node with incorrect 'type' property`, () => {
      expect(isPlistNode({type: `NUMBER`, value: `foo`})).toBe(false);
    });

    it(`returns true for a node with incorrect 'value' property type, because it's not its responsibility to watch for.`, () => {
      expect(isPlistNode({type: `STRING`, value: 123})).toBe(true);
    });
  });
});