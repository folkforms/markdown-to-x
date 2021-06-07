# Mappings Data

The mappings are an optional set of inputs designed to convert your data from one form to another.

In our automated browser test example we want to map `steps` to a new attribute called `codeSteps`. For reference, below is the current state of our in-memory data:

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
  ]
}
```

If this is our mappings document:

```
{
    "source": "steps",
    "destination": "codeSteps",
    "comments": { "prefix": "/* ", "suffix": " */" },
    "mappings": [
        {
            "input": "Go to homepage",
            "output": "utils.navigateTo('https://localhost:3000');"
        },
        {
            "input": "Click the Log in button",
            "output": [
                "utils.clickButton('Log in');",
                "utils.waitForPage('LoginPage');"
            ]
        },
        {
            "input": "Unused step {foo}",
            "output": "utils.foo('{foo}');"
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
            "input": "Verify that the user home page loads",
            "output": "utils.waitForPage('UserHomePage');"
        }
    ]
}
```

Then our data will be transformed into this:

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

You can see we have a new `codeSteps` attribute containing our automated browser test code.

This in-memory data will be passed to the [templates](templates.md) code.
