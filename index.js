const board = document.getElementById('board')
const scoreBoard = document.getElementById('scoreBoard')
const startButton = document.getElementById('start')
const gameOverSign = document.getElementById('gameover')

//configuracion del juego 
const boardSize = 10
const gameSpeed = 80
const scuareTypes= {
    emptyScuare: 0,
    snakeSquare: 1,
    foodSquare: 2
}

const directions={
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
}
//las variables del juego 
let snake
let score 
let direction
let emptyScuares
let boardSquares
let moveInterval

const drawSnake =()=>{
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}

//dibujar los cuadros
const drawSquare =(square, type)=>{
    const [row, column]=square.split('')
    boardSquares[row][column]= squareTypes[type]
    const squareElement = document.getElementById(square)
    squareElement.setAttribute('class', 'square ${type}')

    if (type === 'empySquares') {
        emptySquares.push(square)
    }else {
        if (emptyScuares.indexOf(square)!== -1) {
            emptyScuares.splice(emptyScuares.indexOf(square), 1)
        }

    }
}

const moveSnake =()=>{
    const newSquare = String(
        Number(snake[snake.legth-1])+directions[direction])
    const [row, column] = newSquare.split('')

    if (newSquare < 0 || newSquare > boardSize * boardSize || (
        direction === 'ArrowRight'&& column==0) ||
        (direction === 'ArrowLeft'&& column==9  || boardSquares[row][column]===squareTypes.snakeSquare)) {
        gameOver()
    }else{
        snake.push(newSquare)
        if (boardSquares[row][column]=== squareTypes.foodSquare) {
            addFood()
        }else{
            const emptyScuare=snake.shift()
            drawSquare(emptyScuare, 'emptySquare')
        }
        drawSnake()
    }
}

const addFood = () => {
    score++;
    updateScore();
    createRandomFood();
}
 //funcion para juego perdido 
 const gameOver = () => {
    gameOverSign.style.display = 'block';
    clearInterval(moveInterval);
    startButton.disable = false;
 }

 const setDirection = newDirection => {
    direction = newDirection;
 }

 const directionEvent = key => {
    switch (key.code) {
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            break;
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != 'ArrowRight' && setDirection(key.code)
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
            
    }
 }

 const createRandomFood = () => {
    const randomEmptySquare = emptyScuares[Math.floor(Math.random() * emptyScuares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
 }

 const updateScore = () => {
    scoreBoard.innerText = score;
 }

 const createBoard = () => {
    boardSquares.forEach( (row, rowIndex))
 }