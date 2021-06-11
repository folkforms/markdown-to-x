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
  let replacement = ensureArray(combinedData[paramData.param]);
  if(paramData.qualifier) {
    let found;
    const qualifier = paramData.qualifier.substring(1, paramData.qualifier.length - 1); // Remove brackets
    const tokens = qualifier.split(",");
    tokens.forEach(q => {
      let ok = false;
      if(found = q.match("line:(\\d)")) {
        let line = found[1];
        replacement = ensureArray(replacement[line]);
        ok = true;
      }
      if(found = q.match("indent:(\\d)")) {
        let indent = found[1];
        replacement = applyIndentation(replacement, indent);
        ok = true;
      }
      if(q === "toArray") {
        let r = [ "[" ];
        for(let i = 0; i < replacement.length; i++) {
          r.push("  \"" + replacement[i] + "\"" + `${i < replacement.length - 1 ? "," : ""}`);
        }
        r.push("]");
        replacement = r;
        ok = true;
      }
      if(q === "fromCodeBlock") {
        replacement = replacement.map(item => item.substring(4));
        ok = true;
      }
      if(q === "escape") {
        replacement = replacement.map(item => item.replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/`/g, '\\`'));
        ok = true;
      }
      if(!ok) {
        throw new Error(`ERROR: Unknown qualifier: '${q}'`);
      }
    });
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
