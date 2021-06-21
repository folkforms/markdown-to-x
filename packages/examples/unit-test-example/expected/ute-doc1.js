/*
AppendStrings Test Case 1

Test the appendStrings method with "foo" and "bar".
*/

test('Test the appendStrings method with "foo" and "bar". (file: packages/examples/unit-test-example/inputs/ute-doc1.md)', () => {

  const actual = appendStrings("foo", "bar");
  const expected = "foobar";

  expect(actual).toEqual(expected);
});
