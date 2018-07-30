const CRYPTO = require('crypto');
const FS = require('fs');

// capture all paths to analyse
var paths = [];
if (process.argv.length > 2) {
	for (var i = 2; i < process.argv.length; ++i) {
		paths.push(process.argv[i]);
	}
}

// list all files in paths to analyse, get the file size and sha256 hash for each
var files = {};
paths.forEach(function(path) {
	FS.readdir(path, function(error, listing) {
		if (error) {
			console.error(error.name + ': ' + error.message);
		} else {
			listing.forEach(function(entry) {
				var filePath = path + '/' + entry;

				FS.lstat(filePath, function(error, stats) {
					if (error) {
						console.error(error.name + ': ' + error.message);
					} else if (stats.isFile()) {
						var fileSize = stats.size;

						if (!files[fileSize]) {
							files[fileSize] = {};
						}

						FS.readFile(filePath, function(error, data) {
							if (error) {
								console.error(error.name + ': ' + error.message);
							} else {
								var hash = CRYPTO.createHash('sha256');

								hash.update(data);

								var hashDigest = hash.digest('hex');

								if (!files[fileSize][hashDigest]) {
									files[fileSize][hashDigest] = [];
								}

								files[fileSize][hashDigest].push(filePath);
							}
						});
					}
				});
			});
		}
	});
});
