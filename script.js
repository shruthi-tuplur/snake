let snakeHead = document.getElementById('snake-head');
let board = document.getElementById('game-board');
let foodX = Math.floor(Math.random() * 501);
let foodY = Math.floor(Math.random() * 251)

let foodNeg = Math.floor(Math.random())

if (foodNeg < 0.5) {
    foodY *= -1;
}

 
let snakeCurrentRight = 0;
let snakeCurrentUp = 250;
let startButton  = document.getElementById('start');
let currentDirection = 'left';
let food = document.getElementById('food').style;

food.top = `${foodX}`;
food.right = `${foodY}`;

console.log(food.top);
console.log(food.right);

function moveSnake() {

    if (currentDirection === 'left'){

        snakeHead.style.right = `${snakeCurrentRight}px`
        if (snakeCurrentRight >= 240){
            console.log('hit wall');
            return;
        } else {
            snakeCurrentRight += 15;
        }
        
    } 
    else if (currentDirection === 'right'){
        snakeHead.style.right = `${snakeCurrentRight}px`
        if (snakeCurrentRight <= -240){
            console.log('hit wall');
            return;
        } else {
            snakeCurrentRight -= 15;
        }
        }
    else if (currentDirection === 'up'){
        snakeHead.style.top = `${snakeCurrentUp}px`
        if (snakeCurrentUp <= 9){
            console.log('hit wall');
            return;
        } else {
            snakeCurrentUp -= 15;
        }
        
        }

    else if (currentDirection === 'down'){
        snakeHead.style.top = `${snakeCurrentUp}px`
        
        if (snakeCurrentUp >= 490){
            console.log('hit wall');
            return;
        } else {
            snakeCurrentUp += 15;
        }
        
        }    
}

function startGame() {
    setInterval(moveSnake, 300);
}


function turnRight() {
    currentDirection = 'right';
}

function turnLeft() {
    currentDirection = 'left';
}


function turnUp() {
    currentDirection = 'up'
}


function turnDown() { // for what !!
    currentDirection = 'down';
}

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', function(event) {
    if(event.code === 'ArrowDown'){
        turnDown();
    } else if(event.code === 'ArrowUp'){
        turnUp();
    } else if(event.code === 'ArrowLeft'){
        turnLeft();
    } else if(event.code === 'ArrowRight'){
        turnRight();
    }

})
