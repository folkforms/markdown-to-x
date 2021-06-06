const replaceParam = (line, paramData, data, additionalData) => {
  const combinedData = { ...data, ...additionalData };

  // Define search param
  const searchParam = `%${paramData.param}${paramData.qualifier || ""}%`;

  // Calculate indentation
  let indentation = "";
  const leftPart = line.substring(0, line.indexOf(searchParam));
  if(!leftPart.match(/\S+/)) {
    indentation = leftPart;
  }

  // Create replacement data
  let replacement;
  if(paramData.qualifier) {
    let found;
    const qualifier = paramData.qualifier.substring(1, paramData.qualifier.length - 1); // Remove brackets
    if(found = qualifier.match("line:(\\d)")) {
      let line = found[1];
      replacement = ensureArray(combinedData[paramData.param])[line];
    } else if(found = qualifier.match("indent:(\\d)")) {
      let indent = found[1];
      replacement = ensureArray(combinedData[paramData.param]);
      replacement = applyIndentation(replacement, indent);
    } else {
      throw new Error(`Unknown qualifier: '${paramData.qualifier}' => '${qualifier}'`);
    }
  } else {
    replacement = ensureArray(combinedData[paramData.param]);
  }
  
  // Replace the parameter
  replacement = ensureArray(replacement);
  replacement = replacement.join("\n");
  const x = line.replace(`${searchParam}`, replacement);
  return ensureArray(x.split("\n"));
}

const ensureArray = item => {
  return item = typeof item === "string" ? [ item ] : item;
}

const applyIndentation = (arr, indent) => {
  let prefix = "";
  while(prefix.length < indent) {
    prefix += " ";
  }
  return arr.map(item => prefix + item);
}

module.exports = { replaceParam };
