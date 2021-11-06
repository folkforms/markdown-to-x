const markdownToJs = require("../markdown-to-js/markdown-to-js");
const mappings = require("../mappings/mappings");
const templates = require("../templates/templates");

/**
 * Converts the input file to the output format using the given structure, template and (optionally)
 * mappings files.
 *
 * Note that the output is not necessarily JSON. It is in whatever format the template contained.
 *
 * @param {array} input input data array
 * @param {array} structure structure file array
 * @param {object} mappingsObj mappings data object (optional)
 * @param {array} templateData template data array
 * @param {string} filename input filename
 * @return an array of strings containing the output data
 */
const markdownToX = (input, structure, mappingsObj, templateData, filename) => {
  const additionalData = { "@filename": filename };
  const obj = markdownToJs.execute(structure, input);
  const mapped = mappingsObj ? mappings.execute(obj, mappingsObj) : obj;
  const templated = templates.execute(templateData, mapped, additionalData);
  return templated;
}

module.exports = markdownToX;
