import {
	HilbertPart,
	FirstHilbertPart,
	NextHilbertPart,
	PreviousHilbertPart,
	HilbertPartAt
} from "../hilbert/hilbert-fractal";
import { gradient } from "../gradient";


interface Point { x: number, y: number };

export const renderHilbert = (canvas: HTMLCanvasElement,
	order: number, offset: Point, scale: number, divisions: number = 2) => {

	const ctx = canvas.getContext("2d");

	const hilbertLength = Math.pow(4, order);
	const numTracers = 2 * divisions;
	const tracerGap = Math.floor(hilbertLength / numTracers);

	let tracers: HilbertPart[] = [
		FirstHilbertPart(order)
	];

	// TODO: Tracers need to move off in both directions from each "tracerGap".
	for (let i = 0; i < hilbertLength - 1; i++) {
		tracers.push(HilbertPartAt(i * tracerGap, order));
	}

	// Build the array of colours which smoothly transition from red to green to blue.
	let colourMap = gradient([
		{ r: 1, g: 0, b: 0 },
		{ r: 0, g: 1, b: 0 },
		{ r: 0, g: 0, b: 1 }
	], Math.pow(4, order));

	const _render = () => {

		if (tracers[0].index < tracerGap) {

			for (let i = 0; i < numTracers; i++) {
				
				const h = tracers[i];

				// Set the line path.
				ctx.beginPath();
				ctx.moveTo(offset.x + h.previous.x * scale, offset.y + h.previous.y * scale);
				ctx.lineTo(offset.x + h.current.x * scale, offset.y + h.current.y * scale);

				// Set the line colour.
				let colour = colourMap[h.index];
				let colourStr = "rgb(" +
					Math.floor(255 * colour.r) + ", " +
					Math.floor(255 * colour.g) + ", " +
					Math.floor(255 * colour.b) + ")";
				ctx.strokeStyle = colourStr;
				ctx.lineWidth = 2;
				ctx.stroke();

				// If this tracer is moving forward.
				if (i % 2 === 0) {
					tracers[i] = NextHilbertPart(h);
				}
				else {
					tracers[i] = PreviousHilbertPart(h);
				}

			}	
		
			window.requestAnimationFrame(_render);

		}

	};

	window.requestAnimationFrame(_render);

}
