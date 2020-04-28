const maxAttempts = 3;
const noAttempts = 0;
const two = 2;
const attemptsStep = 5;
const numberRange = {
	'min' : 0,
	'max' : 5
}

let isWantToPlay = confirm('Do you want to play a game?');

if ( isWantToPlay ) {
	let tempMaxNum = numberRange.max;
	let attemptsCount = maxAttempts;
	let totalPrize = '0' + '$';
	let startPossiblePrize = '100' + '$';
	let currentPrize = startPossiblePrize;
	let maxGamePrize = startPossiblePrize;

	while ( attemptsCount > noAttempts ) {
		
		let randomNum = Math.floor(Math.random() * (tempMaxNum - numberRange.min + 1)) + numberRange.min;
		console.log(randomNum);
		let askUserNum = prompt(`Choose a roulette pocket number from ${numberRange.min} to ${tempMaxNum}
Attempts left: ${attemptsCount}
Total prize: ${totalPrize}
Possible prize on current attempt: ${currentPrize}`, '');

		if ( randomNum === Number(askUserNum) && askUserNum !== null ) {

			totalPrize = parseInt(totalPrize) + parseInt(currentPrize) + '$';

			let isWinnerWantToPlay = confirm(`Congratulation, you won!
Your prize is: ${totalPrize}.
Do you want to continue?`);

			if ( isWinnerWantToPlay ) {
				attemptsCount = maxAttempts;
				maxGamePrize = parseInt( maxGamePrize ) * two + '$';
				currentPrize = maxGamePrize;
				tempMaxNum += attemptsStep; 
			} else {
				let isWinnerSure = confirm(`Thank you for your participation.
Your prize is: ${totalPrize}.
Maybe still you want to play a game?`);

				if ( isWinnerSure ) {
					attemptsCount = maxAttempts;
					maxGamePrize = parseInt( maxGamePrize ) * two + '$';
					currentPrize = maxGamePrize;
					tempMaxNum += attemptsStep; 
				} else {
					attemptsCount = noAttempts;
					alert('See you...');
				}
			}

		} else if ( randomNum !== askUserNum && attemptsCount === 1 ) {

			alert(`Thank you for your participation. Your prize is: ${totalPrize}`);
			let isWantToPlay = confirm('Do you want to play again?');

			if ( isWantToPlay ) {
				attemptsCount = maxAttempts;
				currentPrize = startPossiblePrize;
				totalPrize = '0' + '$';
				tempMaxNum = numberRange.max;
			} else {
				attemptsCount = noAttempts;
			} 
		} else {
			currentPrize = parseInt(currentPrize) / two + '$';
			attemptsCount--;
		}
	}
	
} else {
	alert( 'You did not become a billionaire, but can.' );
}