const { tokeniseAroundParams } = require("./tokeniseAroundParams");

test("tokeniseAroundParams test 1", () => {
  const actual = tokeniseAroundParams("aaa%bbb%ccc");
  const expected = [ "aaa", "%bbb%", "ccc" ];
  expect(actual).toEqual(expected);
});

test("tokeniseAroundParams test 2", () => {
  const actual = tokeniseAroundParams("%aaa%bbb%ccc%");
  const expected = [ "%aaa%", "bbb", "%ccc%" ];
  expect(actual).toEqual(expected);
});

test("tokeniseAroundParams test 3", () => {
  const actual = tokeniseAroundParams("%aaa%%bbb%");
  const expected = [ "%aaa%", "%bbb%" ];
  expect(actual).toEqual(expected);
});
