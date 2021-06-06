const glob = require("glob");
const fileio = require("@folkforms/file-io");
const mappings = require("../mappings.js")

// Glob up all test cases inputs and outputs
const inputs = glob.sync("**/testcase*-input.json");
const outputs = glob.sync("**/testcase*-output.json");
const mappingsData = fileio.readJson("tests/mappings.json");

// Test each pair in turn
for(let i = 0; i < inputs.length; i++) {
  test(inputs[i], () => {
    // Arrange
    const input = fileio.readJson(inputs[i]);
    const expected = fileio.readJson(outputs[i]);

    // Act
    const actual = mappings.execute(input, mappingsData);

    // Assert
    expect(actual).toEqual(expected);
  });
}

test('Test that a missing mapping suggests an alternative', () => {
  const input = fileio.readJson(glob.sync("**/error-testcase1-input.json")[0]);
  expect(() => mappings.execute(input, mappingsData)).toThrow(
    'ERROR: No mapping defined for input "Step ywo". The most similar mappings are: "Step one", "Step two".'
  );
});
