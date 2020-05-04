//Task 1
function convert() {
	let resultArr = [];
	for (let i = 0; i < arguments.length; i++) {
		typeof arguments[i] === 'string' ? 
		resultArr.push( Number(arguments[i]) ): 
		resultArr.push( String(arguments[i]) );
	}
	return resultArr;
}
//Task 2
function executeforEach( arr, callback ) {
	for (let el of arr) {
		callback(el);
	}
}
//Task 3 
function mapArray( arr, callback ) {
	let result = [];
	executeforEach(arr, el => {
		result.push( callback(parseInt(el)) );
	})
	return result;
}
//Task 4
function filterArray( arr, callback ) {
	let result = [];
	executeforEach(arr, el => {
		if ( callback(el) ) {
			result.push(el);
		}
	})
	return result;
}
//Task 5
function containsValue( arr, value ) {
	let isContains = false;
	executeforEach( arr, el => {
		if (el === value) {
			isContains = true;
		}
	})
	return isContains;
}
//Task 6
function flipOver( str ) {
	let reversedString = '';
	for (let i = str.length - 1; i >= 0; i--) {
		reversedString += str[i];
	}
	return reversedString;
}
//Task 7
function makeListFromRange( arr ) {
	let range = [];
	for (let i = arr[0]; i <= arr[1]; i++) {
		range.push(i);
	}
	return range;
} 
//Task 8
function getArrayOfKeys ( arr, key ) {
	let result = [];
	executeforEach( arr, el => {
		result.push( el[key] );
	})
	return result;
}
//Task 9
function substitute( arr ) {
	let result = [];
	const MIN_VALUE = 10;
	const MAX_VALUE = 20;
	mapArray( arr, el => {
		if ( el > MIN_VALUE && el < MAX_VALUE ) {
			result.push('*');
		} else {
			result.push(el);
		}
	})
	return result;
}
//Task 10
function getPastDay(date, dayAmount) {
	const MONTH_ARR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; 
	const CURRENT_DATE = new Date(date);
	CURRENT_DATE.setDate(date.getDate() - dayAmount);
	return `${CURRENT_DATE.getDate()} ${MONTH_ARR[CURRENT_DATE.getMonth()]} ${CURRENT_DATE.getFullYear()}`;
}
//Task 11
function formatDate(date) {
	const ADD_ZERO_LINE = 10;
	let minutes = date.getMinutes() < ADD_ZERO_LINE ? `0${date.getMinutes()}` : date.getMinutes();
	let hours = date.getHours() < ADD_ZERO_LINE ? `0${date.getHours()}` : date.getHours();
	let month = date.getMonth() < ADD_ZERO_LINE ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
	return `${date.getFullYear()}/${month}/${date.getDate()} ${hours}:${minutes}`;
}