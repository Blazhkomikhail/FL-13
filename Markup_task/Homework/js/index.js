const newPostButton = document.getElementById('new-post-btn');
function openNewPostPage() {
	window.location.href = './newpostpage.html';
}

newPostButton.addEventListener('click', openNewPostPage);

