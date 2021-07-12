const markdownToJs = require("../markdown-to-js/markdown-to-js");
const mappings = require("../mappings/mappings");
const templates = require("../templates/templates");

const markdownToX = (input, structure, mappingsData, templateData, filename) => {
  const additionalData = { "@filename": filename };
  const obj = markdownToJs.execute(structure, input);
  const mapped = mappingsData ? mappings.execute(obj, mappingsData) : obj;
  const templated = templates.execute(templateData, mapped, additionalData);
  return templated;
}

module.exports = markdownToX;
