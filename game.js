// ARRAYS
var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];

// LEVELS
var level = 0;

//CHECKING IF THE GAME HAS STARTED OR NOT
var started = false;

// IF KEY PRESSED THEN START
$("*").keypress(function () {
    if(!started){
        nextSequence();
        $("#level-title").html("Level " + level)
        started = true;
    }
});


// GAME PATTERN
function nextSequence(){
    // CHOOSING A RANDOM COLOUR
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    // ADDING COLOUR TO THE ARRAY
    gamePattern.push(randomChosenColour);

    // ANIMATING THE FLASH
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    level++;
    $("#level-title").html("Level "+level);
    userClickedPattern = [];

}

// DEFINING USER CLICKS
$(".btn").click(function(){
    // CREATING AN ARRAY OF CLICKED BUTTONS
    var userChosenColour = this.id 
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);
})

// PLAYING SOUND
function playSound(name){
    var gameAudio = new Audio("sounds//" + name + ".mp3");
    gameAudio.play();
}

// ANIMATING PRESSES
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

//CHECKING ANSWERS
function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
        
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
} else {
    console.log("failure");
    var wrongAudio = new Audio("sounds//wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200)
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();
        
}

}

function startOver (){
    started = false
    level = 0;
    gamePattern = [];
}

