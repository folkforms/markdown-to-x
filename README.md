# markdown-to-x

Convert markdown documents to other formats, e.g. automated browser tests or unit test input data.

## Example

You have a manual test that you want to convert to an automated browser test. But you don't want to convert it to code line-by-line (maybe because it's too tedious/you don't have enough people with the required skills/you want to keep the original English-language documents available for non-technical people.) This is where `markdown-to-x` comes in.

Read the following pages if you want to understand how your markdown gets converted from English to code:

1. [Structure document](docs/structure.md)
2. [Mappings data](docs/mappings.md)
3. [Template document](docs/templates.md)

TL;DR: You provide a structure document that describes the structure of your input files, optional mapping data used to map input data to another format (e.g. English sentences to code), a template document for the final output, and your input documents. When you run `markdown-to-x` it will use all of these to create (in this example) some automated browser tests. These tests can then be run by your favourite automated browser testing framework.

## Getting started

There are examples in the `packages/examples` folder that can be used as a starting point. I suggest you look at `packages/examples/browser-test-example` first.

## Running the code

- `yarn add markdown-to-x`
- Add the following to your `package.json` scripts:
    - `"generate-tests": "markdown-to-x -i=in/**/*.md -s=structure.md [-m=mappings.json] -t=template.js -o=out"`
- See the [command-line arguments](docs/args.md) page for more detail on the arguments.

## Other uses

`markdown-to-x` can be used used to create automated browser tests, unit tests, and other types of tests. But it is not limited to tests! It is a generic document conversion tool that can be used anywhere that you want to convert markdown into another format.
