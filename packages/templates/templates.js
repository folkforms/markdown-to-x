const { replaceParam } = require("./src/replaceParam");

const execute = (data, template) => {

  let output = [];
  for(let i = 0; i < template.length; i++) {
    let paramData = null;
    if(paramData = containsParam(template[i], data)) { // "description[0]" or "codeSteps"
      output.push(replaceParam(template[i], paramData, data));
    } else {
      output.push(template[i]);
    }
  };

  return output.flat();
};

const containsParam = (line, data) => {
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
