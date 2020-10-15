/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var BOARD_WIDTH = $('#board').width() - $('#gameItem').width();
  var BOARD_HEIGHT = $('#board').height() - $('#gameItem').height();
  var KEY = {
    "ENTER": 13,
    "LEFT": 37,
    "RIGHT": 39,
    "DOWN": 40,
    "UP": 38,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  }
  // Game Item Objects

    var  positionX = 0;
    var  positionY = 0;
    var  speedX = 0;
    var  speedY = 0;

    var  positionX2 = 0;
    var  positionY2 = 0;
    var  speedX2 = 0;
    var  speedY2 = 0;


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
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
    checkCollide();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.LEFT) {
        speedX = -5;
        console.log("left pressed");
    }
     if (event.which === KEY.RIGHT) {
        speedX = 5;
        console.log("right pressed");
    }
    if (event.which === KEY.DOWN) {
        speedY = 5;
        console.log("down pressed");
    }
    if (event.which === KEY.UP) {
        speedY = -5;
        console.log("up pressed");
    }

    if (event.which === KEY.A) {
        speedX2 = -5;
        console.log("left pressed");
    }
     if (event.which === KEY.D) {
        speedX2 = 5;
        console.log("right pressed");
    }
    if (event.which === KEY.S) {
        speedY2 = 5;
        console.log("down pressed");
    }
    if (event.which === KEY.W) {
        speedY2 = -5;
        console.log("up pressed");
    }

  }

  function handleKeyUp(event) {
      speedX = 0;
      speedY = 0;
      speedX2 = 0;
      speedY2 = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    positionX += speedX; // update the position of the box along the x-axis
    positionY += speedY; // update the position of the box along the x-axis
    if(positionX > BOARD_WIDTH){
       positionX = BOARD_WIDTH;
    }
    if(positionX < 0){
       positionX = 0;
    }
    if(positionY > BOARD_HEIGHT){
       positionY = BOARD_HEIGHT;
    }
    if(positionY < 0){
       positionY = 0;
    }

    positionX2 += speedX2; // update the position of the box along the x-axis
    positionY2 += speedY2; // update the position of the box along the x-axis
    if(positionX2 > BOARD_WIDTH){
       positionX2 = BOARD_WIDTH;
    }
    if(positionX2 < 0){
       positionX2 = 0;
    }
    if(positionY2 > BOARD_HEIGHT){
       positionY2 = BOARD_HEIGHT;
    }
    if(positionY2 < 0){
       positionY2 = 0;
    }
  }

  function redrawGameItem() {
    $('#gameItem').css("left", positionX);    // draw the box in the new location, positionX pixels away from the "left"
    $('#gameItem').css("top", positionY);    // draw the box in the new location, positionX pixels away from the "left"

    $('#gameItem2').css("left", positionX2);    // draw the box in the new location, positionX pixels away from the "left"
    $('#gameItem2').css("top", positionY2);    // draw the box in the new location, positionX pixels away from the "left"
  }

  function checkCollide() {
      $div1 = $('#gameItem');
      $div2 = $('#gameItem2');
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || b2 < y1 || r1 < x2 || r2 < x1) return false;
      if($('#gameItem').hasClass("tagged")){
        $('#gameItem').removeClass("tagged");
        $('#gameItem2').addClass("tagged");
      } else if($('#gameItem2').hasClass("tagged")){
        $('#gameItem2').removeClass("tagged");
        $('#gameItem').addClass("tagged");
      } else{
        $('#gameItem').addClass("tagged");
      }
      positionX = 0;
      positionY = 0;
      positionX2 = BOARD_WIDTH;
      positionY2 = BOARD_HEIGHT;
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
