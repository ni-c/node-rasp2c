
module.exports = process.env.RASP2C_COV
  ? require('./lib-cov/rasp2c')
  : require('./lib/rasp2c');