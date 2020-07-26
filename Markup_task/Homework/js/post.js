class FullPost {
	constructor({type, image, title, author, date, description, quote}) {
		this.type = type;
		this.image = image;
		this.title = title;
		this.author = author;
		this.date = date;
		this.description = description;
		this.quote = quote;
	}

	addImage() {
		if (this.type === 'Text' || !this.type) {
			return '';
		} else {
			return `
			<div class=" ${this.type === 'Video' ? 'post__image-wrap post__image-wrap--video p-0' : 'post__image-wrap p-0'}">
				<img src=${this.image || 'https://bit.ly/3gssa2f'} alt="Post image">
			</div>
			`
		}
	}

	addQuote() {
		if (this.quote) {
			return `
			<div class="post__blockquote">
				<span class="post__rectangle"></span>
				<p class="post__text post__text--blockquote">${this.quote}</p>
			</div>
			`
		} else {
			return '';
		}
	}

	calcReadTime() {
		const wordsNum = 120;
		return Math.ceil(this.description.split(' ').length / wordsNum);
	}

	getContent() {
		return	`
			<h2 class="post__title">${this.title}</h2>
			<div class="post__headline">
				<span class="post__avatar">
					<img src="img/blogs-page/Group/Sarah.png" alt="Avatar image">
				</span>
				<div class="post__info-wrap">
					<span class="post__name">${this.author}</span>
					<div class="post__info info">
						<span class="info__date">${this.date}</span>
						<span class="info__dot"></span>
						<span class="info__read-time">${this.calcReadTime()} min read</span>
						<span class="info__dot"></span>
						<span class="info__comments-icon"></span>
						<span class="info__comments">4</span>
						<span class="info__stars">
				<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-full.svg" class="info__star" alt="Star image">
				<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-empty.svg" class="info__star" alt="Star image">
				<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-empty.svg" class="info__star" alt="Star image">
				<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-empty.svg" class="info__star" alt="Star image">
				<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-empty.svg" class="info__star" alt="Star image">
						</span>
					</div>
				</div>
			</div>
			${this.addImage()}
			${this.type === 'Audio' ? '<audio class="post__audio" controls src="#"></audio>' : ''}
			<p class="post__text">${this.description}</p>
			${this.addQuote()}
		`
	}

	static renderContent(article) {
		const container = document.getElementById('post-content');
		const post = new this(article);
		container.innerHTML = post.getContent();
	};
}

const checkImages = () => {
	const images = document.querySelectorAll('img');
	images.forEach( image => {
		image.addEventListener('error', handleError);
	})

	function handleError(e) {
		e.target.src = 'https://bit.ly/3gssa2f';
	}
}

const fetchArticle = () => {
	const mainURL = 'http://localhost:3000';
	const id = localStorage.getItem('lastPostId');

	fetch(`${mainURL}/api/list/${id}`, {
		method: 'get',
		header: {
			'accept': 'application/json'
		}
	})
		.then(async response => {
			const parsedArticle = await response.json();

			if (response.ok) {
				return parsedArticle;
			}
			throw new Error(parsedArticle.message);
		})
		.then(article => {
			FullPost.renderContent(article);
			checkImages();
		})
		.catch(error => {
			console.log(error.message);
			window.location.href = '../homework/index.html';
		})
};

const main = () => {
	fetchArticle();

	const newPostButton = document.getElementById('new-post-btn');
	function openNewPostPage() {
		window.location.href = './newpostpage.html';
	}
	newPostButton.addEventListener('click', openNewPostPage);
};

document.addEventListener('DOMContentLoaded', main);