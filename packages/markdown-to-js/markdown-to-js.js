let debug = false;
let options = {
  cleanLists: true,
  debug: false
};

const execute = (structure, input, userOptions) => {
  options = { ...options, ...userOptions }
  debug = options.debug;
  if(debug) { console.log(`execute: (start)`); }
  if(debug) { console.log(`execute: structure = ${structure}`); }
  if(debug) { console.log(`execute: input = ${input}`); }
  if(debug) { console.log(`execute: options = ${JSON.stringify(options)}`); }
  const output = {};
  const headings = [];
  for(let i = 0; i < structure.length; i++) {
    let param = checkIfLineContainsParam(structure[i]);
    if(param) {
      if(debug) { console.log(`execute: param = ${param}`); }
      // If param is inside a heading i.e. is the heading itself like "# {title}"
      if(structure[i].startsWith("#")) {
        // Get heading level (e.g. 2)
        const level = getHeadingLevel(structure[i]);
        headings[level - 1] = headings[level - 1] ? headings[level - 1] + 1 : 1;
        // Find matching heading in input doc
        const matchingHeading = findMatchingHeading(level, headings[level - 1], input);
        output[param] = matchingHeading;
      } else {
        // The param is part of the body i.e. "# Foo\n\n{foo}\n" -> "{foo}"
        // Walk back up and find heading name
        for(let j = i - 1; j >= 0; j--) {
          if(structure[j].startsWith("#")) {
            if(debug) { console.log(`execute: Found match for param '${param}'`); }
            const previousHeading = structure[j];
            // Find matching heading in input doc
            const body = getBody(input, previousHeading);
            if(body && options.cleanLists) {
              cleanLists(body);
            }
            output[param] = body;
            break;
          }
        }
      }
    }
  };
  return output;
}

const checkIfLineContainsParam = line => {
  const start = line.indexOf("{");
  const end = line.indexOf("}");
  if(start != -1 && end != -1) {
    return line.substring(start + 1, end);
  }
  return null;
}

const getHeadingLevel = line => {
  let count = 0;
  for(let i = 0; i < line.length; i++) {
    if(line[i] === "#") {
      count++;
    } else {
      break;
    }
  }
  return count;
}

const findMatchingHeading = (level, count, input) => {
  let md = "";
  for(let i = 0; i < level; i++) {
    md += "#";
  }
  md += " ";
  for(let i = 0; i < input.length; i++) {
    if(input[i].startsWith(md)) {
      count--;
      if(count === 0) {
        return input[i].substring(md.length).trimEnd();
      }
    }
  }
  return null;
}

const getBody = (input, heading) => {
  if(debug) { console.log(`getBody: input = ${input}, heading = ${heading}`); }

  // if(input.indexOf(heading) === -1) {
  //   if(debug) { console.log(`getBody: Heading '${heading}' not found in input '${input}'`); }
  //   return [];
  // }

  let startIndex = 0;
  for(let i = 0; i < input.length; i++) {
    if(input[i].startsWith(heading)) {
      startIndex = i;
      break;
    }
  }
  let array = [];
  for(let i = startIndex + 2; i < input.length; i++) {
    if(input[i].startsWith("#")) {
      break;
    }
    array.push(input[i]);
  }
  // Trim trailing newlines
  array = array.map(item => item.trimEnd());
  // Remove empty lines at end of array
  for(let i = array.length - 1; i >= 0; i--) {
    if(array[i].length === 0) {
      array.splice(i, 1);
    } else {
      break;
    }
  }
  return array;
}

const cleanLists = array => {
  for(let i = 0; i < array.length; i++) {
    if(array[i].startsWith("- ")) {
      array[i] = array[i].substring(2);
    } else if(array[i].match(/\d+\.\s.*?/)) {
      array[i] = array[i].substring(array[i].indexOf(". ") + 2);
    }
  }
}

module.exports = { execute };
