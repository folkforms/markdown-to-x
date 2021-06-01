const glob = require("glob");
const io = require("@folkforms/file-io");
const mappings = require("../mappings.js")

// Glob up all test cases inputs and outputs
const inputs = glob.sync("**/*-input.json");
const outputs = glob.sync("**/*-output.json");
const mappingsData = io.readJson("tests/mappings.json");

// Test each pair in turn
for(let i = 0; i < inputs.length; i++) {
  test(inputs[i], () => {
    // Arrange
    const input = io.readLines(inputs[i]);
    const expected = io.readJson(outputs[i]);
    // console.log(`### input = ${JSON.stringify(input)}`);
    // console.log(`### expected = ${JSON.stringify(expected)}`);

    // Act
    //const actual = mappings.execute(input, mappingsData);
    const actual = {};

    // Assert
    expect(actual).toEqual(expected);
  });
}
