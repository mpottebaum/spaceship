const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const c = canvas.getContext("2d")

let y = 0;
function runIt() {
	if (!c) return;
	// clear canvas
	c.clearRect(0, 0, canvas.width, canvas.height);

	c.fillStyle = "black";
	c.fillRect(canvas.clientWidth / 2, y, 100, 100);
	y += 5;
	console.log('w', canvas.clientWidth);
	console.log('w', canvas.clientHeight);

	setTimeout(runIt, 1000 / 60);
}

requestAnimationFrame(runIt)

