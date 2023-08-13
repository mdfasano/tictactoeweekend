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
        const col = [];
        for (let j=0; j<BOARDSIZE; j++) {
            col.push(0);
        }
        board.push(col)
    }
    console.log (board)
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
            //cellEl.className = 'unplayed';
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
 //   const cell = {}; // object for cellid and rowid
    colIdx = Math.floor(boardEls.indexOf(evt.target)/BOARDSIZE);
    rowIdx = boardEls.indexOf(evt.target)%BOARDSIZE;

    if (!isPlayableSpace(colIdx, rowIdx)) return;
    moveHelper(evt, colIdx, rowIdx);
    turn *= '-1';
    checkWinner(colIdx, rowIdx);
    renderMessage();
}
function moveHelper (evt, colIdx, rowIdx) {
    if (turn < 0) evt.target.style.background = 'no-repeat center/95% url("imgs/O.png")';
    if (turn > 0) evt.target.style.background = 'no-repeat center/95% url("imgs/X.png")';

    board[colIdx][rowIdx] = turn;
    errorMsg.style.visibility = 'hidden';
}
function isPlayableSpace (colIdx, rowIdx) {
    console.log(board[colIdx][rowIdx]);
    if (colIdx < 0 || board[colIdx][rowIdx] !== 0) {
        errorMsg.style.visibility = 'visible';
        return false
    } else return true;
}
// function checkWinner (colIdx, rowIdx) {
//     checkDiagWinNESW(colIdx, rowIdx) ||
//     checkDiagWinNWSE(colIdx, rowIdx) ||
//     checkHorWin(colIdx, rowIdx) ||
//      checkVertWin(colIdx, rowIdx)
// }

// function checkVertWin(colIdx, rowIdx) {
//     // going from north to south
//     // 0 - not changing our column
//     // -1 - moving south
//     return countAdjacent(colIdx, rowIdx, 0, -1) === 3 ? board[colIdx][rowIdx] : null
// }

// function checkHorWin(colIdx, rowIdx) {
//     // going left 
//     // -1 - we are changing columns
//     // 0 - we are not changing rows
//     const adjCountLeft = countAdjacent(colIdx, rowIdx, -1, 0)

//     // going to the right
//     // 1 - we are changing columns
//     // 0 - we are not changing rows
//     const adjCountRight = countAdjacent(colIdx, rowIdx, 1, 0)

//     return adjCountLeft + adjCountRight >= 3 ? board[colIdx][rowIdx] : null
// }

// function checkDiagWinNWSE(colIdx, rowIdx) {
//     const adjCountNW = countAdjacent(colIdx, rowIdx, -1, 1)
//     const adjCountSE = countAdjacent(colIdx, rowIdx, 1, -1)

//     return adjCountNW + adjCountSE >= 3 ? board[colIdx][rowIdx] : null
// }

// function checkDiagWinNESW(colIdx, rowIdx) {
//     const adjCountNE = countAdjacent(colIdx, rowIdx, 1, 1)
//     const adjCountSW = countAdjacent(colIdx, rowIdx, -1, -1)

//     return adjCountNE + adjCountSW >= 3 ? board[colIdx][rowIdx] : null
// }

// function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
//     // I want to grab the player
//     const player = board[colIdx][rowIdx]

//     // start count
//     let count = 0

//     colIdx += colOffset
//     rowIdx += rowOffset

//     // loop until a condition is met
//     while (
//         board[colIdx] !== undefined &&
//         board[colIdx][rowIdx] !== undefined &&
//         board[colIdx][rowIdx] === player
//     ) {
//         count++
//         colIdx += colOffset
//         rowIdx += rowOffset
//     }

//     return count
// }
