// To be able to draw on our browser, we need to first have all the necessary methods to assist with out drawing. 

// The way we do that is, we use the getContext() method on our canvas. This method returns an object which has lots of drawing methods in it. 

// We use the returned object to do our drawing. Since we are planning to draw a two dimentional game, we pass "2d" as an argument to the getContext() method.

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

// Take a look at the returned object on your console 
console.log(ctx);

// To be able to control the movement of our snake in a controlled way, we are going to create a grid like system on our canvas. The snake then will follow the square grid on our canvas 

// Lets divide our canvas into 10 by 10 small squares  
const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Now we need an array to save the bodies of our snake 
let score = 0; 
let snake = [];

// Just to give us a start we can initiate the initial head of the snake at (0,0) coordinate 

// Notice that the first element of our snake contains an object identifying the x and y coordinate of the initial piece of the snake 
snake[0]= {
  x : (Math.floor(Math.random() *
    columns)) * scale,
  y : (Math.floor(Math.random() *
    rows)) * scale
};
console.log(snake);

let food = {
  x : (Math.floor(Math.random() *
    columns)) * scale, 
  y : (Math.floor(Math.random() *
    rows)) * scale
}

// call our draw function every 100 ms
let playGame = setInterval(draw,100);

//control the snake direction
// Let's initially make the snake move right  
let d = "right";

// Use the keyboard keys to control the direction of the snake 
document.onkeydown = direction;

function direction(event){
  let key = event.keyCode;
  if( key == 37 && d != "right"){
      d = "left";
  }else if(key == 38 && d != "down"){
      d = "up";
  }else if(key == 39 && d != "left"){
      d = "right";
  }else if(key == 40 && d != "up"){
      d = "down";
  }
}
// Function to draw our snake and the food 
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// Draw snake 
	for (let i=0; i<snake.length; i++) {
		ctx.fillStyle = "#fff";
		ctx.strokeStyle = "red";
	  ctx.fillRect(snake[i].x,
	    snake[i].y, scale, scale);
      ctx.strokeRect(snake[i].x,snake[i].y,scale,scale);  
	}
	console.log(snake);
	// Draw food 
	ctx.fillStyle = "#ff0";
	ctx.strokeStyle = "green";
	ctx.fillRect(food.x, food.y, scale, scale);
	ctx.strokeRect(food.x, food.y,scale,scale);
  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  console.log(snakeX);
  // which direction
  if( d == "left") snakeX -= scale;
  if( d == "up") snakeY -= scale;
  if( d == "right") snakeX += scale;
  if( d == "down") snakeY += scale;

  if (snakeX > canvas.width) {
    snakeX = 0;
  }
  if (snakeY > canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width;
  }
  if (snakeY < 0) {
    snakeY = canvas.height;
  }
  // if the snake eats the food, it grows 
  if(snakeX == food.x && snakeY == food.y){
      score++;
      food = {
          x : (Math.floor(Math.random() * columns)) * scale,
          y : (Math.floor(Math.random() * rows)) * scale
      }
      // we don't remove the tail
  }else{
      // remove the tail
      snake.pop();
  }
  console.log(snake);
  // New head position 
  let newHead = {
      x : snakeX,
      y : snakeY
  }
  console.log(snake);
  if(eatSelf(newHead,snake)){
  	clearInterval(playGame);
  }
  snake.unshift(newHead);
}

// check if snake is eating itself 
function eatSelf(head,array){
  for(let i = 0; i < array.length; i++){
      if(head.x == array[i].x && head.y == array[i].y){
          return true;
      }
  }
  return false;
}

