// TODO: set all sizes to fractions of height / width
const NECK_OFFSET_X = 0.357
const NECK_OFFSET_Y = 0.605
const DEFAULT_NECK_LENGTH = 200
const DEFAULT_NECK_ANGLE = -40
const MINIMUM_NECK_LENGTH = 50
const ROTATION_RATE = 0.5
const TRANSLATION_RATE = 2
const GUI_PADDING = 5
const BTN_SIDE = 40

let gui

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

let up
let down
let left
let right

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

  if (isMobileDevice) {
    gui = createGui()
    const BTN_STYLE = {
      strokeWeight: 0,
      rounding: 3,
      fillBg: color(0, 255 * 0.6),
      fillBgActive: color(0, 255 * 0.4),
      fillLabel: color(255),
      fillLabelActive: color(255)
    }

    up = createButton('▲', GUI_PADDING, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    down = createButton('▼', BTN_SIDE + GUI_PADDING * 2, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    left = createButton('◄', getCanvasWidth() - BTN_SIDE * 2 - GUI_PADDING * 2, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    right = createButton('►', getCanvasWidth() - BTN_SIDE - GUI_PADDING, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    up.setStyle(BTN_STYLE)
    down.setStyle(BTN_STYLE)
    left.setStyle(BTN_STYLE)
    right.setStyle(BTN_STYLE)
  }
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


function moveNeck() {
  if (keyIsDown(RIGHT_ARROW) || (isMobileDevice && right.isHeld)) {
    neckAngle += ROTATION_RATE
    neckVector.rotate(ROTATION_RATE)
  }
  if (keyIsDown(LEFT_ARROW) || (isMobileDevice && left.isHeld)) {
    neckAngle -= ROTATION_RATE
    neckVector.rotate(-ROTATION_RATE)
  }
  if (keyIsDown(UP_ARROW) || (isMobileDevice && up.isHeld)) {
    neckLength += TRANSLATION_RATE
    neckVector.setMag(neckLength)
  }
  if (keyIsDown(DOWN_ARROW) || (isMobileDevice && down.isHeld)) {
    neckLength -= TRANSLATION_RATE
    if (neckLength < MINIMUM_NECK_LENGTH) neckLength = MINIMUM_NECK_LENGTH
    neckVector.setMag(neckLength)
  }
}

function draw() {
  // Draw background
  background(bg)

  // Draw buttons for mobile controls
  if (isMobileDevice) {
    drawGui()
  }

  // Move origin to neck base for drawing the moving parts
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
  moveNeck()
}