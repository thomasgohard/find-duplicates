// capture all paths to analyse
var paths = [];
if (process.argv.length > 2) {
	for (var i = 2; i < process.argv.length; ++i) {
		paths.push(process.argv[i]);
	}
}
