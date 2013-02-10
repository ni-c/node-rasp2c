var exec = require('child_process').exec;

/**
 * Parse the given stdout into an array
 *
 * @param stdout The stdout to parse
 * @param callback The callback to call after execution
 */
function parse(stdout, callback) {
	var result = [];
	var rows = stdout.split('\n');
	rows.shift();
	rows.forEach(function(row) {
		items = row.split(' ');
		items.shift();
		items.forEach(function(item) {
			if((item != '') && (item != '--')) {
				result.push(item);
			}
		})
	});
	callback(null, result);
}

/**
 * Run i2cdetect to find I2C devices
 *
 * @see man i2cdetect
 *
 * @param i2cbus The bus number of the I2C bus to scan
 * @param callback The callback to call after execution
 */
exports.detect = function(i2cbus, callback) {
	var cmd = 'i2cdetect -y ' + i2cbus;
	exec(cmd, function(err, stdout, stderr) {
		if(err) {
			callback(err);
		} else {
			parse(stdout, function(err, result) {
				callback(null, result);
			})
		}
	});
}
/**
 * Run i2cset to set an an value
 *
 * @see man i2cset
 *
 * @param i2cbus The bus number of the I2C bus
 * @param address The address of the I2C device
 * @param value The value to set
 * @param callback The callback to call after execution
 */
exports.set = function(i2cbus, address, value, callback) {
	var cmd = 'i2set -y ' + i2cbus + ' ' + address + ' ' + value;
	exec(cmd, function(err, stdout, stderr) {
		if(err) {
			callback(err);
		} else {
			callback(null, stdout);
		}
	});
}