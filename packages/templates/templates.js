const execute = (data, template) => {
  // console.log(`---- templates ----`);
  // console.log(`data = ${data}`);
  // console.log(`template = ${template}`);
  // console.log(`----`);
  // throw new Error(`ERROR: templates.js not implemented yet!`);

  const output = [];
  for(let i = 0; i < template.length; i++) {
    let paramData = null;
    if(paramData = containsParam(template[i], data)) { // "description[0]" or "codeSteps"
     // console.log(`#### param = ${JSON.stringify(paramData)}`);
      output.push(replaceParam(template[i], paramData, data));
    } else {
      output.push(template[i]);
    }
  };
  return output.flat();
};

const containsParam = (line, data) => {
  //console.log(`#### line = ${line}`);
  let returnData = null;
  Object.keys(data).forEach(item => {
   // console.log(`## checking ${item}`);
    if(!returnData) {
      const found = line.match(`%${item}(.*?)%`);
      if(found) {
       // console.log(`@@ found = ${found}`);
        returnData = {
          param: item,
          qualifier: found?.length > 0 && found[1] ? found[1]: undefined,
        };
      }
    }
  });
  return returnData;
}

// FIXME Do a straightforward replace with data[param], unless there is a qualifier, in which case use that
const replaceParam = (line, paramData, data) => {

  // Create replacement data
  let replacement;
  if(paramData.qualifier) {
    let found;
    const qualifier = paramData.qualifier.substring(1, paramData.qualifier.length - 1);
    //console.log(`#### qualifier = ${qualifier}`);
    //console.log(`#### found = ${qualifier.match("(\\d)")}`);
    if(found = qualifier.match("(\\d)")) {
      let line = found[1];
      replacement = data[paramData.param][line];
    } else {
      throw new Error(`Unknown qualifier: '${paramData.qualifier}' => '${qualifier}'`);
    }
  } else {
    //console.log(`#### typeof data[paramData.param] = ${typeof data[paramData.param]}`);
    replacement = data[paramData.param];
    replacement = typeof replacement === "string" ? [ replacement ] : replacement;
    replacement = replacement.join("\n");
  }

  //console.log(`#### replaceParam: line = ${line.substring(0,line.length-1)}, paramData = ${JSON.stringify(paramData)}`);
  const searchParam = `%${paramData.param}${paramData.qualifier || ""}%`;
  const x = line.replace(`${searchParam}`, replacement);
  //console.log(`#### x = ${x}`);
  return x;
}

module.exports = { execute };
