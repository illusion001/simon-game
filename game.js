var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red","blue","green","yellow"];
var level = 0;

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

function playSound(name){
    var colorSound = new Audio("sounds/"+name+".mp3");
    colorSound.play();
}

function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColor);
    playSound(randomChosenColor);
    level ++;
    $("#level-title").text("Level "+level);
}


function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}


$(".btn").on("click", function(event){
    if (level >= 1){
        var userChosenColor = $(event.target).attr("id");
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    } 
})


$("#level-title").on("click", function(){
    if (level == 0){
        nextSequence();
    }  
})


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] != userClickedPattern[currentLevel]){
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Click to Restart");
        startOver();
    }
    if (currentLevel+1 == level){
        setTimeout(function(){
            nextSequence();
        },1000); 
        userClickedPattern = [];

    } 

}