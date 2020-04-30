function letterCount(word, letter) {
	let counter = 0;
	let loweredWord = word.toLowerCase();
	let loweredLetter = letter.toLowerCase();
	if ( !loweredLetter ) {
		return counter;
	} else if ( loweredWord.includes(letter) ) {
		let pos = loweredWord.indexOf(letter);
		while ( pos !== -1 ) {
		pos = word.indexOf(letter, pos + 1);
		counter++;
		}
	}
	return counter;
}
letterCount('Maggy', 'g');