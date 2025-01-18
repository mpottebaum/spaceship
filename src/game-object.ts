type GameObjectShape = 'rect' | 'circ'

interface GameObjectProps {
	x: number;
	y: number,
	xVelocity?: number;
	yVelocity?: number;
	width?: number;
	height?: number;
	shape: GameObjectShape;
}

export class GameObject {
	x: number;
	y: number;
	xVelocity: number;
	yVelocity: number;
	width: number;
	height: number;
	shape: GameObjectShape;

	constructor({ x, y, xVelocity, yVelocity, width, height, shape }: GameObjectProps) {
		this.x = x
		this.y = y
		this.xVelocity = xVelocity ?? 0
		this.yVelocity = yVelocity ?? 0
		this.width = width ?? 0
		this.height = height ?? 0
		this.shape = shape
	}

	move() {
		this.x += this.xVelocity
		this.y += this.yVelocity
	}

	acc({ xVelocity, yVelocity }: { xVelocity?: number; yVelocity?: number; }) {
		if (xVelocity) {
			this.xVelocity += xVelocity
		}
		if (yVelocity) {
			this.yVelocity += yVelocity
		}
	}

	draw(c: CanvasRenderingContext2D) {
		switch (this.shape) {
			case 'rect':
				if (!c) return;
				c.fillStyle = "black";
				c.fillRect(this.x - this.width / 2, this.y, this.width, this.height)
				break
			case 'circ':
				if (!c) return
				c.beginPath()
				c.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, 2 * Math.PI)
				c.stroke()
				break
		}
	}
}

