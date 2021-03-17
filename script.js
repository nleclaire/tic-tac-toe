const Game = class {
    constructor(player, board) {
        this.player = player;
        this.board = [
            'E', 'E', 'E',
            'E', 'E', 'E',
            'E', 'E', 'E'
        ];
    }

    turn(id) {
        this.board[id] = player;
        player == 'X' ? player = 'O' : player = 'X';
    }
}

let player = 'X';

const game = new Game(player);

let colors = [
    'red', 'green', 'blue',
    'darkred', 'darkgreen', 'darkblue',
    'indianred', 'lawngreen', 'blueviolet'
]

let boxes = document.querySelectorAll('.square');

colors.forEach((color, index) => boxes[index].style.backgroundColor = color);

boxes.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (player) {
            item.innerText = 'X';
        } else {
            item.innerText = 'O';
        }
        game.turn(event.target.id);
    })
})


