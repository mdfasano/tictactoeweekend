/*  -------constants-------- */

const PLAYERS = {
    1: 'X',
    '-1': 'O',
    0: 'blank'
}

//3x3 board, scaleable  if we want?
const BOARDSIZE = 3;

/* --------variables--------*/

let board = [];
let turn; //1 or -1
let winner; //1, -1, T

/* -----cached elements------ */
const messageEl = document.querySelector('h2');
const playAgainButton = document.querySelector('button');
const errorMsg = document.querySelector('.errorMsg')
//this will return an array bc of spread operator ...
const boardEls = [...document.querySelectorAll('.board > div')];

/*----- event listeners -----*/

//add event listener for all 9 board slots
document.querySelector('.board').addEventListener('click', handleMove);
playAgainButton.addEventListener('click', init);


/* ------functions------- */
init ();


function init () {
    for (let i=0; i<BOARDSIZE; i++) {
        const row = [];
        for (let j=0; j<BOARDSIZE; j++) {
            row.push(0);
        }
        board.push(row)
    }
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
            cellEl.className = 'unplayed';
        })
    })
}

function renderMessage () {
    if (winner === 'T') messageEl.innerText = 'Tie!';
    else if (winner) {
        messageEl.innerText = `${PLAYERS[winner]} wins!`
    } else {

        if(turn < 0) messageEl.innerText = `${PLAYERS[turn]}'s turn`;
        if(turn > 0) messageEl.innerText = `${PLAYERS[turn]}'s turn`;
    }
}

function renderControls () {
        errorMsg.style.visibility = 'hidden'
        playAgainButton.style.visibility = winner ? 'visible' : 'hidden';
}

function handleMove (evt) {
    // colIdx = Math.floor(boardEls.indexOf(evt.target)/3);
    // rowIdx = boardEls.indexOf(evt.target)%3;
    // console.log(`col${colIdx} row${rowIdx}`)

    if (!isPlayableSpace(evt.target)) return;
    moveHelper(evt);
    turn *= '-1';
    renderMessage();
}
function moveHelper (evt) {
    if (turn < 0) evt.target.style.background = 'no-repeat center/95% url("imgs/O.png")';
    if (turn > 0) evt.target.style.background = 'no-repeat center/95% url("imgs/X.png")';

    evt.target.className = 'played';
    errorMsg.style.visibility = 'hidden';
}
function isPlayableSpace (el) {
    if (!el.id || el.className === 'played') {
        errorMsg.style.visibility = 'visible';
        return false
    } else return true;
}