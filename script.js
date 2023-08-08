class snakeGame {
    constructor(boardSize, gridSize, updateInterval) {
        this.boardSize = boardSize;
        this.gridSize = gridSize;
        this.updateInterval = updateInterval;
        this.snake = [{ x: 2, y:2 }];
        this.direction = 'down';
        this.board = document.getElementById('board');
        this.food = this.generateFood();
        this.gameover = false;
        
        document.addEventListener("keydown", event => {
            this.handleInput(event);
        });

        this.gameLoop();
    }

    handleInput(event) {
        if (event.key === 'ArrowUp' && this.direction !== 'down') this.direction = 'up';
        if (event.key === 'ArrowDown' && this.direction !== 'up') this.direction = 'down';
        if (event.key === 'ArrowRight' && this.direction !== 'left') this.direction = 'right';
        if (event.key === 'ArrowLeft' && this.direction !== 'right') this.direction = 'left';
    }

    generateFood() {
        const x = Math.floor(Math.random() * this.boardSize) + 1;
        const y = Math.floor(Math.random() * this.boardSize) + 1;
        return { x, y };
    }

    checkCollision(position) {
        const posx = position.x;
        const posy = position.y;
        
        if (posx < 1 || posx > this.boardSize || posy < 1 || posy > this.boardSize) {
            this.gameover = true;
        }

        for (const segment of this.snake) {
            if (segment.x === position.x && segment.y === position.y) {
                this.gameover = true;
            }
        }
    }

    gameLoop() {
        if (this.gameOver) {
            alert('Game Over');
            return;
        }

        console.log('Game loop called');

        const head = { ...this.snake[0]};

        if (this.direction === 'up') head.y -= 1;
        if (this.direction === 'down') head.y += 1;
        if (this.direction === 'left') head.x -= 1;
        if (this.direction === 'right') head.x += 1;

        this.checkCollision(head);

        if (head.x === this.food.x && head.y === this.food.y)  {
            this.snake.unshift(head);
            this.food = this.generateFood();
        } else {
            this.snake.unshift(head);
            this.snake.pop();
        }

        this.board.innerHTML = "";

        this.snake.forEach(segment => {
            const segmentElement = document.createElement("div");
            segmentElement.style.gridRowStart = segment.y;
            segmentElement.style.gridColumnStart = segment.x;
            segmentElement.classList.add("snake");
            this.board.appendChild(segmentElement);
        });

        const foodElement = document.createElement("div");
        foodElement.style.gridRowStart = this.food.y;
        foodElement.style.gridColumnStart = this.food.x;
        foodElement.classList.add("food");
        this.board.appendChild(foodElement);

        setTimeout(this.gameLoop.bind(this), this.updateInterval);
    }

    startGame() {
        this.gameLoop();
    }
}

const game = new snakeGame(20, 20, 200);
game.startGame();