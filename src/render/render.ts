import {
	FirstHilbertPart,
	NextHilbertPart
} from "../hilbert/hilbert-fractal";
import { gradient } from "../gradient";


const STROKE_WIDTH = 3;


interface Point { x: number, y: number };

export const renderHilbert = (canvas: HTMLCanvasElement, 
	order: number, offset: Point, scale: number) => {

	const ctx = canvas.getContext("2d");

	let h = FirstHilbertPart(order);

	// Build the array of colours which smoothly transition from red to green to blue.
	let colourMap = gradient([
		{ r: 1, g: 0, b: 0 },
		{ r: 0, g: 1, b: 0 },
		{ r: 0, g: 0, b: 1 }
	], Math.pow(4, order));

	const _render = () => {

		// Set the line path.
		ctx.beginPath();
		ctx.moveTo(offset.x + h.previous.x * scale, offset.y + h.previous.y * scale);
		ctx.lineTo(offset.x + h.current.x * scale, offset.y + h.current.y * scale);

		// Set the line colour.
		let colour = colourMap[h.index];
		// let colourStr = "#" +
		// 	Math.floor(255 * colour.r).toString(16) +
		// 	Math.floor(255 * colour.g).toString(16) +
		// 	Math.floor(255 * colour.b).toString(16);		
		let colourStr = "rgb(" + 
			Math.floor(255 * colour.r) + ", " +
			Math.floor(255 * colour.g) + ", " +
			Math.floor(255 * colour.b) + ")";
		ctx.strokeStyle = colourStr;
		ctx.lineWidth = STROKE_WIDTH;
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
