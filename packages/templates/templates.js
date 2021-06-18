const nunjucks = require("nunjucks");

const execute = (template, data, additionalData) => {
  const env = nunjucks.configure({ autoescape: false });
  env.addFilter("doublequote", doubleQuote);
  env.addFilter("trimarray", trimArray);
  env.addFilter("escapedoublequotes", escapeDoubleQuotes);
  env.addFilter("escapesinglequotes", escapeSingleQuotes);
  env.addFilter("escapebackticks", escapeBackticks);
  env.addFilter("edq", escapeDoubleQuotes);
  env.addFilter("esq", escapeSingleQuotes);
  env.addFilter("ebt", escapeBackticks);

  let str = template.join("\n");
  const output = nunjucks.renderString(str, { ...data, ...additionalData });
  return output.split("\n");
};

const doubleQuote = arr => {
  return arr.map(item => `"${item}"`);
}

const trimArray = arr => {
  return arr.map(item => item.trim());
}

const escapeDoubleQuotes = str => {
  return str.replace(/"/g, `\\"`);
}

const escapeSingleQuotes = str => {
  return str.replace(/'/g, `\\'`);
}

const escapeBackticks = str => {
  return str.replace(/`/g, "\\`");
}

module.exports = { execute };
