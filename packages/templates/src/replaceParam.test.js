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
  const param = "steps";
  const qualifier = "[indent:2]"
  const line = `%${param}${qualifier}%`;
  const paramData = { param, qualifier };
  const actual = replaceParam(line, paramData, data);
  const expected = [ "  Step one", "  Step two", "  Step three" ];
  expect(actual).toEqual(expected);
});

test("Test 'line' qualifier", () => {
  const param = "description";
  const qualifier = "[line:0]";
  const line = `----%${param}${qualifier}%----`;
  const paramData = { param, qualifier };
  const actual = replaceParam(line, paramData, data);
  const expected = [ "----Description line 1----" ];
  expect(actual).toEqual(expected);
});

test("Test multiple qualifiers", () => {
  const param = "steps";
  const qualifier = "[indent:2,line:1]";
  const line = `%${param}${qualifier}%`;
  const paramData = { param, qualifier };
  const actual = replaceParam(line, paramData, data);
  const expected = [ "  Step two" ];
  expect(actual).toEqual(expected);
});
