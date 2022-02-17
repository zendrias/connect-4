// Cached Element Refrences
const cells = document.querySelectorAll('.container > div')

const resultMessage = document.querySelector('#my-message')

const resetButton = document.querySelector('#reset-button')

const outterToggle = document.querySelector('.outter-toggle')

const body = document.querySelector('body')

const container = document.querySelector('.container')

const winningAudio = document.querySelector('#winnerAudio')

const clickSound = document.querySelector('#click-effect')

const canvas = document.querySelector('canvas')

const innerToggle = document.querySelector('.inner-toggle')

// Declare Game Variables
let isWinner, playerTurn, gameSlots, darkMode;

// Event Listeners
cells.forEach(function (cell) {
  cell.addEventListener('click', handleClick)
})

resetButton.addEventListener('click', intit)

outterToggle.addEventListener('click', colorMode);
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

// Game Constants

const confettiSettings = { target: 'my-canvas' };

const confetti = new ConfettiGenerator(confettiSettings);

const four = [0, 1, 2, 3];

// Calling Functions & Methods
intit();
confetti.render();

// Functions
function intit() {
  let darkMode = false;
  resetButton.setAttribute('hidden', 'true')
  canvas.setAttribute('hidden', 'true')
  if (resultMessage.classList.contains('animate__rubberBand')) {
    resultMessage.classList.remove('animate__rubberBand');
    resultMessage.classList.add('animate__bounce');
    container.classList.remove('animate__animated');
    container.classList.remove('animate__rubberBand');
  }
  gameSlots =
    [null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null]
  playerTurn = 1;
  isWinner = null;
  resultMessage.textContent = "Connect 4"
  cells.forEach(function (cell, i) {
    cell.className = ''
    darkMode === false ? cell.style.border = '' : cell.style.border = '2px white solid'
  });
  render();
}

function render() {
  gameSlots.forEach(function (cell, i) {
    let cellColor;
    if (cell === 1) {
      cellColor = 'rgba(255, 0, 0,.75)'
    } else if (cell === -1) {
      cellColor = 'rgba(255, 255, 0, .75)'
    } else if (cell === null) {
      cellColor = 'rgba(0, 0, 255,0)';
    }
    cells[i].style.background = cellColor;
  })
}

function handleClick(e) {
  let index = parseInt(this.id);
  let slotUnder = index + 7;
  if (gameSlots[index] !== null) return;
  if (isWinner !== null) return;
  if (index < 35 && cells[slotUnder].className === '') {
    alert('Invalid Move! Please Try Agian!')
    return;
  }
  e.target.className = 'X'
  gameSlots[index] = playerTurn;
  index > 34 ? cells[index].className = 'X' : ''
  playerTurn = playerTurn * -1;
  resetButton.removeAttribute('hidden')
  changeMessage()
  getWinner();
}

function getWinner() {
  render();
  winningCombos.forEach(combo => {
    if (Math.abs(gameSlots[combo[0]] + gameSlots[combo[1]] + gameSlots[combo[2]] + gameSlots[combo[3]]) === 4) {
      isWinner = gameSlots[combo[0]];
      changeMessage();
      cells[combo[0]].style.backgroundColor = "rgba(149, 225, 255, .4)"
      cells[combo[1]].style.backgroundColor = "rgba(149, 225, 255, .4)"
      cells[combo[2]].style.backgroundColor = "rgba(149, 225, 255, .4)"
      cells[combo[3]].style.backgroundColor = "rgba(149, 225, 255, .4)"
      cells[combo[0]].style.border = "solid 2px rgb(0, 183, 255)"
      cells[combo[1]].style.border = "solid 2px rgb(0, 183, 255)"
      cells[combo[2]].style.border = "solid 2px rgb(0, 183, 255)"
      cells[combo[3]].style.border = "solid 2px rgb(0, 183, 255)"
      winningAudio.play();
      canvas.removeAttribute('hidden')
      resultMessage.classList.remove('animate__bounce')
      resultMessage.classList.add('animate__animated')
      resultMessage.classList.add('animate__rubberBand')
      container.classList.add('animate__animated')
      container.classList.add('animate__rubberBand')
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
    if (playerTurn === 1) resultMessage.textContent = "Go Player One!"
    if (playerTurn === -1) resultMessage.textContent = "Go Player Two!"
  } else if (isWinner === 'T') {
    resultMessage.textContent = 'Tie Game!'
  } else if (isWinner === 1) {
    resultMessage.textContent = 'Winner! Player One!'
  } else if (isWinner === -1) {
    resultMessage.textContent = 'Winner! Player Two!'
  }
}

// This Controls Dark & Loght Mode Styling
function colorMode() {
  if (body.classList.contains('light')) {
    body.classList.remove('light')
    body.classList.add('dark')
    outterToggle.classList.remove('light')
    outterToggle.classList.add('dark')
    innerToggle.classList.remove('light')
    innerToggle.classList.add('dark')
    resetButton.classList.remove('light')
    resetButton.classList.add('dark')
    resultMessage.classList.remove('light')
    resultMessage.classList.add('dark')
    darkMode = true
  } else {
    body.classList.add('light')
    body.classList.remove('dark')
    outterToggle.classList.add('light')
    outterToggle.classList.remove('dark')
    innerToggle.classList.add('light')
    innerToggle.classList.remove('dark')
    innerToggle.classList.add('light')
    resetButton.classList.remove('dark')
    resetButton.classList.add('light')
    resultMessage.classList.remove('dark')
    resultMessage.classList.add('light')
    darkMode = false
  }
  cells.forEach(function (cell, i) {
    if (body.classList.contains('light')) {
      cell.style.border = "solid black 2px"
    } else {
      cell.style.border = "solid white 2px"
    }
  })
}

