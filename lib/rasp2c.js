var exec = require('child_process').exec;

/**
 * Run i2cdetect to find I2C devices
 *
 * @param bus The bus number of the I2C bus to scan
 * @param callback The callback to call
 */
exports.detect = function(bus, callback) {
	var cmd = 'i2cdetect -y ' + bus;
	exec(cmd, function(err, stdout, stderr) {
		if(err) {
			callback(err);
		} else {
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
	});
}