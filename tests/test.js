var test = require('tape');
var fs = require('fs');
var srt = require('../index.js');

var validSrtFileString = fs.readFileSync(__dirname+'/fixtures/valid.srt', 'utf8');

test('From string test - valid SRT file', function (t) {
	t.plan(1);
	var srtObject = srt.fromString(validSrtFileString);

	t.deepEqual(srtObject, {
		1: {
			endTime: 78000,
			number: 1,
			startTime: 74500,
			text: 'But we don\'t have a fishtank.'
		},
		2: {
			endTime: 79500,
			number: 2,
			startTime: 78000,
			text: '- We could get one.\n- Oh, mister.'
		},
		3: {
			endTime: 86700,
			number: 3,
			startTime: 83200,
			text: 'Mom, will you still be a science teacher\nwhen I get into high school?'
		},
		4: {
			endTime: 89400,
			number: 4,
			startTime: 86700,
			text: 'Hmm...\nyou never know.'
		},
		5: {
			endTime: 91400,
			number: 5,
			startTime: 89500,
			text: 'Why?'
		}
	});
});