// JavaScript logic for Tic-tac-toe game including single-player mode against AI and multiplayer mode with invite via email functionality

// Game state management
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameState = "PLAYING"; // PLAYING, PLAYER_WON, AI_WON, DRAW
let playerScore = 0;
let aiScore = 0;

// UI updates
const gameBoardElement = document.getElementById('gameBoard');
const playerScoreElement = document.getElementById('playerScore');
const aiScoreElement = document.getElementById('aiScore');
const turnIndicatorElement = document.getElementById('turnIndicator');
const playNowButton = document.getElementById('playNow');
const inviteFriendButton = document.getElementById('inviteFriend');

// Function to initialize the game board
function initializeGame() {
    gameBoardElement.innerHTML = '';
    gameBoard.forEach((cell, index) => {
        gameBoardElement.innerHTML += `<div class="cell" data-cell-index="${index}">${cell}</div>`;
    });
    turnIndicatorElement.textContent = `${currentPlayer}'s Turn`;
}

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

// Function to update the cell after a click
function updateCell(clickedCell, clickedCellIndex) {
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Function to switch turns
function switchTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnIndicatorElement.textContent = `${currentPlayer}'s Turn`;
}

// Function to check the result of the game
function checkResult() {
    // Winning conditions
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameState = currentPlayer === 'X' ? 'PLAYER_WON' : 'AI_WON';
        gameActive = false;
        updateScore();
        return;
    }

    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        gameState = 'DRAW';
        gameActive = false;
        return;
    }

    switchTurns();
}

// Function to update the score
function updateScore() {
    if (gameState === 'PLAYER_WON') {
        playerScore++;
        playerScoreElement.textContent = playerScore.toString();
    } else if (gameState === 'AI_WON') {
        aiScore++;
        aiScoreElement.textContent = aiScore.toString();
    }
    // Reset the game
    resetGame();
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameState = "PLAYING";
    initializeGame();
}

// Event listeners
gameBoardElement.addEventListener('click', handleCellClick);
playNowButton.addEventListener('click', initializeGame);
inviteFriendButton.addEventListener('click', () => {
    // Implement invite via email functionality
});

// Initialize the game on load
initializeGame();
