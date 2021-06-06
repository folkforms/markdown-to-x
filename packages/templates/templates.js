const { replaceParam } = require("./src/replaceParam");
const { tokeniseAroundParams } = require("./src/tokeniseAroundParams");

const execute = (data, template) => {

  let string = template.join("\n");
  const tokens = tokeniseAroundParams(string);
  for(let i = 0; i < tokens.length; i++) {
    if(isParam(tokens[i])) {
      const paramData = extractParamData(tokens[i], data);
      const replaced = replaceParam(tokens[i], paramData, data);
      tokens[i] = replaced.join("\n");
    }
  }
  return tokens.flat().join("").split("\n");
};

const isParam = token => {
  return token[0] === "%" && token[token.length - 1] === "%";
}

const extractParamData = (line, data) => {
  let returnData = null;
  Object.keys(data).forEach(item => {
    if(!returnData) {
      const found = line.match(`%${item}(.*?)%`);
      if(found) {
        returnData = {
          param: item,
          qualifier: found?.length > 0 && found[1] ? found[1]: undefined,
        };
      }
    }
  });
  return returnData;
}

module.exports = { execute };
