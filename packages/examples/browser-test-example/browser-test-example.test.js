const glob = require("glob");
const fileio = require("@folkforms/file-io");
const markdownToX = require("../../integration/markdownToX");

const structure = fileio.readLines("browser-test-example/inputs/bte-structure.md");
const mappingsData = fileio.readJson("browser-test-example/inputs/bte-mappings.json");
const templateFilename = "browser-test-example/inputs/bte-template.js";
const templateData = fileio.readLines(templateFilename);

test('browser test example 1', () => {
  // Arrange
  const filename = "browser-test-example/inputs/bte-doc1.md";
  const input = fileio.readLines(filename);
  const expected = fileio.readLines("browser-test-example/expected/bte-doc1.js");

  // Act
  const actual = markdownToX(input, structure, mappingsData, templateData, filename);

  // Assert
  expect(actual).toEqual(expected);
});

test('browser test example 2', () => {
  // Arrange
  const filename = "browser-test-example/inputs/bte-doc2.md";
  const input = fileio.readLines(filename);
  const expected = fileio.readLines("browser-test-example/expected/bte-doc2.js");

  // Act
  const actual = markdownToX(input, structure, mappingsData, templateData, filename);

  // Assert
  expect(actual).toEqual(expected);
});
