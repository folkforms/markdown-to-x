const glob = require("glob");
const fileio = require("@folkforms/file-io");
const markdownToX = require("../../integration/markdownToX");

const structure = fileio.readLines("browser-test-example/inputs/bte-structure.md");
const mappingsData = fileio.readJson("browser-test-example/inputs/bte-mappings.json");
const templateFilename = "browser-test-example/inputs/bte-template.js";
const templateData = fileio.readLines(templateFilename);

test('browser test example', () => {
  // Arrange
  const filename = "browser-test-example/inputs/bte-doc.md";
  const input = fileio.readLines(filename);
  const expected = fileio.readLines("browser-test-example/expected/bte-doc.js");

  // Act
  const actual = markdownToX(input, structure, mappingsData, templateData, filename);

  // Assert
  expect(actual).toEqual(expected);
});
