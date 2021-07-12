# Structure Document

The structure document describes the structure of your input markdown files. It specifies what data you want to capture for later use.

In our automated browser test example we might have the following input file:

```
# Test logging in

## Description

Test that when we log in we are brought to the user page.

## Steps

1. Go to homepage
2. Click the Log in button
3. Log in as bob/bobspassword
4. Verify that the user page loads
```

And our structure document might look like this:

```
# {title}

## Description

{description}

## Steps

{steps}
```

The code will use the above structure document to capture "title", "description" and "steps" data from the initial input document. It will create an in-memory object like this:

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

This in-memory object will then be passed to the [mappings](mappings.md) code.
