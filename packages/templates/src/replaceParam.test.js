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
  testEscape: [
    "testEscape 1 which contains 'single', \"double\" and `backticks` quotes",
    'testEscape 2 which contains \'single\', "double" and `backticks` quotes',
    `testEscape 3 which contains 'single', "double" and \`backticks\` quotes`,
  ],
};

const testReplaceParam = (paramData, expected) => {
  const line = `%${paramData.param}${paramData.qualifier}%`;
  const actual = replaceParam(line, paramData, data);
  expect(actual).toEqual(expected);
}

test("Test multiple qualifiers", () => {
  testReplaceParam({ param: "steps", qualifier: "[indent:2,line:1,escape]" }, [ "  Step two" ]);
  testReplaceParam({ param: "testEscape", qualifier: "[line:1,escape]" }, [ "testEscape 2 which contains \\'single\\', \\\"double\\\" and \\`backticks\\` quotes" ]);
});

test("Test 'indent' qualifier", () => {
  testReplaceParam({ param: "steps", qualifier: "[indent:2]" }, [ "  Step one", "  Step two", "  Step three" ]);
});

test("Test 'line' qualifier", () => {
  testReplaceParam({ param: "description", qualifier: "[line:0]" }, [ "Description line 1" ]);
});

test("Test 'escape' qualifier", () => {
  testReplaceParam({ param: "testEscape", qualifier: "[escape]" }, [
    "testEscape 1 which contains \\'single\\', \\\"double\\\" and \\`backticks\\` quotes",
    "testEscape 2 which contains \\'single\\', \\\"double\\\" and \\`backticks\\` quotes",
    "testEscape 3 which contains \\'single\\', \\\"double\\\" and \\`backticks\\` quotes",
  ]);
});
