var exec = require('child_process').exec;

if( typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.slice(0, str.length) == str;
	};
}

// Determine revision and set i2c bus
var i2cbus = '0';
exec("echo `awk '{if ($1==\"Revision\") print substr($3,length($3)-3)}' /proc/cpuinfo`", function(err, stdout, stderr) {
	var revision = stdout.slice(0, 4);
	if((!err) && (revision != '0002') && (revision != '0003')) {
		i2cbus = '1';
	}
	console.log('\u001b[34m[rasp2c]\u001b[32m Raspberry PI revision \u001b[33m%s\u001b[32m found\033[0m', revision);
	console.log('\u001b[34m[rasp2c]\u001b[32m Using I2C bus \u001b[33m%d\033[0m', i2cbus);
});
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
		items = row.slice(0, 52).split(' ');
		items.shift();
		items.forEach(function(item) {
			if((item != '') && (item != '--')) {
				result.push(parseInt('0x' + item, 16));
			}
		});
	});
	callback(null, result);
}

/**
 * Run i2cdetect to find I2C devices
 *
 * @see man i2cdetect
 *
 * @param callback The callback to call after execution
 */
exports.detect = function(callback) {
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
 * Run i2cdump to read an I2C devide
 *
 * @see man i2cdump
 *
 * @param device The address of the I2C device
 * @param range The range to read
 * @param callback The callback to call after execution
 */
exports.dump = function(device, range, callback) {
	var cmd = 'i2cdump -y ' + ( range ? '-r ' + range + ' ' : '') + i2cbus + ' ' + device;
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
 * @param device The address of the I2C device
 * @param address The address to set
 * @param value The value to set
 * @param callback The callback to call after execution
 */
exports.set = function(device, address, value, callback) {
	var cmd = 'i2cset -y ' + i2cbus + ' ' + device + ' ' + address + ' ' + value;
	exec(cmd, function(err, stdout, stderr) {
		if(err) {
			callback(err);
		} else {
			callback(null, stdout);
		}
	});
}