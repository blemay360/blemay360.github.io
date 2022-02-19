var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var x = 250;
var y = 250;
var userRadius = 40;
var mouseX = 250;
var mouseY = 250;
var width = 500;
var height = 500;
var velocity = 75;
var foodPositions = [
    [30, 20, 12, 0],
    [490, 490, 10, 1],
    [60, 317, 8, 2],
    [300, 268, 10, 3],
    [30, 20, 12, 4],
    [490, 490, 10, 5],
    [60, 317, 8, 6],
    [300, 268, 10, 7]
];
//foodPositions[x][1] is for the x coordinate, foodPositions[x][2] is the y coordinate, foodPositions[x][3] is the radius, foodPositions[x][4] is the color

var foodColors = ["cyan", "yellow", "red", "blue", "green", "purple", "brown", "pink", "mediumspringgreen", "deepsky blue", "crimson", "lightskyblue", "springgreen", "coral", "darkorange", "lime"];
var numberFoodColors = 16;

function autoFit() {
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    width = window.innerWidth;
    height = window.innerHeight;
}

function drawCircle(circleX, circleY, radius) {
    context.beginPath();
    context.arc(circleX, circleY, radius, 0, 2 * 3.141592);
    if (radius == userRadius) {
        context.fillStyle = "maroon";
    }
    else {
        for (var a = 0; a <= 7; a++) {
            if (circleX == foodPositions[a][0] && circleY == foodPositions[a][1]) {
                context.fillStyle = foodColors[foodPositions[a][3]];
            }
        }
    }
    context.fill();
}

function rand(max) {
    var a;
    a = (Math.ceil([Math.random() * max]) - 1);
    return a;
}

function mouseMoved(mouse) {
    mouseX = mouse.clientX;
    mouseY = mouse.clientY;
}

function clearCanvas() {
    context.beginPath();
    context.rect(0, 0, 500, 500);
    context.fillStyle = "white";
    context.fill();

}

function drawScreen() {
    autoFit();
    calculatePosition();
    drawCircle(x, y, userRadius);
    testCollision();
  //  moveFood();
    for (var a = 0; a <= 7; a++) {
        drawCircle(foodPositions[a][0], foodPositions[a][1], foodPositions[a][2]);
    }
    setTimeout(drawScreen, 1000 / 120);
}

function calculatePosition() {
    //X-axis
    if (mouseX > x) { //Mouse is to right of circle
        x = x + ((mouseX - x) * ((1 / (userRadius * 50)) * velocity));
    }
    else { //Mouse is to left of cirle
        x = x - (Math.abs(mouseX - x) * ((1 / (userRadius * 50)) * velocity));
    }

    //Y-axis
    if (mouseY > y) { //Mouse is belox circle
        y = y + ((mouseY - y) * ((1 / (userRadius * 50)) * velocity));
    }
    else { //Mouse is above circle
        y = y - (Math.abs(mouseY - y) * ((1 / (userRadius * 50)) * velocity));
    }
}

function testCollision() {
    for (var a = 0; a <= 7; a++) {
        if (foodPositions[a][0] >= (x - userRadius) && foodPositions[a][0] <= (x + userRadius) && foodPositions[a][1] >= (y - userRadius) && foodPositions[a][1] <= (y + userRadius)) {
            foodPositions[a] = [rand(width), rand(height), foodPositions[a][2], rand(numberFoodColors)];
            userRadius = userRadius + ((1 / 10) * foodPositions[a][2]);
            //console.log(userRadius);
            foodPositions[a][2] = (((1 / 8) * userRadius) + rand(1 / 4 * userRadius));
            if (userRadius >= 1000000000) {
                userRadius = 40;
                randomizeFood();
                for (var b = 0; b <= 7; b++) {
                    foodPositions[b][2] = (((1 / 8) * userRadius) + rand(1 / 4 * userRadius));
                }
            }
        }
    }
}

function randomizeFood() {
    for (var a = 0; a <= 7; a++)
        foodPositions[a] = [rand(width), rand(height), foodPositions[a][2], rand(numberFoodColors)];
}

function moveFood() {
    for (var a = 0; a <= 7; a++) {
        var c = rand(2);
        for (var b = 0; b <= 1; b++) {
            if (c == 1) {
                foodPositions[a][b] = foodPositions[a][b] + rand(7);
            }
            else {
                foodPositions[a][b] = foodPositions[a][b] - rand(7);
            }
        }
    }
}

randomizeFood();
canvas.addEventListener("mousemove", mouseMoved);
drawScreen();