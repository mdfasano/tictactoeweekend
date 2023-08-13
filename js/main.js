/*  -------constants-------- */

const PLAYERS = {
    1: 'no-repeat center/95% url("imgs/X.png")',
    '-1': 'no-repeat center/95% url("imgs/O.png")',
    0: 'darkgrey'
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
            cellEl.style.background = PLAYERS[cellVal];
            //cellEl.className = 'unplayed';
        })
    })
}

function renderMessage () {
    if (winner === 'T') messageEl.innerText = 'Tie!';
    else if (winner) {
        messageEl.innerText = `${PLAYERS[winner]} wins!`
    } else {

        if(turn < 0) messageEl.innerText = `O's turn`;
        if(turn > 0) messageEl.innerText = `X's turn`;
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
   // winner = checkWinner(colIdx, rowIdx);
    render();
}
function moveHelper (evt, colIdx, rowIdx) {
    board[colIdx][rowIdx] = turn;
    errorMsg.style.visibility = 'hidden';
}
function isPlayableSpace (colIdx, rowIdx) {
    if (colIdx < 0 || board[colIdx][rowIdx] !== 0) {
        errorMsg.style.visibility = 'visible';
        return false
    } else return true;
}
// function checkWinner (colIdx, rowIdx) {
//     return (
//         // checkDiagWinNESW(colIdx, rowIdx) ||
//         // checkDiagWinNWSE(colIdx, rowIdx) ||
//         // checkHorWin(colIdx, rowIdx) ||
//         checkVertWin(colIdx, rowIdx)
//     )
// }

// function checkVertWin(colIdx, rowIdx) {
//     const countUp = countAdjacent(colIdx, rowIdx, 0, 1);
//     const countDown = countAdjacent(colIdx, rowIdx, 0, -1);

//     return  countUp + countDown >= BOARDSIZE-1 ? board[colIdx][rowIdx] : null;
// }

// // function checkHorWin(colIdx, rowIdx) {
// //     const countLeft = countAdjacent(colIdx, rowIdx, -1, 0);
// //     const countRight = countAdjacent(colIdx, rowIdx, 1, 0);

// //     return countLeft + countRight >= BOARDSIZE ? board[colIdx][rowIdx] : null;
// // }

// // function checkDiagWinNWSE(colIdx, rowIdx) {
// //     const countNW = countAdjacent(colIdx, rowIdx, -1, 1);
// //     const countSE = countAdjacent(colIdx, rowIdx, 1, -1);

// //     return countNW + countSE >= BOARDSIZE ? board[colIdx][rowIdx] : null;
// // }

// // function checkDiagWinNESW(colIdx, rowIdx) {
// //     const countNE = countAdjacent(colIdx, rowIdx, 1, 1);
// //     const countSW = countAdjacent(colIdx, rowIdx, -1, -1);

// //     return countNE + countSW >= BOARDSIZE ? board[colIdx][rowIdx] : null;
// // }

// function countAdjacent(colIdx, rowIdx, colOffset, rowOffset) {
//     // I want to grab the player
//     const player = board[colIdx][rowIdx];

//     // start count
//     let count = 0;

//     colIdx += colOffset;
//     rowIdx += rowOffset;

//     // loop until a condition is met
//     console.log(`cadj loop: c${colIdx}r${rowIdx}`)
//     while (
//         board[colIdx] !== undefined &&
//         board[colIdx][rowIdx] !== undefined &&
//         board[colIdx][rowIdx] === player
//     ) {
//         count++
//         console.log(count)
//         colIdx += colOffset;
//         rowIdx += rowOffset;
//     }

//     return count;
// }
