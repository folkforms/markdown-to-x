# Structure Document

The structure document describes the structure of your markdown input files, and denotes the data in those documents that you want to capture.

For example, if this is one of your input files:

```
# Test logging in

## Description

Test that when we log in we go to the user home page.

## Steps

1. Go to homepage
2. Click the Log in button
3. Log in as bob/bobspassword
4. Verify that the user home page loads
```

Then your structure document might look like this:

```
# {title}

## Description

{description}

## Steps

{steps}
```

Here you want to capture the title and the contents of the "Description" and "Steps" sections. The code will use the structure document to extract that data and create an in-memory object as shown below.

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

You can see the level 1 heading "Test logging in" is now the value of the "title" attribute, and the contents of the "Description" and "Steps" sections were converted into arrays of strings called "description" and "steps".

This in-memory data will be passed to the [mappings](mappings.md) code.
