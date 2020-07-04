const renderArticle = ({type, image, title, author, date, description}) => {
	
	const cutDescription = () => {
		const descrMaxLength = 100;
		const textDescrMaxLength = 550;

		if (!description) {
			return '';
		} else if (type === 'Text') {
			return description.length > textDescrMaxLength ? 
			description.slice(0, textDescrMaxLength) + '...' : description;
		} else {
			return description.length > descrMaxLength ? 
			description.slice(0, descrMaxLength) + '...' : description;
		}
	}
	
	const addImage = () => {
		if (type === 'Text' || !type) {
			return '';
		} else {
			return `
			<div class="post__image-wrap ${type === 'Video' ? 'post__image-wrap--video': ''} col-lg-6 p-0">
				<img src=${image || 'https://bit.ly/31wy1Q1'} class="post__image card-img" alt="${type || ''} Picture">
			</div>
			`
		}
	}

	const calcReadTime = () => {
		const wordsNum = 120;
		return Math.ceil(description.split(' ').length / wordsNum);
	}

	return	`
		<div class="post post--${type ? type.toLowerCase() : 'text'} row">
			${addImage()}
			<div class="${type === 'Text' ? 'content--text card-body' : 'post__content content col-lg-6 card-body'}">
				<div class="content__headline">
					<span class="content__avatar">
						<img src="img/blogs-page/post/description/neil.png" alt="Avatar image">
					</span>
					<div class="content__info-wrap info">
						<span class="content__name">${author || ''}</span>
						<div class="content__post-info info">
							<span class="info__date">${date || ''}</span>
							<span class="info__dot"></span>
							<span class="info__read-time">${calcReadTime()} min read</span>
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
				<h5 class="content__title">${title || ''}</h5>
				${type === 'Audio' ? '<audio class="content__audio" controls src="#"></audio>' : ''}
				<p class="content__text${type === 'Text' ? '--description' : ''}">${cutDescription() || ''}</p>
				<button type="button" class="button button-lg button--blog-post">Read more</button>
				<div class="content__corner-icon content__corner-icon--${type 
					? type.toLowerCase() : 'text'}" id="corner-icon"></div>
			</div>
			<div class="content__corner-icon content__corner-icon--${type ? type.toLowerCase() : 'text'}"></div>
		</div>
	`
}

const container = document.getElementById('posts');

const renderContent = articles => {
	const container = document.getElementById('posts');
	articles.forEach( article => {
		if (!article.description) {
			return;
		} else {
			const element = renderArticle(article);

			container.insertAdjacentHTML('afterbegin', element);
		}
	})
};

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
		.then(articles => renderContent(articles))
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