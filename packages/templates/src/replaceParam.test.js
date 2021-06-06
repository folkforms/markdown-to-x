const { replaceParam } = require("./replaceParam");

const data = {
  title: "Some title",
  description: [
    "Description line 1",
    "Description line 2",
  ],
  steps: [
    "Step one",
    "Step two",
    "Step three",
  ],
};

test("Test 'indent' qualifier", () => {
  const line = "%steps[indent:2]%";
  const paramData = { param: "steps", qualifier: "[indent:2]" };
  const actual = replaceParam(line, paramData, data);
  const expected = [ "  Step one", "  Step two", "  Step three" ];
  expect(actual).toEqual(expected);
});

test("Test 'line' qualifier", () => {
  const line = "----%description[line:0]%----";
  const paramData = { param: "description", qualifier: "[line:0]" };
  const actual = replaceParam(line, paramData, data);
  const expected = [ "----Description line 1----" ];
  expect(actual).toEqual(expected);
});

test.skip("Test multiple qualifiers", () => {
  const line = "%steps[indent:2,line:0]%";
  const paramData = { param: "steps", qualifier: undefined };
  const actual = replaceParam(line, paramData, data);
  const expected = [ "  Step one" ];
  expect(actual).toEqual(expected);
});
