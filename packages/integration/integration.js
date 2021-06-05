const fileio = require("@folkforms/file-io");
const markdownToJs = require("../markdown-to-js/markdown-to-js");
const mappings = require("../mappings/mappings");
const templates = require("../templates/templates");

const main = (inputFiles, structure, mappingsData, templateData, templateFilename, outputFolder) => {
  inputFiles.forEach(file => {
    const input = fileio.readLines(file);

    const obj = markdownToJs.execute(structure, input);
    const mapped = mappings.execute(obj, mappingsData);
    const templated = templates.execute(mapped, templateData);

    let outFilename = file.substring(file.lastIndexOf("/") + 1);
    outFilename = outFilename.substring(0, outFilename.lastIndexOf("."));
    let outFileExtension = templateFilename.substring(templateFilename.lastIndexOf("."));
    fileio.writeLines(`${outputFolder}/${outFilename}${outFileExtension}`, templated);
  });
}

module.exports = { main };
