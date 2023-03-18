
const table = document.getElementById('table');
const startButton = document.getElementById('start');


const numRows = 25;
const numColumns = 25;

const startingRow = Math.floor(numRows / 2);
const startingColumn = Math.floor(numColumns / 2);

let snakeGrows = false;

let currentRow = startingRow;
let currentColumn = startingColumn;
let currentDirectionWord = 'left';
let snake = {
    'body': [[startingRow, startingColumn]],
    'currentDirection': [0, -1]
}


let foodStartingRow = Math.floor(Math.random() * numRows);
let foodStartingColumn = Math.floor(Math.random() * numColumns);

let gameState = {
    'food': [foodStartingRow, foodStartingColumn],
    'snake': snake
}

console.log(gameState['food']);

let body = snake['body'];
let snakeColor = '#272727';

let currentDirection = snake['currentDirection']
let dead = false;


let score = 0;
let scoreDisplay;

window.onload = function() {
    for (let i = 0; i < numRows; i++) {
        let newRow = document.createElement('tr');
        for (let j = 0; j < numColumns; j++) {
            let newSquare = document.createElement('td');

            if (i === foodStartingRow && j === foodStartingColumn) {
                newSquare.classList.add('food');
            }

            else if (i === startingRow && j === startingColumn) {
                newSquare.classList.add('snake-body');
                newSquare.style.backgroundColor = snakeColor;
               
                
            } 
            
            newRow.appendChild(newSquare);
        }
        table.appendChild(newRow);
    }
    scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = `SCORE: ${score}`;
}


function move() {
    checkAte();
    checkDied();

    if (dead){
        died();
        return;
    } else {

    if(snakeGrows){
        let newSegmentLocation = [body[0][0] + currentDirection[0], body[0][1] + currentDirection[1]];
        body.unshift(newSegmentLocation);
        let newSegmentSquare = table.getElementsByTagName('tr')[newSegmentLocation[0]].getElementsByTagName('td')[newSegmentLocation[1]];
        newSegmentSquare.classList.add('snake-body');
        newSegmentSquare.style.backgroundColor = snakeColor;
        snakeGrows = false;

    } else {

    let head = body[0];


    let newSegmentLocation = [head[0] + currentDirection[0], head[1] + currentDirection[1]];
    body.unshift(newSegmentLocation);
    let newSegmentSquare = table.getElementsByTagName('tr')[newSegmentLocation[0]].getElementsByTagName('td')[newSegmentLocation[1]];
    newSegmentSquare.classList.add('snake-body');
    newSegmentSquare.style.backgroundColor = snakeColor;
    
    let segToRemove = body[body.length - 1];
    
    let segToRemoveRow = segToRemove[0];
    let segToRemoveColumn = segToRemove[1];

    let segToRemoveSquare = table.getElementsByTagName('tr')[segToRemoveRow].getElementsByTagName('td')[segToRemoveColumn];

    
    segToRemoveSquare.classList.remove('snake-body');
    segToRemoveSquare.style.backgroundColor = '#44543D';
    
    
    body.pop()
}
}
    

}

function movingSnake() {
    setInterval(move, 300);
}


function checkAte() {
    let food = gameState['food'];
    let head = body[0];

    if (head[0] === food[0] && head[1] === food[1]) {
        
        snakeGrows = true;
        score += 10;
        scoreDisplay.innerText = `SCORE: ${score}`;

        let currentFoodRow = table.getElementsByTagName('tr')[food[0]];
        let currentFoodSquare = currentFoodRow.getElementsByTagName('td')[food[1]];

        currentFoodSquare.classList.remove('food');

        gameState['food'] = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numColumns)]
        food = gameState['food'];

        let newFoodRow = table.getElementsByTagName('tr')[food[0]];
        let newFoodSquare = newFoodRow.getElementsByTagName('td')[food[1]];

        newFoodSquare.classList.add('food');

    } 
}

function checkDied() {
    let head = body[0];
    if ((head[0] === 0 && currentDirectionWord === 'up') || (head[0] === (numRows - 1) && currentDirectionWord === 'down')) {
        for (let i = 0; i < body.length; i++){
            let changeSquare = table.getElementsByTagName('tr')[body[i][0]].getElementsByTagName('td')[body[i][1]];
            changeSquare.style.backgroundColor = snakeColor;
        }
        dead = true;
        died();
        
        
        
    }
 else if ((head[1] === 0 && currentDirectionWord === 'left') || (head[1] === (numColumns - 1) && currentDirectionWord === 'right')) {
    for (let i = 0; i < body.length; i++){
        let changeSquare = table.getElementsByTagName('tr')[body[i][0]].getElementsByTagName('td')[body[i][1]];
        changeSquare.style.backgroundColor = snakeColor;
        
    }
        dead = true;
        died();
        
       
 }
}

startButton.addEventListener('click', movingSnake);

document.addEventListener('keydown', function(event) {    
    if(event.code === 'ArrowDown'){
        if(currentDirectionWord === 'up'){
            currentDirection = [-1, 0]
            
        } else {
        currentDirection = [1, 0];
        currentDirectionWord = 'down';
    }
    } else if(event.code === 'ArrowUp'){
        if(currentDirectionWord === 'down'){
            currentDirection = [1, 0];
        } else {
        currentDirection = [-1, 0];
        currentDirectionWord = 'up';
        }
    } else if(event.code === 'ArrowLeft'){
        if(currentDirectionWord === 'right'){
            currentDirection = [0, 1]
        } else {
        currentDirection = [0, -1];
        currentDirectionWord = 'left';
    }
    } else if(event.code === 'ArrowRight'){
        if(currentDirectionWord === 'left'){
            currentDirection = [0, -1]
        } else {
        currentDirection = [0, 1];
        currentDirectionWord = 'right';
        
    }
    } else if(event.code === 'Space'){ 
        console.log(body);
        currentDirection = [0, 0];
    }

})

// --------------------------------------------------------------------------------------------------------------------------------------------------

// NONPLAYER FUNCTIONS 

function died() {

    let text = document.getElementById('text');
    text.innerText = 'U DIED :( '
    return;
}