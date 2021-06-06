/*
Title of Test Case 1

This is the description for test case one.

Some more words.
*/

test('This is the description for test case one. (file: unit-test-example/inputs/ute-doc1.md)', () => {

  const actual = appendStrings("foo", "bar");
  const expected = "foobar";

  expect(actual).toEqual(expected);
});
