# Template Document

The template document describes the output format of our data. It allows us to rearrange the data as appropriate, and also to add any boilerplate that is required.

In our automated browser test example we currently have the following in-memory object:

```
{
  title: "Test logging in",
  description: [
    "Test that when we log in we are brought to the user page."
  ],
  steps: [
    "Go to homepage",
    "Click the Log in button",
    "Log in as bob/bobspassword",
    "Verify that the user page loads"
  ],
  codeSteps: [
    "/* Go to homepage */",
    "utils.navigateTo('https://localhost:3000');",
    "/* Click the Log in button */",
    "utils.clickButton('Log in');",
    "utils.waitForPage('LoginPage');",
    "/* Log in as bob/bobspassword */",
    "utils.typeText('bob', '.username-field');",
    "utils.typeText('bobspassword', '.password-field');",
    "utils.clickButton('Log in');",
    "/* Verify that the user page loads */",
    "utils.waitForPage('UserPage');"
  ]
}
```

Our template file looks like this:

```
import utils from AutomatedTestFramework;

test('%description[line:0,escape]% (file: %@filename%)', () => {
%codeSteps[indent:2]%
});
```

Anything inside `%` symbols is considered a template variable and the code will attempt to replace it with something from the in-memory object above. For example, `%description%` will be replaced with the value of the `description` attribute from the in-memory object.

Note 1: "Qualifiers" are instructions like `[indent:2]` that can follow a template variable name. They must be inside the `%` symbols. See the "Qualifiers" section below for details.

Note 2: `@filename` is a special template variable (denoted by the `@` symbol) that will be replaced with the input filename.

## Qualifiers

- `indent:<number>` indents each line of data by the given number of spaces.
- `line:<number>` only use the given line number, e.g. `description[line:0]` will return the first line only of the `description` array.
- `escape` escapes any ', " or ` characters. Useful when putting template variables inside strings.
- `fromCodeBlock` chops off the first 4 characters of each line.
- `toArray` outputs the data as an array of strings. Useful for wrangling the data in tests.

## Final result

Our in-memory object and template file are used to generate the final output document:

```
import utils from AutomatedTestFramework;

test('Test that when we log in we are brought to the user page. (file: browser-test-example/inputs/testcase1.md)', () => {
  /* Go to homepage */
  utils.navigateTo('https://localhost:3000');
  /* Click the Log in button */
  utils.clickButton('Log in');
  utils.waitForPage('LoginPage');
  /* Log in as bob/bobspassword */
  utils.typeText('bob', '.username-field');
  utils.typeText('bobspassword', '.password-field');
  utils.clickButton('Log in');
  /* Verify that the user page loads */
  utils.waitForPage('UserPage');
});
```

This final document will be saved to the output folder as `<input filename>.<template document extension>`.

For example, an input file `testcase1.md` and template file `template.js` will generate an output file called `testcase1.js`.
