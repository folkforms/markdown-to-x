const args = () => {
  const inputs = {
    "-i": "input",
    "--input": "input",
    "-s": "structure",
    "--structure": "structure",
    "-m": "mappings",
    "--mappings": "mappings",
    "-t": "template",
    "--template": "template",
    "-o": "output",
    "--output": "output",
    "-e": "extension",
    "--extension": "extension",
  }
  const outputs = {};
  for(let i = 2; i < process.argv.length; i++) {
    const currentArg = process.argv[i];
    Object.keys(inputs).forEach(key => {
      if(currentArg.startsWith(key)) {
        if(currentArg === key) {
          outputs[inputs[key]] = true;
        } else {
          const value = currentArg.substring(key.length + 1);
          outputs[inputs[key]] = value;
        }
      }
    });
  }
  return outputs;
}

module.exports = args;
