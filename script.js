const Game = class {
    constructor(player, board) {
        this.player = player;
        this.board = [
            'E', 'E', 'E',
            'E', 'E', 'E',
            'E', 'E', 'E'
        ];
    }

    turn(target) {
        if (player == 'X') {
            target.innerText = 'X';
        } else {
            target.innerText = 'O';
        }
        this.board[target.id] == 'E' ? this.board[target.id] = player : null;
        this.isTerminal() ? console.log(this.board[target.id] + " has won the game") : null;
        player == 'X' ? player = 'O' : player = 'X';
    }

    isTerminal() {
        // Check rows
        for (let i = 0; i <= 6; i += 3) {
            if (this.board[i] !== 'E' && this.board[i + 1] == this.board[i] && this.board[i] == this.board[i + 2]) {
                document.querySelector('#game-over').classList.add('game-over');
                return true;
            }
        }
        // Check columns
        for (let i = 0; i <= 2; i++) {
            if (this.board[i] !== 'E' && this.board[i + 3] == this.board[i] && this.board[i] == this.board[i + 6]) {
                document.querySelector('#game-over').classList.add('game-over');
                return true;
            }
        }
        // Check diagonals
        for (let i = 0, j = 2; i <= 2; i++, j += 2) {
            if (this.board[i] !== 'E' && this.board[i] == this.board[i + 4] && this.board[i] == this.board[i + 8]) {
                document.querySelector('#game-over').classList.add('game-over');
                return true;
            }
            if (this.board[j] !== 'E' && this.board[j] == this.board[j + 2] && this.board[j] == this.board[j + 4]) {
                document.querySelector('#game-over').classList.add('game-over');
                return true;
            }
        }
    }
}

let player = 'X';

const game = new Game(player);

let colors = [
    'red', 'green', 'blue',
    'darkred', 'darkgreen', 'darkblue',
    'indianred', 'lawngreen', 'blueviolet'
];

let boxes = document.querySelectorAll('.square');

boxes.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.target.innerText == "" ? game.turn(event.target) : null;
        console.log(game.board)
    });
});

colors.forEach((color, index) => boxes[index].style.backgroundColor = color);
