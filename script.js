const board = document.getElementById('board');

let inputCoordinates = { x: 0, y: 0 };
let snakesSpeed = 10;
let renderTime = 0;
let snake = [{ x: 13, y: 15}];
let lastRenderTime = 0;
const boardSize = 18;

let food = { x: 4, y:4 };

const generateFood = () => {
    const x = Math.floor(Math.random() * boardSize) + 1;
    const y = Math.floor(Math.random() * boardSize) + 1;
    return { x, y };
}

const renderView = (viewTime) => {
    window.requestAnimationFrame(renderView);
    if ((viewTime - lastRenderTime) / 1000 < 1 / snakesSpeed) {
        return;
    }
    lastRenderTime = viewTime;
    gameLoop();
}

const  checkCollision = (positions) => {
    for (let i = 1; i < snake.length; i++) {
        if (positions[i].x === positions[0].x && positions[i].y === positions[0].y) {
            return true;
        }

        if (positions[i].x > 18 || positions[0].x <=0 || positions[i].y > 18 || positions[0].y <= 0) {
            return true;
        }

        return false;
    }
}

const gameLoop = () => {
    if (checkCollision(snake)) {
        inputCoordinates = { x: 0, y: 0 };
        alert('Game over');
        snake = [{ x: 13, y:15 }];
    }
    
    if (snake[0].y === food.y && snake[0].x === food.x) {
        snake.unshift({ x: snake[0].x + inputCoordinates.x, y: snake[0].y + inputCoordinates.y });
        food = generateFood();
    }
    
    for (let i = snake.length - 2; i >= 0; i-- ) {
        snake[i+1] = { ...snake[i]};
    }
    
    snake[0].x += inputCoordinates.x;
    snake[0].y += inputCoordinates.y;
    
    console.log(snake);
    board.innerHTML = "";

    snake.forEach((e,i) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(renderView);

window.addEventListener('keydown', (e) => {
    inputCoordinates = { x: 0, y: 1 };
    switch(e.key) {
        case 'ArrowUp':
            inputCoordinates.x = 0;
            inputCoordinates.y = -1;
            break;
        case 'ArrowDown':
            inputCoordinates.x = 0;
            inputCoordinates.y = 1;
            break;
        case 'ArrowLeft':
            inputCoordinates.x = -1;
            inputCoordinates.y = 0;
            break;
        case 'ArrowRight':
            inputCoordinates.x = 1;
            inputCoordinates.y = 0;
            break;
        default:
            break;
    }
});