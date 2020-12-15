// Declare globals 
var circleArray = []

const coloursArray = [
    "#78d2ff", // blue
    "#ff7881", // red
    "#f5f5f5" // white
]

const RADIUS = 30;
const CANVAS_HEIGHT = 280;
const SCROLL_BAR_WIDTH = 20;

// Get and setup canvas
var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - SCROLL_BAR_WIDTH;
canvas.height = CANVAS_HEIGHT;

// Canvas context
var c = canvas.getContext("2d");

// Pad HTML
document.getElementById("canvas_padder").style = "padding-bottom:" + CANVAS_HEIGHT + "px";

// Events
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth - SCROLL_BAR_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    init();
});

// Circle class definition
function Circle(x, y, radius, col) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.colour = col
    this.velocity = new Vector2(0, 0);

    this.update = function() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x - this.radius < 0 || this.x + this.radius > window.innerWidth) {
            this.velocity.x = -this.velocity.x;
        }

        if (this.y - this.radius < 0 || this.y + this.radius > CANVAS_HEIGHT) {
            this.velocity.y = -this.velocity.y;
        }
    }

    this.draw = function() {
        c.strokeStyle = this.colour;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); 
        c.stroke();
        c.closePath();
    }
}

// Vector2 class definition
function Vector2(x, y) {

    this.x = x;
    this.y = y;

    this.normalizeSelf = function() {
        var length = Math.sqrt((this.x * this.x) + (this.y * this.y));
        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, CANVAS_HEIGHT)

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].draw();
    }
}

function init() {

    // Clear all circles
    circleArray = []

    var num_circles = Math.floor(window.innerWidth / 40);

    // Create new circles
    for (var i = 0; i < num_circles; i++) {
        var random_x = randomNumber(RADIUS, window.innerWidth - RADIUS * 2);
        var random_y = randomNumber(RADIUS, CANVAS_HEIGHT - RADIUS * 2);
        var random_colour_index = randomNumber(0, coloursArray.length);

        var circ = new Circle(random_x, random_y, 30, coloursArray[random_colour_index]);


        var random_x_dir = randomNumber(-360, 360);
        var random_y_dir = randomNumber(-360, 360);
        var dir = new Vector2(random_x_dir, random_y_dir);
        dir.normalizeSelf();
        circ.velocity = dir;

        circleArray.push(circ);
    }
}

init();
animate();

function randomNumber(min, max) {
    return min + Math.floor((Math.random() * max));
}

