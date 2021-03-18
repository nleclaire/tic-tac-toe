const Game = class {
    constructor(player) {
        this.player = player;
        this.board = [
            'E', 'E', 'E',
            'E', 'E', 'E',
            'E', 'E', 'E'
        ];
    }

    // Change div text to player value
    turn(target) {
        if (player == 'X') {
            target.innerText = 'X';
        } else {
            target.innerText = 'O';
        }
        // update that state
        this.board[target.id] == 'E' ? this.board[target.id] = player : null;
        // is the game over?
        this.isTerminal() ? console.log(this.board[target.id] + " has won the game") : null;
        // switch players
        player == 'X' ? player = 'O' : player = 'X';
    }

    // Cover board w/ game-over div
    gameOver(type, winner) {
        document.querySelector('#game-over').classList.add('game-over');
        if (type == 'win') {
            document.querySelector('#game-over-text').innerHTML = "" +
                `<h1>The winner is... ${winner}</h1>` +
                `<div class='reset-button'>Reset board</div>`
        } else {
            document.querySelector('#game-over-text').innerHTML = "" +
                `<h1>A strange game. <br> <br> The only winning move is not to play.</h1>` +
                `<div class='reset-button'>Play again?</div>`

        }
        document.querySelector('.reset-button').addEventListener('click', () => game.reset());

    }

    // isTerminal checks for win conditions and cat's games
    isTerminal() {
        // Check rows
        for (let i = 0; i <= 6; i += 3) {
            if (this.board[i] !== 'E' && this.board[i + 1] == this.board[i] && this.board[i] == this.board[i + 2]) {
                this.gameOver('win', this.board[i]);
                return true;
            }
        }
        // Check columns
        for (let i = 0; i <= 2; i++) {
            if (this.board[i] !== 'E' && this.board[i + 3] == this.board[i] && this.board[i] == this.board[i + 6]) {
                this.gameOver('win', this.board[i]);
                return true;
            }
        }
        // Check diagonals
        for (let i = 0, j = 2; i <= 2; i++, j += 2) {
            if (this.board[i] !== 'E' && this.board[i] == this.board[i + 4] && this.board[i] == this.board[i + 8]) {
                this.gameOver('win', this.board[i]);
                return true;
            }
            if (this.board[j] !== 'E' && this.board[j] == this.board[j + 2] && this.board[j] == this.board[j + 4]) {
                this.gameOver('win', this.board[j]);
                return true;
            }
        }
        // Check for a draw
        this.board.includes('E') ? console.log('not a draw yet') : this.gameOver('draw');
    }

    reset() {
        player = 'X';
        game = new Game('X');
        boxes.forEach((item) => {
            item.innerHTML = "";
            item.removeEventListener('click', (event) => {
                event.target.innerText == "" ? game.turn(event.target) : null;
                console.log(game.board)
            });
        });
        document.querySelector('#game-over').classList.remove('game-over');
        document.querySelector('#game-over-text').innerHTML = "";
    }
}

let player = 'X';

let game = new Game(player);

const colors = [
    'red', 'green', 'blue',
    'darkred', 'darkgreen', 'darkblue',
    'mediumvioletred', 'lawngreen', 'blueviolet'
];

let boxes = document.querySelectorAll('.square');

boxes.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.target.innerText == "" ? game.turn(event.target) : null;
        console.log(game.board)
    });
});

colors.forEach((color, index) => boxes[index].style.backgroundColor = color);
