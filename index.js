var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

// Start the game
$(document).keypress(function() {
  if(!started){
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

// When user clicks a button :
$(".btn").click(function(){
  // store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  // play sound for the button clicked by user
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Generate random game pattern sequence
function nextSequence(){
  // Reset userClickedPattern for every round
  userClickedPattern = [];

  // Once game starts, increase level, change title to level X.
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Make the random generated button flash
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound for the random generated button
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

// Check user's input against the game pattern sequence at current level
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

// Start over
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
