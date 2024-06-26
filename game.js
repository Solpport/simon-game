// Constants
const buttonColours = ["red", "blue", "green", "yellow"];

// Game variables
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Start the game on keypress
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Handle button clicks
$(".btn").click(function() {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

// Generate the next sequence in the game
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    gamePattern.forEach((color, index) => {
        setTimeout(() => {
            $("#" + color).fadeOut(100).fadeIn(100);
            playSound(color);
        }, 500 * index);
    });
}

// Check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

// Handle game over scenario
function gameOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    resetGame();
}

// Reset game variables
function resetGame() {
    started = false;
    level = 0;
    gamePattern = [];
}

// Play sound based on color
function playSound(color) {
    const audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// Animate button press
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(() => $("#" + color).removeClass("pressed"), 100);
}
