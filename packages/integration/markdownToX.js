const markdownToJs = require("../markdown-to-js/markdown-to-js");
const mappings = require("../mappings/mappings");
const templates = require("../templates/templates");

/**
 * Converts the input file to the output format using the given structure, template and (optionally)
 * mappings files.
 *
 * Note that the output is not necessarily JSON. It is in whatever format the template contained.
 *
 * `options` (and their defaults):
 * ```
 * {
 *   cleanLists: true // Removes bullet points '-' and '*' from lists when parsing
 *   debug: false
 * }
 * ```
 *
 * @param {array} input input data array
 * @param {array} structure structure file array
 * @param {object} mappingsObj mappings data object (optional)
 * @param {array} templateData template data array
 * @param {string} filename input filename
 * @param {object} options object of supported options
 * @return an array of strings containing the output data
 */
const markdownToX = (input, structure, mappingsObj, templateData, filename, options) => {
  const additionalData = {
    "@filename": filename,
    "@contents": input,
  };
  const obj = markdownToJs.execute(structure, input, options);
  const mapped = mappingsObj ? mappings.execute(obj, mappingsObj, options) : obj;
  const templated = templates.execute(templateData, mapped, additionalData, options);
  return templated;
}

module.exports = markdownToX;
