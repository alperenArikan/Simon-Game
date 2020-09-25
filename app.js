var gameColors = ["red","blue","yellow","green"]
var started = false;
var gamePattern = [];
var userSelectPattern =  [];
var level = 0;


$(document).keypress(function (e) { 
    if(started == false ){
        started = true;

        $("#level-title").text("Level: "+level);
        nextSequence();
        
    }

});
$(document).click(function (e) { 
    if(started == false ){
        started = true;

        $("#level-title").text("Level: "+level);
        nextSequence();
        
    }

});
function nextSequence(){
    userSelectPattern= [];
    level = level +1;
                $("#level-title").text("Level: "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = gameColors[randomNumber];
    gamePattern.push(randomColor);

    audioPlay(randomColor);
    flashCards(randomColor);

}
function audioPlay(color){
    var audio = new Audio("sounds/"+color+".mp3")
    audio.play();
}
function flashCards(color){
    $("#"+color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}
function clickFlash(color){
    $("#"+color).fadeOut(10).fadeIn(10);
}

$(".btn").click(function (e) { 
    let userSelection = this.id;
    userSelectPattern.push(userSelection);
    audioPlay(userSelection);
    clickFlash(userSelection);
    var currentLevel = userSelectPattern.length-1;
    answerCheck(currentLevel);
});

function answerCheck(level){

    if(gamePattern[level] === userSelectPattern[level]){
        if(gamePattern.length === userSelectPattern.length){

            setTimeout(() => {
                nextSequence();
            }, 1000);

        }
   
    }

    else{
        $("#level-title").text("Game Over !! Please Press Any Key Or Click On The Screen To Play Again!");
        audioPlay("wrong");
        gameOver();
    }
}

function gameOver(){
    started = false;
    level = 0;
    gamePattern = [];
}

