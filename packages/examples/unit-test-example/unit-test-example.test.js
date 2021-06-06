const glob = require("glob");
const fileio = require("@folkforms/file-io");
const { main } = require("../../integration/integration");

test('unit test example 1', () => {
  // Arrange
  const inputFiles = glob.sync("unit-test-example/inputs/ute-doc*.md");
  const structure = fileio.readLines("unit-test-example/inputs/ute-structure.md");
  const mappingsData = fileio.readJson("unit-test-example/inputs/ute-mappings.json");
  const templateFilename = "unit-test-example/inputs/ute-template.js";
  const templateData = fileio.readLines(templateFilename);
  const outputFolder = "unit-test-example/outputs";
  const expected1 = fileio.readLines("unit-test-example/expected/ute-doc1.js");
  //const expected2 = fileio.readLines("unit-test-example/expected/ute-doc2.js");

  // Act
  main(inputFiles, structure, mappingsData, templateData, templateFilename, outputFolder);
  const actual1 = fileio.readLines(`${outputFolder}/ute-doc1.js`);
  //const actual2 = fileio.readLines(`${outputFolder}/ute-doc2.js`);

  // Assert
  expect(actual1).toEqual(expected1);
  //expect(actual2).toEqual(expected2);
});
