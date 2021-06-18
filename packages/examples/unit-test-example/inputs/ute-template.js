/*
{{ title }}

{{ description | join("\n") }}
*/

test('{{ description | first }} (file: {{ @filename }})', () => {

  const actual = appendStrings("{{ input1 }}", "{{ input2 }}");
  const expected = "{{ expected }}";

  expect(actual).toEqual(expected);
});
