const FS = require('fs');

// capture all paths to analyse
var paths = [];
if (process.argv.length > 2) {
	for (var i = 2; i < process.argv.length; ++i) {
		paths.push(process.argv[i]);
	}
}

// list all files in paths to analyse
var files = [];
paths.forEach(function(path) {
	FS.readdir(path, function(error, files) {
		if (error) {
			console.error(error.name + ': ' + error.message);
		} else {
			files.forEach(function(file) {
				var filePath = path + '/' + file;
				FS.lstat(filePath, function(error, stats) {
					if (error) {
						console.error(error.name + ': ' + error.message);
					} else if (stats.isFile()) {
						files.push(filePath);
					}
				});
			});
		}
	});
});
