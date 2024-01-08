import {isNode} from "#plist/Node";

describe(`isNode`, () => {
  describe(`with a type argument`, () => {
    it(`returns true for a valid node`, () => {
      expect(isNode({type: `STRING`, value: `foo`}, `STRING`)).toBe(true);
    });

    it(`returns false for a null input`, () => {
      expect(isNode(null, `STRING`)).toBe(false);
    });

    it(`returns false for a non-object input`, () => {
      expect(isNode(123, `STRING`)).toBe(false);
    });

    it(`returns false for a non-node`, () => {
      expect(isNode({type: `INTEGER`, value: 123}, `STRING`)).toBe(false);
    });

    it(`returns false for a node with missing 'type' property`, () => {
      expect(isNode({value: `foo`}, `STRING`)).toBe(false);
    });

    it(`returns false for a node with missing 'value' property`, () => {
      expect(isNode({type: `STRING`}, `STRING`)).toBe(false);
    });

    it(`returns false for a node with incorrect 'type' property`, () => {
      expect(isNode({type: `NUMBER`, value: `foo`}, `STRING`)).toBe(false);
    });

    it(`returns true for a node with incorrect 'value' property type, because it's not its responsibility to watch for.`, () => {
      expect(isNode({type: `STRING`, value: 123}, `STRING`)).toBe(true);
    });
  });

  describe(`without a type argument`, () => {
    it(`returns true for a valid node`, () => {
      expect(isNode({type: `STRING`, value: `foo`})).toBe(true);
    });

    it(`returns false for a null input`, () => {
      expect(isNode(null)).toBe(false);
    });

    it(`returns false for a non-object input`, () => {
      expect(isNode(123)).toBe(false);
    });

    it(`returns false for a non-node`, () => {
      expect(isNode({type: `INTEGER`, value: 123})).toBe(false);
    });

    it(`returns false for a node with missing 'type' property`, () => {
      expect(isNode({value: `foo`})).toBe(false);
    });

    it(`returns false for a node with missing 'value' property`, () => {
      expect(isNode({type: `STRING`})).toBe(false);
    });

    it(`returns false for a node with incorrect 'type' property`, () => {
      expect(isNode({type: `NUMBER`, value: `foo`})).toBe(false);
    });

    it(`returns true for a node with incorrect 'value' property type, because it's not its responsibility to watch for.`, () => {
      expect(isNode({type: `STRING`, value: 123})).toBe(true);
    });
  });
});