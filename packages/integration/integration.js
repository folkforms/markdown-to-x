const fileio = require("@folkforms/file-io");
const markdownToJs = require("../markdown-to-js/markdown-to-js");
const mappings = require("../mappings/mappings");
const templates = require("../templates/templates");

const main = (inputFiles, structure, mappingsData, templateData, templateFilename, outputFolder) => {
  inputFiles.forEach(file => {
    const input = fileio.readLines(file);
    const additionalData = { "@filename": file };

    const obj = markdownToJs.execute(structure, input);
    const mapped = mappingsData ? mappings.execute(obj, mappingsData) : obj;
    const templated = templates.execute(mapped, templateData, additionalData);

    let outFilename = file.substring(file.lastIndexOf("/") + 1);
    outFilename = outFilename.substring(0, outFilename.lastIndexOf("."));
    let outFileExtension = templateFilename.substring(templateFilename.lastIndexOf("."));
    fileio.writeLines(`${outputFolder}/${outFilename}${outFileExtension}`, templated);
  });
}

module.exports = { main };
