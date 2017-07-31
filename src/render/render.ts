import {
	FirstHilbertPart,
	NextHilbertPart
} from "../hilbert/hilbert-fractal";
import { gradient_a } from "../gradient";


const OFFSET = { x: 4, y: 4 };
const SCALE = 3;

export const renderHilbert = (canvas: HTMLCanvasElement, order: number) => {

	const ctx = canvas.getContext("2d");

	let h = FirstHilbertPart(order);

	// Build the array of colours which smoothly transition from red to green to blue.
	let colourMap = gradient_a([
		{ r: 1, g: 0, b: 0 },
		{ r: 0, g: 1, b: 0 },
		{ r: 0, g: 0, b: 1 }
	], Math.pow(4, order));

	const _render = () => {

		// Set the line path.
		ctx.beginPath();
		ctx.moveTo(OFFSET.x + h.previous.x * SCALE, OFFSET.y + h.previous.y * SCALE);
		ctx.lineTo(OFFSET.x + h.current.x * SCALE, OFFSET.y + h.current.y * SCALE);

		// Set the line colour.
		let colour = colourMap[h.index];
		let colourStr = "rgb(" + 
			255 * colour.r + "," +
			255 * colour.g + "," +
			255 * colour.b +")";
		ctx.strokeStyle = colourStr;
		ctx.lineWidth = 2;

		ctx.stroke();

		// Retrieve the next part.
		h = NextHilbertPart(h);
		if (h) {
			// And draw it in the next frame if there is another part.
			window.requestAnimationFrame(_render);
		}

	};

	window.requestAnimationFrame(_render);

}
