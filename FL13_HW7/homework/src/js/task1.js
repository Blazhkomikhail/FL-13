let login = prompt('Enter login');
const hoursLine = 20;
const minLoginLength = 4;
let users = {
	'User' : 'UserPass',
	'Admin' : 'RootPass'
}
if ( login in users ) {
	let password = prompt('Enter password');
	if ( password === users[login] ) {
		let currentHours = new Date().getHours();
		let partOfDay = currentHours < hoursLine ? 'day' : 'evening';
		let greeting = `Good ${partOfDay}, dear ${login}!`;
		alert(greeting);
	} else if( password.trim() === '' || password === null ) {
		alert('Canceled');
	} else {
		alert('Wrong password');
	}
} else if( login.trim() === '' || login === null ) {
	alert('Canceled');
} else if( login.length < minLoginLength ) {
	alert('I don\'t know any users having name length less than 4 symbols');
} else {
	alert('I don\'t know you');
}