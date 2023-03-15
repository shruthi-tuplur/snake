
const table = document.getElementById('table');
const startButton = document.getElementById('start');


const numRows = 25;
const numColumns = 25;

const startingRow = Math.floor(numRows / 2);
const startingColumn = Math.floor(numColumns / 2);

let currentRow = startingRow;
let currentColumn = startingColumn;

let foodStartingRow = Math.floor(Math.random() * numRows);
let foodStartingColumn = Math.floor(Math.random() * numColumns);

let currentDirection = 'left';
let numSegments = 4;

let deleteColumn;

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
}





function move() {

    
    snakeAte();
    let currentSnakeRow = table.getElementsByTagName('tr')[currentRow];
    let currentSnakeColumn = currentSnakeRow.getElementsByTagName('td')[currentColumn];

    

        if (currentDirection === 'left') {
            for (let i = 1; i <= numSegments; i++) {

                let newNum = currentColumn - 1
                let newSnakeColumn = currentSnakeRow.getElementsByTagName('td')[newNum];
                
                newSnakeColumn.classList.add('snake-body');

                deleteColumn = currentSnakeRow.getElementsByTagName('td')[newNum + numSegments];
                deleteColumn.classList.remove('snake-body');

                currentColumn -= 1;
        }
        }
            
        
        
    

    else if (currentDirection === 'right') {
        for (let i = 1; i <= numSegments; i++) {

            let newNum = currentColumn + 1
            let newSnakeColumn = currentSnakeRow.getElementsByTagName('td')[newNum];
        
            newSnakeColumn.classList.add('snake-body');

            deleteColumn = currentSnakeRow.getElementsByTagName('td')[newNum - numSegments];
            deleteColumn.classList.remove('snake-body');

            currentColumn += 1;
        }
    }

    else if (currentDirection === 'up') {
        for (let i = 1; i <= numSegments; i++) {
        let newRow = currentRow - 1;
        let newSnakeRow = table.getElementsByTagName('tr')[newRow];
        let newSnakeSquare = newSnakeRow.getElementsByTagName('td')[currentColumn]
    
        
        newSnakeSquare.classList.add('snake-body');

        let deleteRow = table.getElementsByTagName('tr')[newRow + numSegments];
        let deleteSquare = deleteRow.getElementsByTagName('td')[currentColumn];
        deleteSquare.classList.remove('snake-body');

        currentRow -= 1;
        }
    }

    else if (currentDirection === 'down') {
        for (let i = 1; i <= numSegments; i++) {

            let newRow = currentRow + 1;
            let newSnakeRow = table.getElementsByTagName('tr')[newRow];
            let newSnakeSquare = newSnakeRow.getElementsByTagName('td')[currentColumn]
        
            
            newSnakeSquare.classList.add('snake-body');

            let deleteRow = table.getElementsByTagName('tr')[newRow - numSegments];
            let deleteSquare = deleteRow.getElementsByTagName('td')[currentColumn];
            deleteSquare.classList.remove('snake-body');

            currentRow += 1;

    }
    }
}
    

    

    


function movingSnake() {
    setInterval(move, 500);
    ;
}

function turnUp() {
    currentDirection = 'up';
}

function turnDown() {
    currentDirection = 'down';
}

function turnLeft() {
    currentDirection = 'left';
}

function turnRight() {
    currentDirection = 'right';
}



function snakeAte() {
    
    if (currentRow ==  foodStartingRow && currentColumn == foodStartingColumn) {
        
        numSegments += 1;

        let foodCurrentRow = table.getElementsByTagName('tr')[foodStartingRow];
        
        let foodCurrentSquare = foodCurrentRow.getElementsByTagName('td')[foodStartingColumn];
        

        console.log(foodCurrentRow)

        foodCurrentSquare.classList.remove('food');
        
        foodStartingRow = Math.floor(Math.random() * numRows);
        foodStartingColumn = Math.floor(Math.random() * numColumns);

        let foodNewRow = table.getElementsByTagName('tr')[foodStartingRow];
        let foodNewSquare = foodNewRow.getElementsByTagName('td')[foodStartingColumn];

        foodNewSquare.classList.add('food');
    }

}

startButton.addEventListener('click', movingSnake);

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