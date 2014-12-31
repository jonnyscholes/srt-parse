var SECOND = 1000;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;

var fs = require('fs');
var partial = require('ap').partial;

srt.fromString = fromString;
srt.parseTime = parseTime;
module.exports = srt;

function srt(fileName, callback) {
	fs.readFile(fileName, partial(returnParsedData, callback))
}

function returnParsedData(callback, err, data) {
	if (err) return callback(err);

	callback(null, fromString(data.toString()));
}

function fromString(stringData) {
	var segments = createSegments(stringData);
	return segments.reduce(createSrtData, {});
}

function createSegments(stringData) {
	var lines = stringData.split('\r\n');
	var segments = [];
	var currentSegment = [];

	lines.forEach(function (l) {
		if (l === '') {
			segments.push(currentSegment);
			currentSegment = [];
		} else {
			currentSegment.push(l);
		}
	});
	return segments;
}

function createSrtData(memo, lines) {

	if (lines.length < 3) {
		return memo;
	}

	var tmpMemo = {};
	var times = lines[1].split(' --> ');

	if (times.length >= 2)
		tmpMemo.startTime = parseTime(times[0]);
		tmpMemo.endTime = parseTime(times[1]);

	tmpMemo.number = parseInt(lines[0], 10);
	tmpMemo.text = lines.slice(2).join('\n');

	memo[tmpMemo.number] = tmpMemo;

	return memo;
}

function parseTime(timeString) {
	if (!timeString) return false;
	if(timeString.indexOf(':') === -1) return false;

	var chunks = timeString.split(':');
	var secondChunks = chunks[2].split(',');
	var hours = parseInt(chunks[0], 10);
	var minutes = parseInt(chunks[1], 10);
	var seconds = parseInt(secondChunks[0], 10);
	var milliSeconds = parseInt(secondChunks[1], 10);

	return HOUR * hours +
		MINUTE * minutes +
		SECOND * seconds +
		milliSeconds;
}