
const table = document.getElementById('table');
const startButton = document.getElementById('start');


const numRows = 25;
const numColumns = 25;

const startingRow = Math.floor(numRows / 2);
const startingColumn = Math.floor(numColumns / 2);

let snakeGrows = false;

let currentRow = startingRow;
let currentColumn = startingColumn;

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

let body = snake['body'];


let currentDirection = snake['currentDirection']



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
                
            } 
            
            newRow.appendChild(newSquare);
        }
        table.appendChild(newRow);
    }
    scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = `SCORE: ${score}`;
}


function move() {
    snakeAte();

    if(snakeGrows){
        let newSegmentLocation = [body[0][0] + currentDirection[0], body[0][1] + currentDirection[1]];
        body.unshift(newSegmentLocation);
        let newSegmentSquare = table.getElementsByTagName('tr')[newSegmentLocation[0]].getElementsByTagName('td')[newSegmentLocation[1]];
        newSegmentSquare.classList.add('snake-body');
        snakeGrows = false;

    } else {

    let head = body[0];
    let tail = body[body.length - 1];

    let newSegmentLocation = [head[0] + currentDirection[0], head[1] + currentDirection[1]];
    body.unshift(newSegmentLocation);
    let newSegmentSquare = table.getElementsByTagName('tr')[newSegmentLocation[0]].getElementsByTagName('td')[newSegmentLocation[1]];
    newSegmentSquare.classList.add('snake-body');

    
    let segToRemove = body[body.length - 1];
    
    let segToRemoveRow = segToRemove[0];
    let segToRemoveColumn = segToRemove[1];

    let segToRemoveSquare = table.getElementsByTagName('tr')[segToRemoveRow].getElementsByTagName('td')[segToRemoveColumn];
    
    segToRemoveSquare.classList.remove('snake-body');
    
    
    body.pop()
}
    

}

function movingSnake() {
    setInterval(move, 300);
}


function snakeAte() {
    let food = gameState['food'];
    let head = body[0];
    let tail = body[body.length - 1];

    if (head[0] === food[0] && head[1] === food[1]) {
        snakeGrows = true;
        score += 10;
        scoreDisplay.innerText = `SCORE: ${score}`;

        gameState['food'] = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numColumns)]
        
    }
    
    }

startButton.addEventListener('click', movingSnake);

document.addEventListener('keydown', function(event) {

    
    if(event.code === 'ArrowDown'){
        currentDirection = [1, 0];
    } else if(event.code === 'ArrowUp'){
        currentDirection = [-1, 0];
    } else if(event.code === 'ArrowLeft'){
        currentDirection = [0, -1];
    } else if(event.code === 'ArrowRight'){
        currentDirection = [0, 1];
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
}