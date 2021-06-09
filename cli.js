#!/usr/bin/env node

const getArgs = require("./args");
const glob = require("glob");
const fileio = require("@folkforms/file-io");
const { main } = require("./packages/integration/integration");

// Sort out args
//   -i/--input     => input glob
//   -s/--structure => structure doc
//   -m/--mappings  => mappings file (optional)
//   -t/--template  => template file
//   -o/--output    => output folder

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
