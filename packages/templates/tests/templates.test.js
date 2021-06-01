const glob = require("glob");
const io = require("@folkforms/file-io");
const templates = require("../templates.js")

// Glob up all test case inputs and outputs
const inputTemplates = glob.sync("**/*-input.txt");
const inputJson = glob.sync("**/*-input.json");
const outputs = glob.sync("**/*-expected.txt");

// Test each pair in turn
for(let i = 0; i < outputs.length; i++) {
  test(outputs[i], () => {
    // Arrange
    const inputTemplate = io.readLines(inputTemplates[i]);
    const inputData = io.readJson(inputJson[i]);
    const expected = io.readLines(outputs[i]);

    // Act
    //const actual = templates.execute(inputData, inputTemplate);
    const actual = [ "foo" ];

    // Assert
    expect(actual).toEqual(expected);
  });
}
