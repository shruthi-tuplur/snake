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

// speed buttons
const superSlow = document.getElementById("super-slow-speed");
const slow = document.getElementById("slow-speed");
const fast = document.getElementById("fast-speed");
const superFast = document.getElementById("super-fast-speed");
const defaultSpeed = document.getElementById('default-speed');

// NON-CONSTANTS 

// DEFAULT VALUES
let snakeColors = [];
let backgroundColor = '#44543D';
let windowBackgroundColor = '#44543D';
let windowColor = '#272727';
let snakeGrows = false;
let snakeColor = '#272727';
let foodColor = '#A13939';
let defaultfoodColor = '#A13939';
let changeColor = false;
let colorSquare;
let speed = 300;
let score = 0;
let dead = false;
let currentDirectionWord = 'left';
let foodStartingRow = Math.floor(Math.random() * numRows);
let foodStartingColumn = Math.floor(Math.random() * numColumns);
let theme;
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


function buildGameBoard() { 
    windowBackground.style.backgroundColor = windowBackgroundColor;
    windowBackground.style.color = windowColor;
    
    for (let i = 0; i < numRows; i++) {
        let newRow = document.createElement('tr');
        //debugger;
        for (let j = 0; j < numColumns; j++) {
            let newSquare = document.createElement('td');
            newSquare.style.backgroundColor = backgroundColor;
            newSquare.style.borderColor = backgroundColor;
            newSquare.style.borderWidth = '1px';

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

function restartGame(){ //clears gameboard
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
    buildGameBoard();
    
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
    buildGameBoard();
    restartGame();
    if (theme === '90s'){
        let background_image = 'background_images/jazz_cup.png';
        windowBackground.style.backgroundImage = `url(${background_image})`;
    }

    gameDiv.style.display = 'flex';
    let gameOptions = document.getElementById('game-options');
    gameOptions.style.display = 'none';
    startButton.style.display = 'none';
    resetButton.style.display = 'flex';
    resetButton.addEventListener('click', restartGame)
    gameLoop = setInterval(move, speed);

}

function newFood(){
    food = gameState['food'];
    let head = body[0];
    
    if (head[0] === food[0] && head[1] === food[1] && score % 10 === 0) {
        let colorSquareInd = Math.floor(Math.random() * snakeColors.length)
        foodColor = snakeColors[colorSquareInd];
        speed -= 50;

        while(foodColor === snakeColor){
            colorSquareInd = Math.floor(Math.random() * snakeColors.length)
            foodColor = snakeColors[colorSquareInd];
        }
        changeColor = true;
    }
    
    else {
        foodColor = defaultfoodColor;
    }

    let currentFoodRow = table.getElementsByTagName('tr')[food[0]];
    let currentFoodSquare = currentFoodRow.getElementsByTagName('td')[food[1]];

    currentFoodSquare.classList.remove('food');

    gameState['food'] = [Math.floor(Math.random() * numRows), Math.floor(Math.random() * numColumns)];
    food = gameState['food'];


    let newFoodRow = table.getElementsByTagName('tr')[food[0]];
    let newFoodSquare = newFoodRow.getElementsByTagName('td')[food[1]];

    if (changeColor){
        newFoodSquare.style.borderRadius = '50%';
    }

    newFoodSquare.classList.add('food');
    newFoodSquare.style.backgroundColor = foodColor;
        
        
}


function checkAte() {
    food = gameState['food'];
    let head = body[0];

    let eatenFoodRow = table.getElementsByTagName('tr')[food[0]];
    let eatenFoodSquare = eatenFoodRow.getElementsByTagName('td')[food[1]];

    

    if (head[0] === food[0] && head[1] === food[1]) {

        if (changeColor){
            snakeColor = foodColor;
            eatenFoodSquare.style.borderRadius = '0%';
            changeColor = false;
        } 

        snakeGrows = true;
        score += 10;
        scoreDisplay.innerText = `SCORE: ${score}`;

        newFood();

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

       backgroundColor = '#FF3280';
        
        windowBackgroundColor = '#FF3280';
        windowColor = '#FFA432';
        snakeColor = 'lime';
        foodColor = '#32C4FF';
        defaultfoodColor = '#32C4FF';

        startButton.style.backgroundColor = '#fdff00';
        startButton.style.color = '#32C4FF';
        startButton.style.borderWidth = '0px';
        startButton.style.borderColor = 'lime';

        resetButton.style.backgroundColor = '#fdff00';
        resetButton.style.color = '#32C4FF';
        resetButton.style.borderWidth = '0px';
        resetButton.style.borderColor = 'lime';

        table.style.borderWidth = '4px';
        table.style.borderColor = '#FFA432';
        snakeColors = ['#FFA432', 'lime', '#32C4FF', '#fdff00'];
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
        defaultfoodColor = 'white';

        startButton.style.backgroundColor = '#0100F9';
        startButton.style.color = 'white';
        startButton.style.borderWidth = '2px';
        startButton.style.borderColor = '#fdff00';

        resetButton.style.backgroundColor = '#0100F9';
        resetButton.style.color = 'white';

        resetButton.style.borderWidth = '2px';
        resetButton.style.borderColor = '#fdff00';

        table.style.borderWidth = '4px';
        table.style.borderColor = 'white';
        snakeColors = ['#ea82e5', '#46bfee', '#d03e19', '#db851c'];

     })
    
    nineties.addEventListener('click', function(){
        nineties.style.backgroundColor = '#44543D';
        nineties.style.color = '#272727';
        theme = '90s';

        backgroundColor = 'white';
        
        //windowBackgroundColor = 'white';
        windowBackgroundColor = '';
        

        windowColor = '#871CA1';
        snakeColor = '#0CCDDB';
        foodColor = '#2C1679';

        backgroundColor = 'white';

        defaultfoodColor = '#2C1679';
        startButton.style.backgroundColor = '#871CA1';
        startButton.style.color = '#0CCDDB';
        startButton.style.borderWidth = '2px';
        startButton.style.borderColor='#white';
        resetButton.style.backgroundColor = '#871CA1';
        resetButton.style.borderWidth = '2px';
        resetButton.style.borderColor = 'white';
        resetButton.style.color = '#0CCDDB';

        table.style.borderWidth = '4px';
        table.style.borderColor = '#871CA1'; 
        table.style.backgroundColor = 'white';

        snakeColors = ['#0CCDDB', '#2C1679', '#871CA1'];
     })

    glow.addEventListener('click', function(){
        glow.style.backgroundColor = '#44543D';
        glow.style.color = '#272727';

        backgroundColor = 'black';
        
        windowBackgroundColor = 'black';
        windowColor = '#fdff00';
        snakeColor = '#FF00E0';
        foodColor = '#00FF59';
        defaultfoodColor = '#00FF59';

        startButton.style.backgroundColor = 'black';
        startButton.style.color = '#FF9D00';
        startButton.style.borderWidth = '2px';
        startButton.style.borderColor = '#FF9D00';

        resetButton.style.backgroundColor = 'black';
        resetButton.style.color = '#FF9D00';
        resetButton.style.borderWidth = '2px';
        resetButton.style.borderColor = '#FF9D00';

        table.style.borderWidth = '4px';
        table.style.borderColor = '#00E7FF';
        snakeColors = ['#FF00E0', '#00FF59', 'lime', '#fdff00', '#00E7FF'];
     })  
}

superSlow.addEventListener('click', function(){
    speed = 700;
    superSlow.style.backgroundColor = '#44543D';
    superSlow.style.color = '#272727';
})

slow.addEventListener('click', function(){
    speed = 500;
    slow.style.backgroundColor = '#44543D';
    slow.style.color = '#272727';
})

fast.addEventListener('click', function(){
    speed = 200;
    fast.style.backgroundColor = '#44543D';
    fast.style.color = '#272727';
})

superFast.addEventListener('click', function(){
    speed = 100;
    superFast.style.backgroundColor = '#44543D';
    superFast.style.color = '#272727';
})

defaultSpeed.addEventListener('click', function(){
    defaultSpeed.style.backgroundColor = '#44543D';
    defaultSpeed.style.color = '#272727';
})

