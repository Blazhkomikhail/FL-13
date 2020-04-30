function positiveSum(arr) {
	let prepairedArr = arr.filter( num => num > 0);
	let result = prepairedArr.reduce( (sum, current) => sum + current, 0);
    return result;
}
positiveSum([0, -3, 5, 7]);