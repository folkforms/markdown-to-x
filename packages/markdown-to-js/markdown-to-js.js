// const fromMarkdown = require('mdast-util-from-markdown');

const execute = (structure, input) => {
  const output = {};
  const headings = [];
  for(let i = 0; i < structure.length; i++) {
    let param = findParam(structure[i]);
    if(param) {
      if(structure[i].startsWith("#")) {
        // Get heading level (e.g. 2)
        const level = getHeadingLevel(structure[i]);
        headings[level - 1] = headings[level - 1] ? headings[level - 1] + 1 : 1;
        // Find matching heading in input doc
        const matchingHeading = findMatchingHeading(level, headings[level - 1], input);
        output[param] = matchingHeading;
      } else {
        // Walk back up and find heading name
        for(let j = i - 1; j >= 0; j--) {
          if(structure[j].startsWith("#")) {
            const previousHeading = structure[j];
            // Find matching heading in input doc
            const body = getBody(input, previousHeading);
            output[param] = body;
            break;
          }
        }
      }
    }
  };

  return output;
}

const findParam = line => {
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
        return chop(input[i].substring(md.length));
      }
    }
  }
  return null;
}

const getBody = (input, heading) => {
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
  array = array.map(item => chop(item));
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

const chop = string => {
  return string.substring(0, string.length - 1);
}

module.exports = { execute };
