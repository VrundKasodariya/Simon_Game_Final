let buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;
let gamePattern = [];


$(document).keydown((event)=>{
    if(!started){
        $("#title-level").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+ level);
    let randomNumber = Math.floor(4*Math.random());
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function animatePress(userChosenColor){
    $("#"+userChosenColor).click(function(){
        $("#" + userChosenColor).addClass("pressed");
        setTimeout(()=>{
            $("#"+userChosenColor).removeClass("pressed");
        },100)
    })
}

$(".btn").click(function(){
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
animatePress(userChosenColor);
playSound(userChosenColor);

checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play().catch((error)=>{
        console.log("Audio Playback failure");
    })
}



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(userClickedPattern.length== gamePattern.length){

            console.log("Success")
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    
    else{
        console.log("Wrong");
        let audio = new Audio("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        audio.play().catch((error)=>{
            console.log(error);
        })
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}