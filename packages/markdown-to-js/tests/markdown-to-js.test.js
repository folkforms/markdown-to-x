const glob = require("glob");
const io = require("@folkforms/file-io");
const markdownToJs = require("../markdown-to-js.js")

// Glob up all test cases inputs and outputs
const inputs = glob.sync("**/*-input.md");
const outputs = glob.sync("**/*-output.json");
const structure = io.readLines("tests/markdown-structure.md").split("\n"); // FIXME Why is this not split already?

// Test each pair in turn
for(let i = 0; i < inputs.length; i++) {
  test(inputs[i], () => {
    // Arrange
    const input = io.readLines(inputs[i]).split("\n"); // FIXME Why is this not split already?
    const expected = io.readJson(outputs[i]);

    // Act
    const actual = markdownToJs.execute(structure, input, { cleanLists: true });

    // Assert
    expect(actual).toEqual(expected);
  });
}
