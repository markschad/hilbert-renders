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

	// console.log("order: %s", order);
	// console.log("divisions: %s", divisions);

	const ctx = canvas.getContext("2d");

	const hilbertLength = Math.pow(4, order);
	const numTracers = 2 * divisions;
	const tracerGap = 2 * Math.floor(hilbertLength / numTracers);
	
	// console.log("hilbertLength: %s", hilbertLength);
	// console.log("numtracers: %s", numTracers);
	// console.log("tracerGap: %s", tracerGap);

	let tracers: HilbertPart[] = [
		FirstHilbertPart(order)
	];

	// TODO: Tracers need to move off in both directions from each "tracerGap".
	const lastTracerIndex = numTracers - 1;
	let len: number;
	let pos = 0;
	while(tracers.length < numTracers) {
		pos += tracerGap;
		// console.log("len: %s", len);
		// console.log("push index: %s", pos - 1);
		tracers.push(HilbertPartAt(pos - 1, order));
		if (tracers.length < numTracers) {
			// console.log("push opposite: %s", pos);
			tracers.push(HilbertPartAt(pos, order));
		}
	}

	// console.log("lastTracerIndex %s", lastTracerIndex);
	// console.dir(tracers);

	// Build the array of colours which smoothly transition from red to green to blue.
	let stops = [];
	for (let i = 0; i < numTracers; i++) {
		stops.push({ r: 1, g: 0, b: 0 });
		stops.push({ r: 0, g: 1, b: 0 });
		stops.push({ r: 0, g: 0, b: 1 });
	}
	let colourMap = gradient(stops, Math.pow(4, order));

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
