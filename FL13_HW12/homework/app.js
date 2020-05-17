const root = document.getElementById('root');
let books = JSON.parse( localStorage.getItem('books') );
const authorIndex = 2;
const plotIndex = 3;

window.addEventListener('popstate', popstateEvent);
separateScreen();
loadHomePage();

function loadHomePage() {
	createStaticSection();
	clearLeftSection();
	addPreviewEvent();
	addEditevent();
}

function clearLeftSection() {
	let leftSectionWrap = document.querySelector('.left-section');
	leftSectionWrap.innerHTML = '';
}

function separateScreen() {
	let leftSectionWrap = document.createElement('div');
	let rightSectionWrap = document.createElement('div');
	leftSectionWrap.classList.add('left-section');
	rightSectionWrap.classList.add('static-section');
	root.innerHTML = rightSectionWrap.outerHTML + leftSectionWrap.outerHTML;
}

function render(content, section = 'left') {
	let sectionClass = document.querySelector(`.${section}-section`);
	sectionClass.innerHTML = content;
}

function createStaticSection() {
	let wrap = document.createElement('div');
	let item = document.createElement('div');
	let imgWrap = document.createElement('div');
	let header = document.createElement('h3');
	let coverImg = document.createElement('img');
	wrap.classList.add('static-section-wrap');
	item.classList.add('static-section-item');
	imgWrap.classList.add('static-section-img');
	header.classList.add('static-section-header');
	for (let elem of books) {
		header.innerText = elem.name;
		coverImg.classList.add('static-section__book-cover');
		coverImg.setAttribute('src', elem.img);
		coverImg.setAttribute('item-id', elem.id);
		coverImg.setAttribute('Alt', elem.name + ' cover');
		imgWrap.innerHTML = coverImg.outerHTML;
		item.innerHTML = header.outerHTML + imgWrap.outerHTML + createEditButton('item-edit-btn', 'Edit', elem.id);
		wrap.innerHTML += item.outerHTML;
	}
	render(wrap.outerHTML, 'static');
}

function createEditButton(btnClass, content, id) {
	let btnSelf = document.createElement('button');
	btnSelf.textContent = content;
	btnSelf.setAttribute('item-id', id);
	btnSelf.classList.add(btnClass);
	return btnSelf.outerHTML;
}

function addPreviewEvent() {
	let booksCoverNodeList = document.querySelectorAll('.static-section__book-cover');
	booksCoverNodeList.forEach(item => {
		item.addEventListener('click', createBookPreview);
	})
}

function createBookPreview(e) {
	if (e) {
		changeUrl(e, 'preview');	
	}
	let currentId = +history.state.id;
	let previewWrap = document.createElement('div');
	let imgWrap = document.createElement('div');
	let header = document.createElement('h3');
	let coverImg = document.createElement('img');
	let authorParagraph = document.createElement('p');
	let plotParagraph = document.createElement('p');
	previewWrap.classList.add('preview-wrap');
	imgWrap.classList.add('preview-img-wrap');
	header.classList.add('preview-header');
	for (let elem of books) {
		if (elem.id === currentId) {
			header.innerText = elem.name;
			coverImg.setAttribute('src', elem.img);
			coverImg.setAttribute('Alt', elem.name + ' cover');
			authorParagraph.innerText = `Author: ${elem.author}`;
			plotParagraph.innerText = `Plot: ${elem.plot}`;
		}
	}
	imgWrap.innerHTML = coverImg.outerHTML;
	previewWrap.innerHTML = header.outerHTML + authorParagraph.outerHTML +
	plotParagraph.outerHTML + imgWrap.outerHTML;
	render(previewWrap.outerHTML) ;
}	

function changeUrl(e, hashName) {
	let id = e.target.getAttribute('item-id');
	let url = `?id={${id}}#${hashName}`;
	history.pushState({'id': id, 'hash' : hashName}, null, url);
}

function popstateEvent() {
	if (!history.state) {
		loadHomePage();
	} else if (history.state.hash === 'preview') {
		createBookPreview();
	}
}

function addEditevent() {
	let editButtonNodes = document.querySelectorAll('.item-edit-btn');
	editButtonNodes.forEach( elem => {
		elem.addEventListener( 'click', editEvent);
	})
}

function editEvent(e) {
	if (e) {
		changeUrl(e, 'edit');
	}
	let currentId = +history.state.id;
	let editWrap = document.createElement('div');
	let editHeading = document.createElement('h3');
	let editForm = document.createElement('form');
	let header = document.createElement('INPUT');
	let urlInp = document.createElement('INPUT'); 
	let authorParagraph = document.createElement('INPUT');
	let plotParagraph = document.createElement('INPUT');
	editHeading.innerText = 'Editting mode';
	editForm.name = 'Edit book';
	editForm.method = '#';
	header.type = 'text';
	urlInp.type = 'text';
	authorParagraph.type = 'text';
	plotParagraph.type = 'text';
	editForm.classList.add('edit-form');
	editForm.innerHTML = header.outerHTML + urlInp.outerHTML + 
	authorParagraph.outerHTML +	plotParagraph.outerHTML;
	editWrap.innerHTML = editHeading.outerHTML + editForm.outerHTML + 
	createEditButton('edit__cancel-btn', 'Cancel', currentId) + 
	createEditButton('edit__save-btn', 'Save', currentId);
	render(editWrap.outerHTML);
	let form = document.querySelector('.edit-form');
	for (let elem of books) {
		if (elem.id === currentId) {
			form.childNodes[0].value = elem.name;
			form.childNodes[1].value = elem.img;
			form.childNodes[authorIndex].value = elem.author;
			form.childNodes[plotIndex].value = elem.plot;
		}
	}
	addCancelBtnEvent();
	addSaveBtnEvent();
}

function addCancelBtnEvent() {
	let btn = document.querySelector('.edit__cancel-btn');
	btn.addEventListener('click', cancelBtnEvent);
}

function cancelBtnEvent() {
	let isDiscard = confirm('Discard changes?');
	if (isDiscard) {
		history.back();
	}
}

function addSaveBtnEvent() {
	let btn = document.querySelector('.edit__save-btn');
	btn.addEventListener('click', saveBtnEvent);
}

function saveBtnEvent() { 
	let currentId = +history.state.id;
	let form = document.querySelector('.edit-form');
	let someInputEmpty = false;
	let newBookProp = {};
	let oldBookIndex;
	form.childNodes.forEach(elem => {
		if (!elem.value) {
			someInputEmpty = true;
		}
	})

	if ( someInputEmpty ) {
		alert('Fill in all the fields, please');
	} else {
		const timeout = 3000;
		books.forEach( (elem, i) => {
			if (elem.id === currentId) {
				oldBookIndex = i;
				newBookProp.id = elem.id;
				newBookProp.name = form.childNodes[0].value;
				newBookProp.img = form.childNodes[1].value;
				newBookProp.author = form.childNodes[authorIndex].value;
				newBookProp.plot = form.childNodes[plotIndex].value;
			}
		})
		books[oldBookIndex] = newBookProp;
		let serialBooks = JSON.stringify(books);
		localStorage.setItem('books', serialBooks);
		books = JSON.parse( localStorage.getItem('books') );
		setTimeout(function(){
			alert('Book successfully updated');
			loadHomePage();
		},timeout);
		
	}
}