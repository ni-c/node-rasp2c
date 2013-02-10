
module.exports = process.env.JADE_COV
  ? require('./lib-cov/rasp2c')
  : require('./lib/rasp2c');