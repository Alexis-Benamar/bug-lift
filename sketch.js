// TODO: set all sizes to fractions of height / width
const NECK_OFFSET_X = 0.357
const NECK_OFFSET_Y = 0.605
const DEFAULT_NECK_LENGTH = 200
const DEFAULT_NECK_ANGLE = -40
const MINIMUM_NECK_LENGTH = 50
const ROTATION_RATE = 0.5
const TRANSLATION_RATE = 2

let bg

let neck
let neckX
let neckY
let neckVector
let neckLength = DEFAULT_NECK_LENGTH
const neckWidth = 31
let neckAngle = DEFAULT_NECK_ANGLE

let head
const headLength = 213
const headHeight = 159

const getCanvasHeight = () => windowWidth >= windowHeight * 1.5 ? windowHeight : windowWidth * (2/3)
const getCanvasWidth = () => windowWidth >= windowHeight * 1.5 ? windowHeight * 1.5 : windowWidth

function preload() {
  bg = loadImage('./images/background.jpg')
  neck = loadImage('./images/neck.png')
  head = loadImage('./images/head.png')
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight())
  angleMode(DEGREES);

  neckX = width * NECK_OFFSET_X
  neckY = height * NECK_OFFSET_Y
  neckVector = createVector(neckLength, 0)
  neckVector.rotate(neckAngle)
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight())
  neckX = width * NECK_OFFSET_X
  neckY = height * NECK_OFFSET_Y
}

function keyPressed() {
  // Reset neck & head pos
  if (key == 'r') {
    translate(neckX, neckY)
    neckAngle = DEFAULT_NECK_ANGLE
    neckLength = DEFAULT_NECK_LENGTH
    neckVector.x = neckLength
    neckVector.y = 0
    neckVector.rotate(neckAngle)
  }
}


function moveNeckFromWithKeyboard() {
  if (keyIsDown(RIGHT_ARROW)) {
    neckAngle += ROTATION_RATE
    neckVector.rotate(ROTATION_RATE)
  }
  if (keyIsDown(LEFT_ARROW)) {
    neckAngle -= ROTATION_RATE
    neckVector.rotate(-ROTATION_RATE)
  }
  if (keyIsDown(UP_ARROW)) {
    neckLength += TRANSLATION_RATE
    neckVector.setMag(neckLength)
  }
  if (keyIsDown(DOWN_ARROW)) {
    neckLength -= TRANSLATION_RATE
    if (neckLength < MINIMUM_NECK_LENGTH) neckLength = MINIMUM_NECK_LENGTH
    neckVector.setMag(neckLength)
  }
}

function draw() {
  // Draw background & move origin to neck base
  background(bg)
  translate(neckX, neckY)

  // Draw neck at neckAngle
  push()
  rotate(neckAngle)
  image(neck, 0, -neckWidth/2, neckLength, neckWidth)
  pop()

  // Draw head on tip of neck
  push()
  translate(neckVector.x, neckVector.y)
  image(head, -headLength*0.05, -headHeight*0.88, headLength, headHeight)
  pop()

  // Rotate / resize neck
  if (isMobileDevice) {
    // TODO: move with "joystick"
  } else {
    moveNeckFromWithKeyboard()
  }
}