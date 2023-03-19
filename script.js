// SETTING GLOBAL VARIABLES

// CONSTANTS
const table = document.getElementById('table');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset-button');
const numSegmentsDisplay = document.getElementById('num-segments-display');

const numRows = 25;
const numColumns = 25;

const startingRow = Math.floor(numRows / 2);
const startingColumn = Math.floor(numColumns / 2);

const windowBackground = document.getElementById('body');
const allButtons = document.getElementsByTagName('button');
const gameDiv = document.getElementById('game-div');

// theme buttons

buttons();

// NON-CONSTANTS 

// DEFAULT VALUES
let snakeColors = [];
let backgroundColor = '#44543D';
let windowBackgroundColor = '#44543D'
let windowColor = '#272727';
let snakeGrows = false;
let snakeColor = '#272727';
let foodColor = '#A13939';
let changeColorSquare;
let colorSquare;
let score = 0;
let dead = false;
let currentDirectionWord = 'left';
let foodStartingRow = Math.floor(Math.random() * numRows);
let foodStartingColumn = Math.floor(Math.random() * numColumns);
let snake = {
    'body': [[startingRow, startingColumn]],
    'currentDirection': [0, -1]
}

// VARIABLES THAT CHANGE OFTEN 
let body = snake['body'];
let currentDirection = snake['currentDirection']
let food;
let scoreDisplay;

// VARIABLES THAT SET THE GAME STATE
let gameLoop;
let gameState = {
    'food': [foodStartingRow, foodStartingColumn],
    'snake': snake
}


// --------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS TO SET/RESET GAME
//window.onload = resetGame();


function resetGame() {
    windowBackground.style.backgroundColor = windowBackgroundColor;
    windowBackground.style.color = windowColor;
    
    for (let i = 0; i < numRows; i++) {
        let newRow = document.createElement('tr');
        for (let j = 0; j < numColumns; j++) {
            let newSquare = document.createElement('td');
            newSquare.style.backgroundColor = backgroundColor;
            newSquare.style.borderColor = backgroundColor;

            if (i === foodStartingRow && j === foodStartingColumn) {
                newSquare.classList.add('food');
                newSquare.style.backgroundColor = foodColor;
                
                
            }

            else if (i === startingRow && j === startingColumn) {
                newSquare.classList.add('snake-body');
                newSquare.style.backgroundColor = snakeColor;
               
                
            } 
            
            newRow.appendChild(newSquare);
        }
        table.appendChild(newRow);

        
    }

    score = 0;
    numSegments = 1;
    snake['body'] = [[startingRow, startingColumn]];
    body = snake['body'];
    
    snake['currentDirection'] = [0, -1];
    currentDirection = snake['currentDirection'];

    currentDirectionWord = 'left';
    dead = false;



    scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = `SCORE: ${score}`;
}

function restartGame(){
    clearInterval(gameLoop);
    resetButton.style.display = 'none';
    startButton.style.display = 'flex';
    
    numSegmentsDisplay.style.display = 'none';

    for (let i= 0; i < numRows; i++){
        for (let j = 0; j < numColumns; j++){
            let square = table.getElementsByTagName('tr')[i].getElementsByTagName('td')[j];
            square.style.backgroundColor = '#44543D';
    }
    }

    for (let i = 0; i < 3; i++){
        while (table.firstChild){
            table.removeChild(table.firstChild);
        }
    }
    resetGame();
    
    let text = document.getElementById('text');
    text.innerText = 'SNAKE';

    gameState['food'] = [foodStartingRow, foodStartingColumn];
    
}


function died() {
    let numSegments = body.length;
    let text = document.getElementById('text');
    text.innerText = 'U DIED :( '

    let rightDiv = document.getElementById('right-div');
    numSegmentsDisplay.style.display = 'flex';

    if(numSegments === 1){
    numSegmentsDisplay.innerText = `YOUR SNAKE HAD ${numSegments} SEGMENT WHEN IT DIED.`
 } else {
    numSegmentsDisplay.innerText = `YOUR SNAKE HAD ${numSegments} SEGMENTS WHEN IT DIED.`
 }
    rightDiv.appendChild(numSegmentsDisplay);
    
    clearInterval(gameLoop);
}

startButton.addEventListener('click', movingSnake);

// --------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS TO MOVE/GROW SNAKE

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
    segToRemoveSquare.style.backgroundColor = backgroundColor;
    
    
    body.pop()
}
}
    

}

function movingSnake() {
    resetGame();
    gameDiv.style.display = 'flex';
    let gameOptions = document.getElementById('game-options');
    gameOptions.style.display = 'none';
    startButton.style.display = 'none';
    resetButton.style.display = 'flex';
    resetButton.addEventListener('click', restartGame)
    gameLoop = setInterval(move, 300);

}

function newFood(){
    food = gameState['food'];
    
    let currentFoodRow = table.getElementsByTagName('tr')[food[0]];
        let currentFoodSquare = currentFoodRow.getElementsByTagName('td')[food[1]];

        currentFoodSquare.classList.remove('food');

        gameState['food'] = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numColumns)];
        food = gameState['food'];


        let newFoodRow = table.getElementsByTagName('tr')[food[0]];
        let newFoodSquare = newFoodRow.getElementsByTagName('td')[food[1]];


        newFoodSquare.classList.add('food');
        newFoodSquare.style.backgroundColor = foodColor;
        
        
}


function checkAte() {
    food = gameState['food'];
    let head = body[0];

    if (head[0] === food[0] && head[1] === food[1] && score === 10) {
        
        snakeGrows = true;
        score += 10;
        scoreDisplay.innerText = `SCORE: ${score}`;

        changeColor();

    } else {
    
    if (head[0] === food[0] && head[1] === food[1]) {
        
        snakeGrows = true;
        score += 10;
        scoreDisplay.innerText = `SCORE: ${score}`;

        newFood();

    }
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
        
    }
    else if ((head[1] === 0 && currentDirectionWord === 'left') || (head[1] === (numColumns - 1) && currentDirectionWord === 'right')) {
        for (let i = 0; i < body.length; i++){
            let changeSquare = table.getElementsByTagName('tr')[body[i][0]].getElementsByTagName('td')[body[i][1]];
            changeSquare.style.backgroundColor = snakeColor;
            
        }
            dead = true;
       
    } else {
        for (let i = 1; i < body.length; i++) {
            if (head[0] == body[i][0] && head[1] == body[i][1]){
                console.log('hello');
                dead = true;
            }
        }
    }
}

function changeColor(){
    changeColorSquare = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numColumns)];


    colorSquare = table.getElementsByTagName('tr')[changeColorSquare[0]].getElementsByTagName('td')[changeColorSquare[1]];
    let colorSquareInd = Math.floor(Math.random() * snakeColors.length)
    colorSquare.style.backgroundColor = snakeColors[colorSquareInd];
    console.log(colorSquare);


}


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
    }
})

// --------------------------------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS TO SET THEMES ETC.

function buttons(){
    const defaultTheme = document.getElementById("default-theme");
    const flowerChild = document.getElementById("flower-child");
    const pacman = document.getElementById('pacman');
    const nineties = document.getElementById("90s");
    const glow = document.getElementById("glow");

    flowerChild.addEventListener('click', function(){
       flowerChild.style.backgroundColor = '#44543D';
       flowerChild.style.color = '#272727';
    })

    defaultTheme.addEventListener('click', function(){
        defaultTheme.style.backgroundColor = '#44543D';
        defaultTheme.style.color = '#272727';
     })

    pacman.addEventListener('click', function(){
        pacman.style.backgroundColor = '#44543D';
        pacman.style.color = '#272727';

        backgroundColor = 'black';
        
        windowBackgroundColor = 'black';
        windowColor = 'white';
        snakeColor = '#fdff00';
        foodColor = 'white';
        startButton.style.backgroundColor = '#0100F9';
        startButton.style.color = 'white';
        resetButton.style.backgroundColor = '#0100F9';
        resetButton.style.color = 'white';

        snakeColors = ['#ea82e5', '#46bfee', '#d03e19', '#db851c'];

     })
    
    nineties.addEventListener('click', function(){
        nineties.style.backgroundColor = '#44543D';
        nineties.style.color = '#272727';
     })

    glow.addEventListener('click', function(){
        glow.style.backgroundColor = '#44543D';
        glow.style.color = '#272727';
     })  
}

