const State = class {
    constructor(board) {
        board ? this.board = board : this.board = [
            'E', 'E', 'E',
            'E', 'E', 'E',
            'E', 'E', 'E'
        ];
        this.oMovesCount = 0;
        this.emptyCells = () => {
            let indexes = [];
            for (let i = 0; i < this.board.length; i++) {
                if (this.board[i] =='E') {
                    indexes.push(i);
                }
            }
            return indexes;
        }
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
        this.board.includes('E') ? console.log('still running') : game.gameOver('draw');
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
        } else if (player == 'O') {
            target.innerText = 'O';
        }
        // update that state
        state.board[target.id] == 'E' ? state.board[target.id] = player : null;
        // check win conditions
        state.isTerminal() ? console.log(state.board[target.id] + " has won the game") : null;
        // switch players
        player == 'X'? player = 'O' : player = 'X';
        // if playing w/ AI, make a move
        if (player == 'O' && AIplayer && !state.isTerminal()) {
            AIplayer.makeAMove();
            state.isTerminal();
        }
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
                `<h1 style='text-align: center'>A strange game. <br> <br> The only winning move is not to play.</h1>` +
                `<div class='reset-button'>Play again</div>`
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

    calculateNextMoves() {
        let nextState = [...state.board];
        for (let i = 0; i < nextState.length; i++) {
            let newState = new State(nextState);
            console.log(newState.board);

            // if (newState.board[i] == 'E') {
            newState.board[i] = 'O';
            console.log(newState.board)
            if (i !== 0) {
                newState.board[i - 1] = 'E';
            }
            console.log(newState)
                // this.isGameOver(nextState);
                // newState.isGameOver();
                // newState.isTerminal();
            // } else { console.log(`can\'t move at position ${i}`)}
        }

    }

    makeAMove() {
        let available = state.emptyCells();
        console.log(available)
        let randomCell = Math.floor(Math.random() * available.length);
        console.log(available[randomCell]);
        console.log(state)
        if (state.board[randomCell] == 'E') {
            game.turn(boxes[available[randomCell]]);
            state.board[available[randomCell]] = 'O';
        } else {
            this.makeAMove();
        }
            // boxes[randomCell].id;

    }

    isGameOver(board) {
        if (board.isTerminal() == 'X') {
            return -10;
        } else if (board.isTerminal() == 'O') {
            return 10;
        } else {
            return 5;
        }
    }
}

let prompt = window.prompt('Would you like to play with an AI? (y/n)');

if (prompt.toLowerCase() == 'y') {
    AIplayer = new AI(game);
}

// AIplayer.calculateNextMoves();


// List of colors to apply to squares
const colors = [
    'red', 'green', 'blue',
    'darkred', 'darkgreen', 'darkblue',
    'mediumvioletred', 'lawngreen', 'blueviolet'
];

// Grab each square
let boxes = document.querySelectorAll('.square');

// Add event listeners to each square
boxes.forEach((item) => {
    item.addEventListener('click', (event) => {
        event.target.innerText == "" ? game.turn(event.target) : null;
    });
});

// Apply color to each square
colors.forEach((color, index) => boxes[index].style.backgroundColor = color);
