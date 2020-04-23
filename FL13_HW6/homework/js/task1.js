const hundred = 100; 
const fixedNumber = 2;
let checkNumber = +prompt('Enter check number, please');
let tipPecrcentage = +prompt('Enter tip percentage, please');

if (typeof checkNumber === 'number' && typeof tipPecrcentage === 'number'
	&& checkNumber > 0 && tipPecrcentage >= 0 && tipPecrcentage <= hundred ) {
	let tipAmount = checkNumber * tipPecrcentage / hundred;
	let sumToPay = checkNumber + tipAmount;
	if (!Number.isInteger(checkNumber) || !Number.isInteger(tipPecrcentage)) {
		tipPecrcentage = tipPecrcentage.toFixed(fixedNumber);
		tipAmount = tipAmount.toFixed(fixedNumber);
		sumToPay = sumToPay.toFixed(fixedNumber);
	}
	alert(`Check number: ${checkNumber}
Tip: ${tipPecrcentage}%
Tip amount: ${tipAmount}
Total sum to pay: ${sumToPay}`);
} else {
	alert('Invalid input data');
}