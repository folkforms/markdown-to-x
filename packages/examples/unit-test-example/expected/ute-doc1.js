/*
Title of Test Case 1

This is the description for unit test case one.

Some more words.
*/

test('This is the description for unit test case one. (file: unit-test-example/inputs/ute-doc1.md)', () => {

  const actual = "foo" + "bar";
  const expected = "foobar";

  expect(actual).toEqual(expected);
});
