const NECK_OFFSET_X = 0.357
const NECK_OFFSET_Y = 0.605
const DEFAULT_NECK_LENGTH = 504
const DEFAULT_NECK_ANGLE = -40
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
// let headAngle = neckAngle + 40

const getCanvasHeight = () => windowWidth >= windowHeight * 1.5 ? windowHeight : windowWidth * (2/3)
const getCanvasWidth = () => windowWidth >= windowHeight * 1.5 ? windowHeight * 1.5 : windowWidth

function setup() {
  bg = loadImage('./images/background.jpg')
  neck = loadImage('./images/neck.png')
  head = loadImage('./images/head.png')

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
  // Reset neck & head pos by pressing 'R'
  if (key == 'r') {
    translate(neckX, neckY)
    neckAngle = DEFAULT_NECK_ANGLE
    neckVector.x = neckLength
    neckVector.y = 0
    neckVector.rotate(neckAngle)
  }
}

function draw() {
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
    neckVector.setMag(neckLength)
  }

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
  // rotate(headAngle)
  image(head, -headLength*0.05, -headHeight*0.88, headLength, headHeight)
  pop()
}