const board = document.getElementById('board')
const scoreBoard = document.getElementById('scoreBoard')
const startButton = document.getElementById('start')
const gameOverSign = document.getElementById('gameover')

//configuracion del juego 
const boardSize = 10
const gameSpeed = 80
const squareTypes= {
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
};

const directions={
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
};
//las variables del juego 
let snake
let score 
let direction
let emptySquares
let boardSquares
let moveInterval

const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
};

//dibujar los cuadros
const drawSquare =(square, type)=>{
    const [row, column]=square.split('')
    boardSquares[row][column]= squareTypes[type]
    const squareElement = document.getElementById(square)
    squareElement.setAttribute('class', 'square ${type}')

    if (type === 'emptySquares') {
        emptySquares.push(square)
    }else{
        if (emptySquares.indexOf(square)!== -1) {
            emptySquares.splice(emptySquares.indexOf(square), 1)
        }

    }
}

const moveSnake =()=>{
    const newSquare = String(
        Number(snake[snake.legth-1])+directions[direction])
        .padStart(2, '0');
    const [row, column] = newSquare.split('')

    if (newSquare < 0 || newSquare > boardSize * boardSize || (
        direction === 'ArrowRight'&& column==0) ||
        (direction === 'ArrowLeft'&& column==9  || boardSquares[row][column]===squareTypes.snakeSquare)) {
        gameOver()
    } else {
        snake.push(newSquare)
        if (boardSquares[row][column]=== squareTypes.foodSquare) {
            addFood()
        } else {
            const emptySquare=snake.shift()
            drawSquare(emptySquare, 'emptySquare')
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
    gameOverSign.style.display = 'none';
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
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    drawSquare(randomEmptySquare, 'foodSquare');
 }

 const updateScore = () => {
    scoreBoard.innerText = score;
 }

 const createBoard = () => {
    boardSquares.forEach( (row, rowIndex) => {
        row.forEach( (column, columnndex) => {
            const squareValue = '${rowIndex}${columnndex}' ;
            const squareElement = document.createElement('div');
            squareElement.setAttribute('class', 'square emptySquare');
            squareElement.setAttribute('id', squareValue);
            board.appendChild(squareElement);
            emptySquares.push(squareValue);
        })
    })
 }


 const setGame = () => {
    snake = ['00', '01', '02', '03'];
    score = snake.legth;
    direction = 'ArrowRight';
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare));
    console.log(boardSquares);
    board.innerHTML = ;
    emptySquares = [];
    createBoard();
 }

 const startGame = () => {
    setGame();
    gameOverSign.style.display= 'none';
    startButton.disabled = true;
    drawSnake();
    updateScore();
    createRandomFood();
    document.addEventListener('keydown', directionEvent);
    moveInterval = setInterval( () => moveSnake(), gameSpeed);
 }

 startButton.addEventListener('click', startGame);

