# Template Document

The template document describes the output format of our data. It allows us to rearrange the data as appropriate, and also to add any boilerplate that is required.

In our automated browser test example, we currently have the following in-memory data:

```
{
  title: "Test logging in",
  description: [
    "Test that when we log in we go to the user home page."
  ],
  steps: [
    "Go to homepage",
    "Click the Log in button",
    "Log in as bob/bobspassword",
    "Verify that the user home page loads"
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
    "/* Verify that the user home page loads */",
    "utils.waitForPage('UserHomePage');"
  ]
}
```

We have also supplied a template file that looks like this:

```
import utils from AutomatedTestFramework;

/*
%title%

%description%
*/

test('%description[line:0,escape]% (file: %@filename%)', () => {
%codeSteps[indent:2]%
});
```

You can see we have our imports and test setup boilerplate included.

It should be reasonably obvious how the templating system works: Anything inside `%` symbols is considered a template variable and the code will attempt to replace it with something from the in-memory data above, e.g. `%title%` will be replaces with the value of 'title' from the in-memory data.

Note 1: "Qualifiers" are instructions like `[indent:2]` that follow a template variable name. They will affect the output in various ways. They must be inside the `%` symbols.

Note 2: `%@filename%` is a special template variable (denoted by the `@` symbol) that will substitute the input filename.

## Qualifiers

- `indent:<num>` indents the data by the given number of spaces.
- `line:<num>` only use the given line number, e.g. `description[line:0]` will return the first line only of the `description` array.
- `escape` escapes any ', " or ` characters. Useful when putting template variables inside strings.

## Final result

Our in-memory data and the template file are used to generate the final output document:

```
import utils from AutomatedTestFramework;

/*
Test logging in

Test that when we log in we go to the user home page.
*/

test('Test that when we log in we go to the user home page. (file: browser-test-example/inputs/bte-doc1.md)', () => {
  /* Go to homepage */
  utils.navigateTo('https://localhost:3000');
  /* Click the Log in button */
  utils.clickButton('Log in');
  utils.waitForPage('LoginPage');
  /* Log in as bob/bobspassword */
  utils.typeText('bob', '.username-field');
  utils.typeText('bobspassword', '.password-field');
  utils.clickButton('Log in');
  /* Verify that the user home page loads */
  utils.waitForPage('UserHomePage');
});
```

This will be saved to the output folder as `<input filename>.<template file extension>`. In our example, the input file `bte-doc1.md` and template file `bte-template.js` generate an output file `bte-doc1.js`.
