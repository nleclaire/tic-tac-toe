
# A game for cats

Pretty self explanatory.

# Installation

https://nleclaire.github.io/tic-tac-toe/

# Technologies used

Technologies used were JavaScript, HTML, CSS. My goal was to use as little HTML as possible.

# Planning process

I didn't draft up any wireframes for the UI itself but I did come up with a flow diagram for the AI function I'd like to implement.

# User stories

You can find my user stories in the issues tab of this repo https://github.com/nleclaire/tic-tac-toe/issues

# The Road of Trials

I wasted a lot of time trying to implement an AI that would never lose following this guide https://mostafa-samir.github.io/Tic-Tac-Toe-AI/ but unfortunately wasn't able to complete it in the allotted timeframe.

I ended up implementing an AI that would just choose a random square on the board. Even still, it has bugs that need fixin'

## Unsolved Problems:

### AI:
 
- Works, only technically. Need to make it act smarter for the wargames references
- Still buggy. Causes infinite loop sometimes near endgame with the emptyCells() function

### UX:

- There's a better way to ask the user if they want to play with the AI than a prompt that pops up before loading the page. A switch maybe?
