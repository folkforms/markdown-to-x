const getArgs = require("./args");
const glob = require("glob");
const io = require("@folkforms/file-io");
const markdownToJs = require("./packages/markdown-to-js/markdown-to-js");
const mappings = require("./packages/mappings/mappings");
const templates = require("./packages/templates/templates");

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
const structure = io.readLines(args.structure);
const mappingsData = io.readJson(args.mappings);
const templateData = io.readLines(args.template);
inputFiles.forEach(file => {
  const input = io.readLines(file);

  const obj = markdownToJs.execute(structure, input);
  const mapped = mappings.execute(obj, mappingsData);
  const templated = templates.execute(mapped, templateData);

  let outFilename = file.substring(file.lastIndexOf("/") + 1);
  outFilename = outFilename.substring(0, outFilename.lastIndexOf("."));
  let outFileExtension = args.template.substring(args.template.lastIndexOf("."));
  io.writeLines(`${args.output}/${outFilename}${outFileExtension}`, templated);
});
