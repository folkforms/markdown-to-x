/*
%title%

%description%
*/

test('%description[line:0]% (file: %@filename%)', () => {

  const actual = appendStrings("%input1%", "%input2%");
  const expected = "%expected%";

  expect(actual).toEqual(expected);
});
