const asyncErrors = require("./async-errors");
const setEnv = require("./server");

module.exports = () => {
  setEnv();
  asyncErrors;
};
