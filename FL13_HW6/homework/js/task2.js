let world = prompt('Enter your world, please', 'Dog');
const one = 1;
const two = 2;

if ( world.trim() === '' ) {
	alert('Invalid input data');
} else if( world.length % two === 0 ) {
	let startMiddleIndex = world.length / two - one;
	let middleLetters = world.charAt(startMiddleIndex) + world.charAt(startMiddleIndex + one);
	alert(middleLetters);
} else {
	let middleLetterIndex = Math.floor( world.length / two );
	alert(world.charAt(middleLetterIndex));
} 