/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 10;
  var BOARD_WIDTH = $('#board').width() - 20;
  var BOARD_HEIGHT = $('#board').height() - 20;
  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "RIGHT": 39,
    "DOWN": 40,
    "UP": 38,
  }
  var  speedX = 0;
  var  speedY = 0;
  var  positionX = 0;
  var  positionY = 0;
  var  $board = $('#board');

  // Game Item Objects
    var  snakeArray = [];
    var  apple = {
      "x": 220,
      "y": 220,
      "eaten": 0,
      "element": $('#apple')
    }


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  var $head = $("<div>");
  $head.appendTo($board);
  $head.addClass("snake");
  snakeArray[0] = {
      "x": 0,
      "y": 0,
      "element": $head
  }
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem();
    checkCollision();
    checkApple();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
        if(speedX > 0){
            return;
        }
        speedX = -20;
        speedY = 0;
        console.log("left pressed");
    }
     if (event.which === KEY.RIGHT) {
        if(speedX < 0){
            return;
        }
        speedX = 20;
        speedY = 0;
        console.log("right pressed");
    }
    if (event.which === KEY.DOWN) {
        if(speedY < 0){
            return;
        }
        speedY = 20;
        speedX = 0;
        console.log("down pressed");
    }
    if (event.which === KEY.UP) {
        if(speedY > 0){
            return;
        }
        speedY = -20;
        speedX = 0;
        console.log("up pressed");
    }

  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    positionX += speedX; // update the positsion of the box along the x-axis
    positionY += speedY; // update the position of the box along the x-axis
    if(positionX > BOARD_WIDTH){
       endGame();
    }
    if(positionX < 0){
       endGame();
    }
    if(positionY > BOARD_HEIGHT){
       endGame();
    }
    if(positionY < 0){
       endGame();
    }
  }
  
  function redrawGameItem() {
    if(snakeArray.length > 1 ){
        for(i = snakeArray.length - 1; i >= 1 ; i--){
            snakeArray[i].x = snakeArray[i - 1].x;
            snakeArray[i].y = snakeArray[i - 1].y;
            snakeArray[i].element.css("left", snakeArray[i].x);
            snakeArray[i].element.css("top", snakeArray[i].y);
        }
    }
    snakeArray[0].x = positionX; // update the position of the box along the x-axis
    snakeArray[0].y = positionY; // update the position of the box along the x-axis
    snakeArray[0].element.css("left", snakeArray[0].x);    // draw the box in the new location, positionX pixels away from the "left"
    snakeArray[0].element.css("top", snakeArray[0].y);    // draw the box in the new location, positionX pixels away from the "left"
  }

  function checkCollision() {
    for(i = snakeArray.length - 1; i >= 1 ; i--){
      if(snakeArray[i].x == snakeArray[0].x && snakeArray[i].y == snakeArray[0].y){
          endGame();
      }
    }
  }

  function checkApple() {
    if(snakeArray[0].x == apple.x && snakeArray[0].y == apple.y){
        addSnake();
        redrawApple();
        increaseScore();
    }
  }

  function addSnake() {
    var $snakediv = $("<div>");
    $snakediv.appendTo($board);
    $snakediv.addClass("snake");
    $snakediv.css("left", snakeArray[snakeArray.length - 1].x);
    $snakediv.css("top", snakeArray[snakeArray.length - 1].y);
    var snake = {
        "x": 0,
        "y": 0,
        "element": $snakediv
    }
    snakeArray.push(snake);
  }

  function redrawApple(){
    apple.x = Math.floor(Math.random() * 22) * 20;
    apple.y = Math.floor(Math.random() * 22) * 20;
    if(isOccupied(apple.x, apple.y)){
      redrawApple();
    } else{
      apple.element.css("left", apple.x);    // draw the box in the new location, positionX pixels away from the "left"
      apple.element.css("top", apple.y);    // draw the box in the new location, positionX pixels away from the "left"
    }
  }

  function isOccupied(x, y){
    for (i = 0; i < snakeArray.length; i++) {
      if(snakeArray[i].x == x && snakeArray[i].y == y){
          return true;
      }
    }
    return false;
  }

  function increaseScore() {
        apple.eaten = apple.eaten + 1;
        $('#score').html(apple.eaten);
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
