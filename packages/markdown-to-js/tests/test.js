const glob = require("glob");
const io = require("@folkforms/file-io");
const markdownToJs = require("../markdownToJs.js")

// For each pair, test it

// Glob up all test cases inputs and outputs
const inputs = glob.sync("**/*-input.md");
const outputs = glob.sync("**/*-output.json");
const structure = io.readLines("tests/markdown-structure.md");

for(let i = 0; i < inputs.length; i++) {

  test(inputs[i], () => {
    // Arrange
    const input = io.readLines(inputs[i]);
    const expected = io.readJson(outputs[i]);
    // console.log(`### input = ${input}`);
    // console.log(`### expected = ${JSON.stringify(expected)}`);

    // Act
    //const actual = markdownToJs.execute(input, structure);
    const actual = {};

    // Assert
    expect(actual).toEqual(expected);
  });
}
