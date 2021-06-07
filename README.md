# markdown-to-x

Convert markdown documents to other formats, e.g. automated tests.

## Example

You have a manual test that you want to convert into an automated browser test. But you don't want to convert it to code line-by-line (maybe because it's too tedious/you don't have enough people with the required skills/you want to keep the original english-language documents available for non-technical people.) This is where `markdown-to-x` comes in.

You provide mapping data that will be used to map english sentences to code, a structure document that describes the structure of your input files, a template document for the final output, and of course your input markdown documents. When you run `markdown-to-x` it will use these inputs to create (in this case) your automated browser tests. These tests can then be run by your favourite automated browser testing framework.

I would suggest you read the following pages in order to understand how your markdown gets converted step-by-step from english to code.

1. [Structure document](docs/structure.md)
2. [Mappings data](docs/mappings.md)
3. [Template document](docs/templates.md)
4. [Command-line arguments](docs/args.md)

There are also a handful of examples in the `packages/examples` folder.

## Other uses

`markdown-to-x` is not specific to automated testing and can be used in many situations. It can be used to create automated browser tests, unit tests and other types of tests. I'm sure there are other uses I have not thought of yet! Anywhere that you want to describe a set of data as markdown and later covert that data into another format.
