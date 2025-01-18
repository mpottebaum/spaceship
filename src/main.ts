import { GameObject } from "./game-object"

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const c = canvas.getContext("2d")

const SPACESHIP_WIDTH = 20
const SPACESHIP_HEIGHT = 50

let clock = 0

const spaceShip = new GameObject({
	x: canvas.width / 2,
	y: canvas.height - SPACESHIP_HEIGHT - 40,
	xVelocity: 0,
	yVelocity: 0,
	width: 20,
	height: 50,
	shape: 'rect',
})

function drawSpaceship(x: number, y: number) {
	if (!c) return;
	c.fillStyle = "black";
	c.fillRect(x - SPACESHIP_WIDTH / 2, y, SPACESHIP_WIDTH, SPACESHIP_HEIGHT);
}

let railsOffset = 0
const leftRailX = canvas.width / 6
const rightRailX = canvas.width * 5 / 6

function drawRails() {
	if (!c) return;
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

type Asteroid = GameObject

const asteroids: Asteroid[] = []

function drawAsteroid(x: number, y: number, radius: number) {
	if (!c) return
	c.beginPath()
	c.arc(x, y, radius, 0, 2 * Math.PI)
	c.stroke()
}

function randomAsteroidX() {
	return (Math.random() * (rightRailX - leftRailX)) + leftRailX
}

document.addEventListener('keydown', e => {
	if (e.key === 'ArrowLeft') {
		spaceShip.acc({ xVelocity: -2 })
	}
	if (e.key === 'ArrowRight') {
		spaceShip.acc({ xVelocity: 2 })
	}
})

document.addEventListener('click', e => {
	if (e.clientX < window.innerWidth / 2) {
		spaceShip.acc({ xVelocity: -2 })
		return
	}
	spaceShip.acc({ xVelocity: 2 })
})

function gameOver() {
	alert('DEAD!')
}

function runIt() {
	if (!c) return;

	if (clock % 500 === 0) {
		asteroids.push(new GameObject({
			x: randomAsteroidX(),
			y: 0,
			xVelocity: 0,
			yVelocity: 1,
			width: 5,
			height: 5,
			shape: 'circ',
		}))
	}

	// clear canvas
	c.clearRect(0, 0, canvas.width, canvas.height);

	spaceShip.move()
	spaceShip.draw(c)

	if (spaceShip.x - spaceShip.width / 2 < leftRailX) {
		gameOver()
		return
	}

	if (spaceShip.x + spaceShip.width / 2 > rightRailX) {
		gameOver()
		return
	}

	asteroids.forEach(a => {
		if (a.y + a.height / 2 > spaceShip.y) {
			gameOver()
			return
		}
	})

	asteroids.forEach(a => {
		a.draw(c)
		a.move()
	})

	drawRails()

	if (spaceShip.xVelocity > 0) spaceShip.acc({ xVelocity: -0.05 })
	if (spaceShip.xVelocity < 0) spaceShip.acc({ xVelocity: 0.05 })

	clock++

	setTimeout(runIt, 1000 / 60);
}

requestAnimationFrame(runIt)

