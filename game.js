var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var level = 0;
var started = false;


$('[type="button"]').click (function(){
  
  var userChosenColour= $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

$(document).keydown(function(event){
  if(!started){
    $("#level-title").html("Level "+level);
    if(event.key==="a" || event.key==="A"){
      $(document).off("keydown"); //el metodo off remueve eventos relacionados a los metodos .on() 
      nextSequence();
    }
  }
});




function startOver(){
  level=0;
  gamePattern= [];
  userClickedPattern= [];
  started= true;
  $(document).keydown(function(event){
    if(event.type==="keydown"){
      $(document).off("keydown");
      setTimeout(function(){
        nextSequence();
      },200)
    }
  })
  $('[type="button"]').click (function(){
  
  var userChosenColour= $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100)
}

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").html("Level "+level);

  var randomNumber= Math.floor(Math.random()*4);

  var randomChosenColour= buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
  
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if (gamePattern.length===userClickedPattern.length){
      setTimeout(function (){
      nextSequence();
    },1000);
  }
  }else{

    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    $("h1").html("Game Over, Press Any Key to Restart")
    playSound("wrong")
    startOver();
  }
}