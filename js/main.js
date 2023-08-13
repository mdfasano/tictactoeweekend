/*  -------constants-------- */

const PLAYERS = {
    1: 'X',
    '-1': 'O',
    0: 'blank'
}

/* --------variables--------*/

let board;
let turn; //1 or -1
let winner; //1, -1, T

/* -----cached elements------ */
const messageEl = document.querySelector('h2');
const playAgainButton = document.querySelector('#playAgain');

/*----- event listeners -----*/

/* ------functions------- */
init ();


function init () {
    board = [
        [0, 0, 0], //col0
        [0, 0, 0], //col1
        [0, 0, 0]  //col2
    ];
    turn = 1;
    winner = null;
    render();
}

function render () {
    renderBoard();
    renderControls();
    renderMessage();
}

function renderBoard () {
    board.forEach(function (colArr, colIdx) {
        colArr.forEach(function (cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            cellEl.style.background = 'darkgrey';
        })
    })
}

function renderMessage () {
    messageEl.innerText = "O's turn"
}

function renderControls () {
        playAgainButton.style.visibility = winner ? 'visible' : 'hidden';
}
