class Post {
	constructor ({id, type, image, title, author, date, description}) {
		this.type = type;
		this.image = image;
		this.title = title;
		this.author = author;
		this.date = date;
		this.description = description;
		this.id = id;
	}

	cutDescription() {
		const descrMaxLength = 100;
		const textDescrMaxLength = 550;

		if (!this.description) {
			return '';
		} else if (this.type === 'Text') {
			return this.description.length > textDescrMaxLength ? 
			this.description.slice(0, textDescrMaxLength) + '...' : this.description;
		} else {
			return this.description.length > descrMaxLength ? 
			this.description.slice(0, descrMaxLength) + '...' : this.description;
		}
	}

	addImage() {
		if (this.type === 'Text' || !this.type) {
			return '';
		} else {
			return `
	<div class="post__image-wrap ${this.type === 'Video' ? 'post__image-wrap--video': ''} col-lg-6 p-0">
	<img src=${this.image || 'https://bit.ly/31wy1Q1'} class="post__image card-img" alt="${this.type || ''} Picture">
	</div>
			`
		}
	}

	calcReadTime() {
		const wordsNum = 120;
		return Math.ceil(this.description.split(' ').length / wordsNum);
	}

	getContent() {
		return	`
			<div class="post post--${this.type ? this.type.toLowerCase() : 'text'} row">
				${this.addImage()}
				<div class="${this.type === 'Text' ? 
				'content--text card-body' :'post__content content col-lg-6 card-body'}">
					<div class="content__headline">
						<span class="content__avatar">
							<img src="img/blogs-page/post/description/neil.png" alt="Avatar image">
						</span>
						<div class="content__info-wrap info">
							<span class="content__name">${this.author || ''}</span>
							<div class="content__post-info info">
								<span class="info__date">${this.date || ''}</span>
								<span class="info__dot"></span>
								<span class="info__read-time">${this.calcReadTime()} min read</span>
								<span class="info__dot"></span>
								<span class="info__comments-icon"></span>
								<span class="info__comments">19</span>
								<span class="info__stars">
			<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-full.svg" class="info__star" alt="Star image">
			<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-full.svg" class="info__star" alt="Star image">
			<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-half.svg" class="info__star" alt="Star image">
			<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-empty.svg" class="info__star" alt="Star image">
			<img src="img/UI-Kit-module-8/atoms/icon/a-icon-star-empty.svg" class="info__star" alt="Star image">
								</span>
							</div>
						</div>
					</div> 
					<h5 class="content__title">${this.title || ''}</h5>
					${this.type === 'Audio' ? '<audio class="content__audio" controls src="#"></audio>' : ''}
					<p class="content__text${this.type === 'Text' ? '--description' : ''}">
					${this.cutDescription() || ''}</p>
			<button type="button" class="button button-lg button--blog-post" post-id=${this.id}>Read more</button>
					<div class="content__corner-icon content__corner-icon--${this.type 
						? this.type.toLowerCase() : 'text'}" id="corner-icon"></div>
				</div>
				<div class="content__corner-icon content__corner-icon--${this.type ? 
					this.type.toLowerCase() : 'text'}"></div>
			</div>
		`
	}

	buttonHandler(e) {
		const id = e.target.getAttribute('post-id');
		localStorage.setItem('lastPostId', id);
		window.location.href = '../homework/post.html';
	}

	addButtonEvent(button) {
		button.addEventListener('click', this.buttonHandler);
	}

	static renderContent(articles) {
		const container = document.getElementById('posts');
		articles.forEach( article => {
			if (!article.description) {
				return;
			} else {
				const post = new this(article);	
				container.insertAdjacentHTML('afterbegin', post.getContent());
				
				const postBtn = container.children[0].querySelector('button');
				post.addButtonEvent(postBtn);
			}
		})
	}
}

const checkImages = () => {
	const images = document.querySelectorAll('img');
	images.forEach( image => {
		image.addEventListener('error', handleError);
	})

	function handleError(e) {
		e.target.src = 'https://bit.ly/31wy1Q1';
	}
}

const fetchArticles = () => {
	const mainURL = 'http://localhost:3000';

	fetch( `${mainURL}/api/list/`, {
		method: 'get',
		header: {
			'accept': 'application/json'
		}
	})
		.then(async response => {
			const parsedArticles = await response.json();

			if (response.ok) {
				return parsedArticles;
			}

			throw new Error(parsedArticles.message)
		})
		.then(articles => {
			Post.renderContent(articles);
			checkImages();
		})
		.catch(error => {
			console.log(error.message);
			window.location.href = '../homework/index.html';
		})
};

const main = () => {
    fetchArticles();
	const newPostButton = document.getElementById('new-post-btn');
	function openNewPostPage() {
		window.location.href = './newpostpage.html';
	}
	newPostButton.addEventListener('click', openNewPostPage);
}

document.addEventListener('DOMContentLoaded', main);