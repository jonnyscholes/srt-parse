var test = require('tape');
var fs = require('fs');
var srt = require('../index.js');

var validSrtFileString = fs.readFileSync(__dirname+'/fixtures/valid.srt', 'utf8');

test('fromString: Valid SRT file', function (t) {
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

test('parseTime: Passing valid time', function (t) {
	t.plan(1);
	var srtObject = srt.parseTime('00:56:02,240');

	t.deepEqual(srtObject, 3362240);
});

// @todo @test: Make this test pass
test('parseTime: Passing INvalid time', function (t) {
	t.plan(1);
	var srtObject = srt.parseTime('0a:56:02,240');

	t.deepEqual(srtObject, false);
});

test('parseTime: Passing undefined', function (t) {
	t.plan(1);
	var srtObject = srt.parseTime(undefined);

	t.deepEqual(srtObject, false);
});

test('parseTime: Passing html', function (t) {
	t.plan(1);
	var srtObject = srt.parseTime('<font color="#00ffff">kucing_gaul  (Nakashima_Tadayoshi)</font>');

	t.deepEqual(srtObject, false);
});

// @todo @test: Make this test pass
test('parseTime: Passing text with semicolon', function (t) {
	t.plan(1);
	var srtObject = srt.parseTime('some: text!');

	t.deepEqual(srtObject, false);
});