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
const playAgainButton = document.querySelector('button');

//this will return an array bc of spread operator ...
const boardEls = [...document.querySelectorAll('.board > div')];

/*----- event listeners -----*/

//add event listener for all 9 board slots
//begin by just making the button increment turn var
document.querySelector('.board').addEventListener('click', handleMove);

playAgainButton.addEventListener('click', init);


/* ------functions------- */
init ();


function init () {
    board = [
        [0, 0, 0], //col0
        [0, 0, 0], //col1
        [0, 0, 0]  //col2
    ];
    turn = 1;
    winner = '-1';
    render();
}

function render () {
    console.log('rendering')
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
    if (winner === 'T') messageEl.innerText = 'Tie!';
    else if (winner) {
        messageEl.innerText = `${PLAYERS[winner]} wins!`
    } else {

        if(turn < 0) messageEl.innerText = "O's turn";
        if(turn > 0) messageEl.innerText = "X's turn";
    }
}

function renderControls () {
        playAgainButton.style.visibility = winner ? 'visible' : 'hidden';
}

function handleMove () {
    turn *= '-1';
    renderMessage();
}