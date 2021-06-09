#!/usr/bin/env node

const getArgs = require("./args");
const glob = require("glob");
const fileio = require("@folkforms/file-io");
const { main } = require("./packages/integration/integration");

const verifyArgs = args => {
  let error = false;
  if(!args.input) {
    console.log(`Error: Missing input glob. Use -i/--input=<glob>`);
    error = true;
  }
  if(!args.structure) {
    console.log(`Error: Missing structure document. Use -s/--structure=<structure document>`);
    error = true;
  }
  if(!args.template) {
    console.log(`Error: Missing template document. Use -t/--template=<template document>`);
    error = true;
  }
  if(!args.output) {
    console.log(`Error: Missing output folder. Use -o/--output=<output folder>`);
    error = true;
  }
  return error;
}

// ================================================================

const printHelpText = () => {
  console.log("");
  console.log("Usage:");
  console.log("");
  console.log("markdown-to-x -i=in/**/*.md -s=structure.md [-m=mappings.json] -t=template.js -o=out");
  console.log("");
  console.log("  -i/--input     => input glob");
  console.log("  -s/--structure => structure doc");
  console.log("  -m/--mappings  => mappings file (optional)");
  console.log("  -t/--template  => template file");
  console.log("  -o/--output    => output folder");
  console.log("");
}

if(process.argv.indexOf("-h") != -1 || process.argv.indexOf("--help") != -1) {
  printHelpText();
  return 0;
}

const args = getArgs();
const error = verifyArgs(args);
if(error) {
  return 1;
}

const inputFiles = glob.sync(args.input);
const structure = fileio.readLines(args.structure);
const mappingsData = args.mappings ? fileio.readJson(args.mappings) : null;
const templateData = fileio.readLines(args.template);

main(inputFiles, structure, mappingsData, templateData, args.template, args.output);
