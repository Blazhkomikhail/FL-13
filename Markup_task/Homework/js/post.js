const renderArticle = ({type, image, title, author, date, description, quote}) => {
	const addImage = () => {
		if (type === 'Text' || !type) {
			return '';
		} else {
			return `
			<div class=" ${type === 'Video' ? 'post__image-wrap post__image-wrap--video p-0' : 'post__image-wrap p-0'}">
				<img src=${image || 'https://bit.ly/3gssa2f'} alt="Post image">
			</div>
			`
		}
	}

	const addQuote = () => {
		if (quote) {
			return `
			<div class="post__blockquote">
				<span class="post__rectangle"></span>
				<p class="post__text post__text--blockquote">${quote}</p>
			</div>
			`
		} else {
			return '';
		}
	}

	const calcReadTime = () => {
		const wordsNum = 120;
		return Math.ceil(description.split(' ').length / wordsNum);
	}

	return	`
		<h2 class="post__title">${title}</h2>
		<div class="post__headline">
			<span class="post__avatar">
				<img src="img/blogs-page/Group/Sarah.png" alt="Avatar image">
			</span>
			<div class="post__info-wrap">
				<span class="post__name">${author}</span>
				<div class="post__info info">
					<span class="info__date">${date}</span>
					<span class="info__dot"></span>
					<span class="info__read-time">${calcReadTime()} min read</span>
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
		${ addImage() }
		${type === 'Audio' ? '<audio class="post__audio" controls src="#"></audio>' : ''}
		<p class="post__text">${description}</p>
		${ addQuote() }
	`
};

const checkImages = () => {
	const images = document.querySelectorAll('img');
	images.forEach( image => {
		image.addEventListener('error', handleError);
	})

	function handleError(e) {
		e.target.src = 'https://bit.ly/3gssa2f';
	}
}

const renderContent = article => {
  const container = document.getElementById('post-content');
  container.innerHTML = renderArticle(article)
};

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
		.then(art => {
			renderContent(art);
			checkImages();
		})
		.catch(error => {
			console.log(error.message);
			window.location.href = '../homework/index.html'
		})
};

const main = () => {
   fetchArticle();
};

document.addEventListener('DOMContentLoaded', main);