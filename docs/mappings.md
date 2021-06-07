# Mappings Data

The mappings are an optional set of inputs designed to convert your data from one form to another.

In our automated browser test example we want to map the `steps` attribute to a new attribute called `codeSteps`. For reference, this is the current state of our in-memory object:

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
  ]
}
```

This is our mappings document:

```
{
    "source": "steps",
    "destination": "codeSteps",
    "comments": { "prefix": "/* ", "suffix": " */" },
    "mappings": [
        {
            "input": [
              "Go to homepage",
              "Go to home page"
            ],
            "output": "utils.navigateTo('https://localhost:3000');"
        },
        {
            "input": [
              "Click the Log in button",
              "Click the Login button"
            ],
            "output": [
                "utils.clickButton('Log in');",
                "utils.waitForPage('LoginPage');"
            ]
        },
        {
            "input": "Log in as {username}/{password}",
            "output": [
                "utils.typeText('{username}', '.username-field');",
                "utils.typeText('{password}', '.password-field');",
                "utils.clickButton('Log in');"
            ]
        },
        {
            "input": "Verify that the user page loads",
            "output": "utils.waitForPage('UserHomePage');"
        }
    ]
}
```

Note 1: We use `{username}` and `{password}` variables in the mapping input `"Log in as {username}/{password}"`. Anything in `{}` in an input will be treated as a variable and substituted into the output.

Note 2: We can have multiple inputs that map to an output, e.g. `[ "Go to homepage", "Go to home page"]`. This allows for alternate spellings and suchlike. If any inputs match then the entire output will be used.

When the mappings code is run our in-memory object will gain a new attribute called `codeSteps`:

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

Note 3: You can see that comments have been added automatically as part of `codeSteps`. This is to help trace the new data back to the original data. If you want to disable comments you can set comments as `undefined` in your mappings JSON.

The in-memory object will then be passed to the [templates](templates.md) code.
