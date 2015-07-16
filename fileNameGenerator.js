module.exports = function fileNameGenerator(name) {
	var file = name.slice(1,name.length);
	var fileName = __dirname + '/userData/' + file + '.json';
	return fileName;
}