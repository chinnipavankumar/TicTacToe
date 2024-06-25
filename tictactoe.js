// Define a TicTacToe object
const TicTacToe = {
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    currentPlayerMark: 'X',
    isGameOver: false,
    
    // Initialize the game board
    initializeBoard: function() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = ''; // Clear previous content

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = i.toString();
                cell.dataset.col = j.toString();
                cell.textContent = this.board[i][j];
                cell.addEventListener('click', this.handleClick.bind(this));
                boardElement.appendChild(cell);
            }
        }
    },

    // Handle click on cell
    handleClick: function(event) {
        if (this.isGameOver) return;

        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (this.board[row][col] === '') {
            this.board[row][col] = this.currentPlayerMark;
            event.target.textContent = this.currentPlayerMark;

            if (this.checkForWin()) {
                this.isGameOver = true;
                alert(`Player ${this.currentPlayerMark} wins!`);
            } else if (this.isBoardFull()) {
                this.isGameOver = true;
                alert(`The game is a tie!`);
            } else {
                this.changePlayer();
            }
        } else {
            alert('Invalid move! Try again.');
        }
    },

    // Check for a win
    checkForWin: function() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] !== '' &&
                this.board[i][0] === this.board[i][1] &&
                this.board[i][1] === this.board[i][2]) {
                return true;
            }
        }

        // Check columns
        for (let j = 0; j < 3; j++) {
            if (this.board[0][j] !== '' &&
                this.board[0][j] === this.board[1][j] &&
                this.board[1][j] === this.board[2][j]) {
                return true;
            }
        }

        // Check diagonals
        if (this.board[0][0] !== '' &&
            this.board[0][0] === this.board[1][1] &&
            this.board[1][1] === this.board[2][2]) {
            return true;
        }
        if (this.board[0][2] !== '' &&
            this.board[0][2] === this.board[1][1] &&
            this.board[1][1] === this.board[2][0]) {
            return true;
        }

        return false;
    },

    // Check if the board is full
    isBoardFull: function() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === '') {
                    return false;
                }
            }
        }
        return true;
    },

    // Change player turn
    changePlayer: function() {
        this.currentPlayerMark = (this.currentPlayerMark === 'X') ? 'O' : 'X';
    },

    // Reset the game
    resetGame: function() {
        this.board = [['', '', ''], ['', '', ''], ['', '', '']];
        this.currentPlayerMark = 'X';
        this.isGameOver = false;
        this.initializeBoard();
    }
};

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
    TicTacToe.initializeBoard();
});

// Function to reset the game when the Reset button is clicked
function resetGame() {
    TicTacToe.resetGame();
}
