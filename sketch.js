let bg
const getCanvasHeight = () => windowWidth >= windowHeight * 1.5 ? windowHeight : windowWidth * (2/3)
const getCanvasWidth = () => windowWidth >= windowHeight * 1.5 ? windowHeight * 1.5 : windowWidth

function setup() {
  bg = loadImage('./background.webp')
  createCanvas(getCanvasWidth(), getCanvasHeight())
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight())
}

function draw() {
  background(bg)
}