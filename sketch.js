const NECK_OFFSET_X = 0.357
const NECK_OFFSET_Y = 0.605
const DEFAULT_NECK_ANGLE = -40
const MINIMUM_NECK_LENGTH = 50
const ROTATION_RATE = 0.5
const TRANSLATION_RATE = 2
const GUI_PADDING = 5
const BTN_SIDE = 40

// Used to size head & neck based on width
const HEAD_LENGTH_FACTOR = 5
const HEAD_HEIGHT_FACTOR = 7
const NECK_WIDTH_FACTOR = 35
const NECK_LENGTH_FACTOR = 4

let bg

let neck
let neckX
let neckY
let neckVector
let neckLength
let neckWidth
let neckAngle = DEFAULT_NECK_ANGLE

let head
let headLength
let headHeight

let gui
let up
let down
let left
let right
let reset

const getCanvasHeight = () => windowWidth >= windowHeight * 1.5 ? windowHeight : windowWidth * (2/3)
const getCanvasWidth = () => windowWidth >= windowHeight * 1.5 ? windowHeight * 1.5 : windowWidth

function resetNeck() {
  neckWidth = getCanvasWidth() / NECK_WIDTH_FACTOR
  neckLength = getCanvasWidth() / NECK_LENGTH_FACTOR
  neckAngle = DEFAULT_NECK_ANGLE
  neckX = width * NECK_OFFSET_X
  neckY = height * NECK_OFFSET_Y
  neckVector.x = neckLength
  neckVector.y = 0
  neckVector.rotate(neckAngle)
}

function resetHead() {
  headLength = width / HEAD_LENGTH_FACTOR
  headHeight = width / HEAD_HEIGHT_FACTOR
}

function preload() {
  bg = loadImage('./images/background.jpg')
  neck = loadImage('./images/neck.png')
  head = loadImage('./images/head.png')
}

function setup() {
  createCanvas(getCanvasWidth(), getCanvasHeight())
  angleMode(DEGREES);

  // Setup neck vector & size
  neckVector = createVector(neckLength, 0)
  resetNeck()

  // Setup head size
  resetHead()

  if (isMobileDevice) {
    const BTN_STYLE = {
      strokeWeight: 0,
      rounding: 3,
      fillBg: color(0, 255 * 0.6),
      fillBgActive: color(0, 255 * 0.4),
      fillLabel: color(255),
      fillLabelActive: color(255)
    }

    gui = createGui()

    up = createButton('▲', GUI_PADDING, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    down = createButton('▼', BTN_SIDE + GUI_PADDING * 2, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    reset = createButton('R', getCanvasWidth() - BTN_SIDE * 3 - GUI_PADDING * 3, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    left = createButton('◄', getCanvasWidth() - BTN_SIDE * 2 - GUI_PADDING * 2, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)
    right = createButton('►', getCanvasWidth() - BTN_SIDE - GUI_PADDING, getCanvasHeight() - BTN_SIDE - GUI_PADDING, BTN_SIDE, BTN_SIDE)

    up.setStyle(BTN_STYLE)
    down.setStyle(BTN_STYLE)
    reset.setStyle(BTN_STYLE)
    left.setStyle(BTN_STYLE)
    right.setStyle(BTN_STYLE)
  }
}

function windowResized() {
  resizeCanvas(getCanvasWidth(), getCanvasHeight())
  resetNeck()
  resetHead()
}

function resetAction() {
  translate(neckX, neckY)
  resetNeck()
}

function keyPressed() {
  // Reset neck & head pos
  if (key == 'r') {
    resetAction()
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

  // Reset for mobile action
  if (isMobileDevice && reset.isPressed) {
    resetAction()
  }
}