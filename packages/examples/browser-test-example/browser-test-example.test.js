const glob = require("glob");
const fileio = require("@folkforms/file-io");
const { main } = require("../../integration/integration");

test('browser test example 1', () => {
  // Arrange
  const inputFiles = glob.sync("browser-test-example/inputs/bte-doc*.md");
  const structure = fileio.readLines("browser-test-example/inputs/bte-structure.md");
  const mappingsData = fileio.readJson("browser-test-example/inputs/bte-mappings.json");
  const templateFilename = "browser-test-example/inputs/bte-template.js";
  const templateData = fileio.readLines(templateFilename);
  const expected = fileio.readLines("browser-test-example/expected/bte-doc1.js");
  const outputFolder = "browser-test-example/outputs";

  // Act
  main(inputFiles, structure, mappingsData, templateData, templateFilename, );
  const actual = fileio.readLines(`${outputFolder}/bte-doc1.js`);

  // Assert
  expect(actual).toEqual(expected);
});
