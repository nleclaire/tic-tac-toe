const State = class {
    constructor() {
        this.board = [
            'E', 'E', 'E',
            'E', 'E', 'E',
            'E', 'E', 'E'
        ]
    }

    // isTerminal checks for win conditions and draws
    isTerminal() {
        // Check rows
        for (let i = 0; i <= 6; i += 3) {
            if (this.board[i] !== 'E' && this.board[i + 1] == this.board[i] && this.board[i] == this.board[i + 2]) {
                game.gameOver('win', this.board[i]);
                return this.board[i];
            }
        }
        // Check columns
        for (let i = 0; i <= 2; i++) {
            if (this.board[i] !== 'E' && this.board[i + 3] == this.board[i] && this.board[i] == this.board[i + 6]) {
                game.gameOver('win', this.board[i]);
                return true;
            }
        }
        // Check diagonals
        for (let i = 0, j = 2; i <= 2; i++, j += 2) {
            if (this.board[i] !== 'E' && this.board[i] == this.board[i + 4] && this.board[i] == this.board[i + 8]) {
                game.gameOver('win', this.board[i]);
                return true;
            }
            if (this.board[j] !== 'E' && this.board[j] == this.board[j + 2] && this.board[j] == this.board[j + 4]) {
                game.gameOver('win', this.board[j]);
                return true;
            }
        }
        // Check for a draw
        this.board.includes('E') ? null : game.gameOver('draw');
    }
}

let state = new State();

const Game = class {
    constructor(player) {
        this.player = player;
    }

    // Change div text to player value
    turn(target) {
        if (player == 'X') {
            target.innerText = 'X';
        } else {
            target.innerText = 'O';
        }
        // update that state
        state.board[target.id] == 'E' ? state.board[target.id] = player : null;
        // is the game over?
        state.isTerminal() ? console.log(state.board[target.id] + " has won the game") : null;
        // switch players
        player == 'X' ? player = 'O' : player = 'X';
    }

    // Cover board w/ game-over div
    gameOver(type, winner) {
        document.querySelector('#game-over').classList.add('game-over');
        if (type == 'win') {
            document.querySelector('#game-over-text').innerHTML = "" +
                `<h1 style="text-align: center">The winner is... ${winner}</h1>` +
                `<div class='reset-button'>Reset board</div>`
        } else {
            document.querySelector('#game-over-text').innerHTML = "" +
                `<h1>A strange game. <br> <br> The only winning move is not to play.</h1>` +
                `<div class='reset-button'>Play again?</div>`
        }
        document.querySelector('.reset-button').addEventListener('click', () => this.reset());
    }

    reset() {
        player = 'X';
        game = new Game('X');
        state = new State();
        boxes.forEach((item) => {
            item.innerHTML = "";
            item.removeEventListener('click', (event) => {
                event.target.innerText == "" ? game.turn(event.target) : null;
            });
        });
        document.querySelector('#game-over').classList.remove('game-over');
        document.querySelector('#game-over-text').innerHTML = "";
    }
}

let player = 'X';

let game = new Game(player);

const AI = class {
    constructor() {
        this.state = state;
        this.score = 0;
    }

    availableNextMoves() {
        let nextState = [...state.board]
        console.log(nextState)
        for (let i = 0; i < this.state.length; i++) {
            if (nextState[i] == 'E') {
                nextState[i] = 'O';
                console.log(nextState);
                break
            } else { i++ }
        }

    }

    isGameOver(board) {
        if (state.isTerminal() == 'X') {
            return -10;
        } else if (state.isTerminal() == 'O') {
            return 10;
        } else {
            return 5;
        }
    }
}

let AIplayer = new AI(game);

AIplayer.availableNextMoves();



const colors = [
    'red', 'green', 'blue',
    'darkred', 'darkgreen', 'darkblue',
    'mediumvioletred', 'lawngreen', 'blueviolet'
];

let boxes = document.querySelectorAll('.square');

boxes.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.target.innerText == "" ? game.turn(event.target) : null;
    });
});

colors.forEach((color, index) => boxes[index].style.backgroundColor = color);
