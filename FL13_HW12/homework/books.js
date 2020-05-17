const BOOKS = [
	{	
		id : 1,
		name : 'Theory of relativity',
		img : 'https://i.pinimg.com/originals/a2/a3/dd/a2a3ddb671887f923b5511a15df993a1.jpg',
		author : 'Albert Einstein',
		plot : 'theory'
	},
	{	
		id : 2,
		name : 'The psychology of persuasion',
		img : 'https://slooowdown.files.wordpress.com/2012/09/influence-cialdini.png',
		author : 'Robert B.Cialdini',
		plot : 'psychology'
	}
]
let serialBooks = JSON.stringify(BOOKS);
localStorage.setItem('books', serialBooks);