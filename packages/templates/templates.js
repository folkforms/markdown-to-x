const { replaceParam } = require("./src/replaceParam");
const { tokeniseAroundParams } = require("./src/tokeniseAroundParams");

const execute = (template, data, additionalData) => {

  let string = template.join("\n");
  const tokens = tokeniseAroundParams(string);
  for(let i = 0; i < tokens.length; i++) {
    if(isParam(tokens[i])) {
      const paramData = extractParamData(tokens[i], data, additionalData);
      const replaced = replaceParam(tokens[i], paramData, data, additionalData);
      tokens[i] = replaced.join("\n");
    }
  }
  return tokens.flat().join("").split("\n");
};

const isParam = token => {
  return token[0] === "%" && token[token.length - 1] === "%";
}

const extractParamData = (line, data, additionalData) => {
  const combinedData = { ...data, ...additionalData };
  let returnData = null;
  Object.keys(combinedData).forEach(item => {
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
