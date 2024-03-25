
const gameboardObject = {
	gameboard: ["", "", "", "", "", "", "", "", ""]
}

const gameflowObject = {
	gameStart: false,
	playerTurn: 'X',
	winner: '',
	drow: false,
	combinations: [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	]
}

const domElements = {
	cells: document.querySelectorAll('[data-index]'),
	button: document.querySelector('button'),
	text: document.querySelector('h2')
}

startGame()

function startGame() {
	gameflowObject.gameStart = true
	domElements.cells.forEach(cell => {cell.addEventListener('click', handleClick)})
}

function handleClick (event) {
	if (gameflowObject.playerTurn == 'X') {
		const clickedCell = event.target.getAttribute('data-index')
		
	}
}