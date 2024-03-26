
const gameboardObject = {
	gameboard: ["", "", "", "", "", "", "", "", ""]
}

const gameflowObject = {
	playerTurn: 'X',
	winner: '',
	drow: false,
	emptyCells: true,
	winner: '',
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
	domElements.cells.forEach(cell => {cell.addEventListener('click', handleClick)})
	display()
}

function showTurn(turn) {
	if (turn == 'turn') {
		domElements.text.textContent = `the player ${gameflowObject.playerTurn}'s turn.`
	} else if (turn == 'corrupted') {
		domElements.text.textContent = 'the cell is corrupted.'
	} else if (turn == 'drow') {
		domElements.text.textContent = 'the game is drow.'
	} else if (turn == 'win') {
		domElements.text.textContent = `the player ${winner} won.`
	}
}

function display() {
	for (let i = 0; i < gameboardObject.gameboard.length; i++) {
		let current = document.querySelector(`[data-index="${i}"]`)
		current.textContent = gameboardObject.gameboard[i]
	}
}

function handleClick (event) {
	let clickedCell

	if(event) {
		if (gameflowObject.playerTurn == 'X') {
			clickedCell = event.target.getAttribute('data-index')
			if (gameboardObject.gameboard[clickedCell] == '') {
				gameboardObject.gameboard[clickedCell] = 'X'
				gameflowObject.playerTurn = 'O'
				showTurn('turn')
				checkWinner()
			} else {
				showTurn('corrupted')
				checkWinner()
			}
		} else if (gameflowObject.playerTurn == 'O') {
			clickedCell = event.target.getAttribute('data-index')
			if (gameboardObject.gameboard[clickedCell] == '') {
				gameboardObject.gameboard[clickedCell] = 'O'
				gameflowObject.playerTurn = 'X'
				showTurn('turn')
				checkWinner()
			} else {
				showTurn('corrupted')
				checkWinner()
			}
		}
		display()
	}
}

function checkWinner() {
	checkEmptyCells()
	for (let i = 0; i < gameflowObject.combinations.length; i++) {
		const [a, b, c] = gameflowObject.combinations[i]
		if (gameboardObject.gameboard[a] === 'X' && 
		gameboardObject.gameboard[b] === 'X' &&
		gameboardObject.gameboard[c] === 'X') {winner = 'X'; showTurn('win'); stop()
		} else if (gameboardObject.gameboard[a] === 'O' && 
		gameboardObject.gameboard[b] === 'O' &&
		gameboardObject.gameboard[c] === 'O') {winner = 'O'; showTurn('win'); stop()
		} else if (gameflowObject.emptyCells == false && gameflowObject.winner == '') {
			winner = 'drow'; showTurn('drow'); stop()
		} 
	}
}

function checkEmptyCells() {
	if ((gameboardObject.gameboard.every(element => !!element)) == true) {
		gameflowObject.emptyCells = false 
	} else {gameflowObject.emptyCells = true}
}

function stop() {
	domElements.cells.forEach(cell => {cell.removeEventListener('click', handleClick)})
}

	function restart() {
		domElements.button.addEventListener('click', function (event) {
			if (event) {
				gameboardObject.gameboard = ["", "", "", "", "", "", "", "", ""]
				gameflowObject.playerTurn = 'X'
				gameflowObject.drow = false
				gameflowObject.emptyCells = true
				gameflowObject.winner = ''
				showTurn('turn')
				display()
				startGame()
			}
		})
	}

	restart()