//html
var canvas, canvasContext;

//game elements
var CarA = new Car(1);
var CarB = new Car(2);
var World, Pal;
const COUNT_DELAY = 2600;

window.onload = function() {
    canvas = document.getElementById("GameCanvas");
    canvasContext = canvas.getContext("2d");

    drawRectangle(0, 0, canvas.width, canvas.height, "black", "fill")
    showText("LOADING IMAGES", canvas.width / 2, canvas.height / 2, "white");

    imagesLoad();
    // CANVAS SETUP
}

function gameSetup() {

    var frameRate = 1000 / 30;
    setInterval(drawFrame, frameRate);

    inputSetup();

    //GAME OBJECT INITAL SETUP

    CarA.reset(CAR_START.X, CAR_START.Y);
    CarB.reset(CAR_START.X, CAR_START.Y + 1);

    //PALETTE GRID GENERATION
    Pal = new Palette(0, 600 - GBRICK_SIZE);
    Pal.generatePalGrid();

    //WORLD GRID GENERATION
    World = new brickGrid(0, 0, WORLD_COLS, WORLD_ROWS);
    World.initTypeGrid();
    World.loadLevel(World.levelOne);
}

function countDown(milisec) {
    setTimeout(function() {
        inputEnabled = true;
        console.log("GOGOGO!");
    }, milisec);

}

function drawCount() {
    if (!inputEnabled) {
        drawCircle(400, 300, 80, "red", "fill");
    }
}

function disableInput() {
    inputEnabled = false;
}


function updateMovement() {
    World.gridCollisionCheck(CarA, mouseGridX, mouseGridY);
    World.gridCollisionCheck(CarB, mouseGridX, mouseGridY);
    CarA.updatePosition();
    CarB.updatePosition();
}

//MAIN DRAWING LOOP
function drawFrame() {
    drawObjects();
    updateMovement();
}

function drawObjects() {
    drawBackground();
    Pal.switchType(mouseClicked, mouseGridX, mouseGridY);
    Pal.renderPalGrid();
    Pal.renderPalCursor(mouseGridX, mouseGridY);

    World.paintBricks(activeType, mouseClicked, mouseGridX, mouseGridY, WORLD_ROWS)
    World.renderGrid();
    World.renderCursor(mouseGridX, mouseGridY, WORLD_ROWS);

    CarA.render();
    CarB.render();

    drawCount();
    renderMousePos();

}

function drawBackground() {
    canvasContext.fillStyle = "black";
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function renderMousePos() {
    showText(mouseGridX + ", " + mouseGridY, mouseX, mouseY, "white")
}