let isBigger = (a, b) => a > b;

function countPoints (arr) {
	let points = 0;
	let scoreA = 0;
	let scoreB = 0;
	arr.forEach( item => {
		scoreA = Number(item.split(':')[0]);
		scoreB = Number(item.split(':')[1]);
		if ( scoreA === scoreB) {
			points += 1;
		} else {
			points += isBigger(scoreA, scoreB) ? 3 : 0;
		}
	})
	return points;
}
countPoints(['3:1', '1:0', '0:0', '1:2', '4:0', '2:3', '1:1', '0:1', '2:1', '1:0']);