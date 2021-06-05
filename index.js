const getArgs = require("./args");
const glob = require("glob");
const fileio = require("@folkforms/file-io");
const { main } = require("./packages/integration/integration");

// Sort out args
//   -i/--input     => input glob
//   -s/--structure => structure doc
//   -m/--mappings  => mappings file
//   -t/--template  => template file
//   -o/--output    => output folder

const verifyArgs = args => {
  console.log("FIXME Need to verify args are present and correct...");
  // FIXME Also args.output should trim any ending "/"
}

// ================================================================

const args = getArgs();
verifyArgs(args);

const inputFiles = glob.sync(args.input);
const structure = fileio.readLines(args.structure);
const mappingsData = fileio.readJson(args.mappings);
const templateData = fileio.readLines(args.template);

main(inputFiles, structure, mappingsData, templateData, args.template, args.output);
