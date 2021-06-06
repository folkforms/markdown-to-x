const tokeniseAroundParams = line => {
  let insideToken = false;
  let index = 0;
  const tokens = [ "" ];
  for(let i = 0; i < line.length; i++) {
    if(line[i] === "%" && !insideToken) {
      insideToken = !insideToken;
      index++;
      tokens[index] = line[i];
    } else if(line[i] === "%" && insideToken) {
      insideToken = !insideToken;
      tokens[index] += line[i];
      index++;
      tokens[index] = "";
    } else {
      tokens[index] += line[i];
    }
  }
  return tokens.filter(item => item.length > 0);
}

module.exports = { tokeniseAroundParams };
