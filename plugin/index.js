const { jsxTransform } = require('./../transform');

module.exports = {
  createJsxPlugin() {
    return {
      transforms: [jsxTransform],
    };
  },
};