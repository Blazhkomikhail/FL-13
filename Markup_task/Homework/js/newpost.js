const mainURL = 'http://localhost:3000';

const sendNewPostRequest = postData => {
	const URL = `${mainURL}/api/create-article`;

	fetch(URL, {
		method: 'post',
		headers: {
			'Content-Type' : 'application/json'
		},
		body: postData
	})
		.then(response => {
			if(response.ok) {
				return response.json();
			}
		})
		.then(res => {
			const resLength = res.length;
			localStorage.setItem('lastPostId', res[resLength-1].id);
			window.location.href = '../homework/post.html';
		})
		.catch(error => {
			const submitButton = document.getElementById('submit-button');
			console.log(error);
			submitButton.innerHTML = 'Create post';
			alert('Something went wrong, try again later.');
		})
}

const checkTitle = (titleValue) => {
	const minSymbolNum = 2;
	const maxSymbolNum = 20;

	const isLengthOk = titleValue.length > minSymbolNum && titleValue.length < maxSymbolNum;
	const noForbidSymbols = !(/[^a-zA-Z0-9!:-?.,\s]+/g).test(titleValue);
	const firstCapital = /^[A-Z][A-Za-z]/.test(titleValue);
    const noDigits = !(/\d+/).test(titleValue);
    const results = [isLengthOk, noForbidSymbols, firstCapital, noDigits];
    return results.every(result => result);
}

const checkType = (postType) => {
	return postType !== 'Choose...';
}

const createDate = (date) => {
	const monthArr = ['jan','feb','mar','apr','jun','jul','aug','sep','oct','dec'];
	return `${date.getDate()} ${monthArr[date.getMonth()]}, ${date.getFullYear()}`;
}

const onSubmit = event => {
	event.preventDefault();

	const factor = 1000;
	const currentDate = new Date();
	const interval = 1500;

	const id = Math.floor(Math.random() * factor);
	const type = event.target.type.value;
    const image = event.target.image.value;
    const title = event.target.title.value;
    const author = event.target.author.value;
    const date = createDate(currentDate);
    const description = event.target.description.value;
    const quote = event.target.quote.value;

    if ( !checkTitle(title) ) {
		alert(`Use only "A-Z a-z ! ? : - ." symbols, for Title. 
Title must have more than 2 and less than 20 characters. 
First letter must be capital.`);
	} else if ( !checkType(type) ) {
		alert('Choose the post type, please.')
	} else {
		const submitButton = document.getElementById('submit-button');
		submitButton.setAttribute('disabled', '');
		submitButton.innerHTML = '<span class="spinner-border text-muted"></span>';
		setTimeout( () => {
			sendNewPostRequest( JSON.stringify({id, type, image, title, author, date, description, quote}) );
		}, interval);
	}
}

const main = () => {
    const form = document.querySelector('.form');
    form.addEventListener('submit', onSubmit);
};

document.addEventListener('DOMContentLoaded', main);