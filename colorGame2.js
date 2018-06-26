/*Converted an RGB color game to use hex values instead. I had tp adjust for the fact that JavaScript can assign hexadecimal values but converts them to RGB in the background. To get around this, I assign the */
var numSquares = 6;
var colors = [];
var pickedColor;
var hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, "a", "b", "c", "d", "e", "f"];
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
};

function setUpSquares(){
        for(var i = 0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.value;
            //compare color to picked color
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct";
                resetButton.textContent = "Play Again?";    
                changeColor(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try again";
            };
       });
    };
};

//selscts easy or hard mode with 3 or 6 squares and resets game
function setUpModeButtons(){
        //mode buttons event listeners 
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    };
};

function reset() {
    //generates new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from colors array
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
			squares[i].value = colors[i];
        } else {
            squares[i].style.display = "none";
        };
    };
    h1.style.backgroundColor = "steelblue";
};

resetButton.addEventListener("click", function(){
    reset();
});

function changeColor(color) {
    //loop through all squares
    for(var i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
    };
    //change color to match a given color
};

//picks random color from colors array
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};

//returns array of random hex colors for each square
function generateRandomColors(num){
    //make an array
    var arr = [];
    //repeat num times
    for(var i = 0; i < num; i++)
        //get random color and push into array
        arr.push(randomHex());
        
    //return that array
    return arr;
};

//returns one random hex color
function randomHex(){
	var randomHex = "#";
    for(var i = 0; i < 6; i++) {
        randomHex += hex[Math.floor(Math.random() * 15)]
    } 
    return randomHex;
};