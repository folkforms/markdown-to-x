import utils from AutomatedTestFramework;

/*
{{ title }}

{{ description | join("\n") }}
*/

test('{{ description | first | esq }} (file: {{ @filename }})', () => {
  {{ codeSteps | join("\n") | indent(2) }}
});
