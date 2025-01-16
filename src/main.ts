const canvas = document.getElementById('canvas') as HTMLCanvasElement
const c = canvas.getContext("2d")

const SPACESHIP_WIDTH = 20
const SPACESHIP_HEIGHT = 50

const spaceShipState = {
	x: canvas.width / 2,
	y: canvas.height - SPACESHIP_HEIGHT - 40,
	xVelocity: 0,
}

function drawSpaceship(x: number, y: number) {
	if (!c) return;
	c.fillStyle = "black";
	c.fillRect(x - SPACESHIP_WIDTH / 2, y, SPACESHIP_WIDTH, SPACESHIP_HEIGHT);
}

let railsOffset = 0

function drawRails() {
	if (!c) return;
	const leftRailX = canvas.width / 6
	c.beginPath()
	c.moveTo(leftRailX, 0)
	c.lineTo(leftRailX, canvas.height)
	c.closePath()
	c.stroke()

	for (let x = leftRailX - 5, y = 0 + railsOffset; y < canvas.height; y += 10) {
		c.beginPath()
		c.moveTo(x, y)
		c.lineTo(x, y + 5)
		c.closePath()
		c.stroke()
	}

	const rightRailX = canvas.width * 5 / 6
	c.beginPath()
	c.moveTo(rightRailX, 0)
	c.lineTo(rightRailX, canvas.height)
	c.closePath()
	c.stroke()

	for (let x = rightRailX + 5, y = 0 + railsOffset; y < canvas.height; y += 10) {
		c.beginPath()
		c.moveTo(x, y)
		c.lineTo(x, y + 5)
		c.closePath()
		c.stroke()
	}

	railsOffset = railsOffset === 10 ? 0 : railsOffset + 2
}

function moveSpaceshipLeft() {
	spaceShipState.xVelocity -= 2
}

function moveSpaceshipRight() {
	spaceShipState.xVelocity += 2
}

document.addEventListener('keydown', e => {
	if (e.key === 'ArrowLeft') {
		moveSpaceshipLeft()
	}
	if (e.key === 'ArrowRight') {
		moveSpaceshipRight()
	}
})

document.addEventListener('click', e => {
	if (e.clientX < window.innerWidth / 2) {
		moveSpaceshipLeft()
		return
	}
	moveSpaceshipRight()
})

function runIt() {
	if (!c) return;
	// clear canvas
	c.clearRect(0, 0, canvas.width, canvas.height);

	spaceShipState.x += spaceShipState.xVelocity
	drawSpaceship(spaceShipState.x, spaceShipState.y)

	drawRails()

	if (spaceShipState.xVelocity > 0) spaceShipState.xVelocity -= 0.05
	if (spaceShipState.xVelocity < 0) spaceShipState.xVelocity += 0.05

	setTimeout(runIt, 1000 / 60);
}

requestAnimationFrame(runIt)

