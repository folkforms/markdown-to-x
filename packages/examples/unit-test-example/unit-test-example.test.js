const glob = require("glob");
const fileio = require("@folkforms/file-io");
const { main } = require("../../integration/integration");

test('unit test example 1', () => {
  // Arrange
  const inputFiles = glob.sync("unit-test-example/inputs/ute-doc*.md");
  const structure = fileio.readLines("unit-test-example/inputs/ute-structure.md");
  const templateFilename = "unit-test-example/inputs/ute-template.js";
  const templateData = fileio.readLines(templateFilename);
  const outputFolder = "unit-test-example/outputs";
  const expected1 = fileio.readLines("unit-test-example/expected/ute-doc1.js");

  // Act
  // ...We do not need any mappings as we are using the data as-is in this example
  main(inputFiles, structure, null, templateData, templateFilename, outputFolder);
  const actual1 = fileio.readLines(`${outputFolder}/ute-doc1.js`);

  // Assert
  expect(actual1).toEqual(expected1);
});
