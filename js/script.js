// Cached Element Refrences
const cells = document.querySelectorAll('.container > div')

const resultMessage = document.querySelector('#my-message')

console.log(resultMessage)
// Declare Game Variables
let isWinner, playerTurn, gameSlots;

// Event Listeners
cells.forEach(function (cell, i) {
  cell.addEventListener('click', handleClick)
})
// Constants
const winningCombos = [
  [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10],
  [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24],
  [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31],
  [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3],
  [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22],
  [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18],
  [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],
  [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15],
  [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24],
  [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10],
  [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17],
  [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31],
  [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18],
  [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],
  [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25],
  [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32],
  [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4],
  [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
  [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25],
  [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30],
  [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28],
  [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31],
  [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
];


// Functions
intit();

function intit() {
  //resetButton.setAttribute('hidden', 'true')
  gameSlots =
    [null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null]
  playerTurn = 1;
  isWinner = null;
  render();
}

function render() {
  gameSlots.forEach(function (cell, i) {
    let cellColor;
    if (cell === 1) {
      cellColor = 'blue'
    } else if (cell === -1) {
      cellColor = 'red'
    } else if (cell === null) {
      cellColor = 'white';
    }
    cells[i].style.backgroundColor = cellColor;
  })
}

function handleClick(e) {
  // resetButton.removeAttribute('hidden')
  let index = this.id;
  let _index = parseInt(index);
  if (_index === 35 || _index === 36 || _index === 37 || _index === 38 || _index === 39 || _index === 40 || _index === 41) {
    e.target.className = 'X'
  }
  // console.log(gameSlots[_index])
  // if (gameSlots[_index - 7].className !== 'X') return
  if (gameSlots[index] !== null) return;
  if (isWinner !== null) return;
  //if (gameSlots[index] - 7 === null) return;
  gameSlots[index] = playerTurn;
  console.log(gameSlots[index])
  if (gameSlots[_index + 7].className !== 'X') return
  playerTurn = playerTurn * -1;
  getWinner();
}

function getWinner() {
  render();
  winningCombos.forEach(combo => {
    if (Math.abs(gameSlots[combo[0]] + gameSlots[combo[1]] + gameSlots[combo[2]] + gameSlots[combo[3]]) === 4) {
      isWinner = gameSlots[combo[0]];
      changeMessage();
    }
  })
  let tieGame = gameSlots.some(numb => numb === null)
  if (tieGame === false && isWinner !== 1 && isWinner !== -1) {
    isWinner = 'T'
    changeMessage();
  }
}

function changeMessage() {
  if (isWinner === null) {
    if (playerTurn === 1) resultMessage.textContent = "Player One's Move"
    if (playerTurn === -1) resultMessage.textContent = "Player Two's Move"
  } else if (isWinner === 'T') {
    resultMessage.textContent = 'Tie Game! Select The "Reset Game" Button To Play Again'
  } else if (isWinner === 1) {
    resultMessage.textContent = 'Player One Has Won The Game'
  } else if (isWinner === -1) {
    resultMessage.textContent = 'Player Two Has Won The Game'
  }
}