const glob = require("glob");
const fileio = require("@folkforms/file-io");
const markdownToX = require("../../integration/markdownToX");

test('unit test example 1', () => {
  // Arrange
  const inputFiles = glob.sync("packages/examples/unit-test-example/inputs/ute-doc*.md");
  const structure = fileio.readLines("packages/examples/unit-test-example/inputs/ute-structure.md");
  const templateFilename = "packages/examples/unit-test-example/inputs/ute-template.js";
  const templateData = fileio.readLines(templateFilename);
  const expectedFiles = glob.sync("packages/examples/unit-test-example/expected/ute-doc*.js");

  for(let i = 0; i < inputFiles.length; i++) {
    const file = inputFiles[i];
    const input = fileio.readLines(file);
    const expected = fileio.readLines(expectedFiles[i]);

    // Act
    // ...We do not need any mappings as we are using the data as-is in this example
    const actual = markdownToX(input, structure, null, templateData, file);

    // Assert
    expect(actual).toEqual(expected);
  }
});
