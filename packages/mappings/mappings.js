const levenshtein = require('js-levenshtein');

/**
 * Maps the data in `input[mappings.source]` to `input[mappings.destination]` using the rules
 * provided in `mappings.mappings`.
 *
 * @param {object} input input object
 * @param {object} mappings mappings object
 */
const execute = (input, mappings) => {
  const output = [];
  input[mappings.source].forEach(item => {
    const m = map(item, mappings);
    if(mappings.comments) {
      const prefix = mappings.comments.prefix || "";
      const suffix = mappings.comments.suffix || "";
      output.push([`${prefix}${item}${suffix}`, m].flat());
    } else {
      output.push(m);
    }
  });

  input[mappings.destination] = output.flat();
  return input;
};

const map = (item, mappings) => {
  for(let i = 0; i < mappings.mappings.length; i++) {
    const m = mappings.mappings[i];
    const inputs = [ m.input ].flat();
    for(let a = 0; a < inputs.length; a++) {
      const input = inputs[a];
      // Match {parameter} strings
      if(input.indexOf("{") != -1) {
        const data = convertParamsToRegex(input);
        const found = item.match(data.regex);
        if(found) {
          const outputAsArray = typeof m.output === "string" ? [ m.output ] : m.output;
          const output = [ ...outputAsArray ]; // Clone the array so that changes do not affect the original data
          for(let j = 0; j < output.length; j++) {
            for(let k = 0; k < data.params.length; k++) {
              if(output[j].indexOf(`{${data.params[k]}}`) != -1) {
                output[j] = output[j].replace(`{${data.params[k]}}`, found[k + 1]);
              }
            }
          }
          return output;
        } else {
          // Do nothing. This 'else' branch will be hit when we have a {parameter} string that does
          // not match. We just keep going the same as any non-{parameter} string that doesn't match.
        }
      } else {
        // Match non-{parameter} strings
        if(input.toUpperCase() === item.toUpperCase()) {
          return m.output;
        }
      }
    }
  }

  // Throw an error with suggested option if nothing found
  const suggestions = findSuggestion(item, mappings.mappings);
  throw new Error(`ERROR: No mapping defined for input "${item}". `
      + `The most similar mapping${suggestions.length < 2 ? " is" : "s are"}: "${suggestions.join('", "')}".`
  );
}

/**
 * Extracts params from a string and converts the param locations to regular expression groups.
 * Returns an object containing all the data. For example, given the string `"foo {bar}{muk} qux"`
 * it will return `{ params: ["bar","muk"], regex: "foo (.\*?)(.\*?) qux" }`.
 *
 * @param {string} line input string
 */
const convertParamsToRegex = line => {
  const params = [];
  let index = 0;
  while(line.indexOf("{", index) != -1) {
    let start = line.indexOf("{", index);
    let end = line.indexOf("}", index);
    const param = line.substring(start + 1, end);
    params.push(param);
    index = end + 1;
  }

  let regex = line;
  // Need to escape "{" and "}" chars with my own escape scheme
  // as I don't want them escaped by the 'escapeRegex' method
  regex = replaceAll(regex, "{", "%LEFT_BRACKET%");
  regex = replaceAll(regex, "}", "%RIGHT_BRACKET%");
  regex = escapeRegex(regex);
  regex = replaceAll(regex, "%LEFT_BRACKET%", "{");
  regex = replaceAll(regex, "%RIGHT_BRACKET%", "}");
  params.forEach(param => {
    regex = regex.replace(`{${param}}`, "(.+)");
  })
  regex = new RegExp(regex, 'i');

  return { params, regex };
}

const replaceAll = (line, str1, str2) => {
  while(line.indexOf(str1) != -1) {
    line = line.replace(str1, str2);
  }
  return line;
}

const escapeRegex = line => {
  return line.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const findSuggestion = (item, mappings) => {
  let minDistance = null;
  let suggestedItems = [];
  for(let i = 0; i < mappings.length; i++) {
    const m = [ mappings[i].input ].flat();
    for(let j = 0; j < m.length; j++) {
      let distance = levenshtein(item, m[j]);
      if(!minDistance || distance <= minDistance) {
        minDistance = distance;
        suggestedItems.push(m[j]);
      }
    }
  }
  return suggestedItems;
}

module.exports = { execute };
