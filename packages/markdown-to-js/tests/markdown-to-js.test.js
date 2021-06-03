const glob = require("glob");
const fileio = require("@folkforms/file-io");
const markdownToJs = require("../markdown-to-js.js")

// Glob up all test cases inputs and outputs
const inputs = glob.sync("**/*-input.md");
const outputs = glob.sync("**/*-output.json");
const structure = fileio.readLines("tests/markdown-structure.md");

// Test each pair in turn
for(let i = 0; i < inputs.length; i++) {
  test(inputs[i], () => {
    // Arrange
    const input = fileio.readLines(inputs[i]);
    const expected = fileio.readJson(outputs[i]);

    // Act
    const actual = markdownToJs.execute(structure, input, { cleanLists: true });

    // Assert
    expect(actual).toEqual(expected);
  });
}
