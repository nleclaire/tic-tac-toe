let player = 1;

let boxes = document.querySelectorAll('.square');

boxes.forEach((item) => {
    item.addEventListener('click', (event) => {
        if (player) {
            item.innerText = 'X';
        } else {
            item.innerText = 'O';
        }
        player = !player;
    })
})
