const Glue = require('glue');
const manifest = require('../manifest');

const options = {
  relativeTo: __dirname + '/../src',
};

module.exports = async function() {
  manifest.register.plugins = manifest.register.plugins.filter(plugin => !(plugin.options && plugin.options.reporters));
  return Glue.compose(
    manifest,
    options
  );
};
