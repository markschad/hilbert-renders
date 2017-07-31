import * as paper from "paper";

export const gradient2 = (c0: paper.Color, c1: paper.Color, steps: number): paper.Color[] => {

	let g: paper.Color[] = [];

	const delta = {
		r: c1.red - c0.red,
		g: c1.green - c0.green,
		b: c1.blue - c0.blue
	};

	g.push(c0);

	for (let i = 1; i < steps; i++) {

		g.push(new paper.Color(
			g[i - 1].red + (delta.r / steps),
			g[i - 1].green + (delta.g / steps),
			g[i - 1].blue + (delta.b / steps)
		))

	}

	return g;

}

export const gradient = (stops: paper.Color[], steps: number): paper.Color[] => {

	const numStops = stops.length;

	const deltas = [];
	let g: paper.Color[] = [ stops[0] ];

	for (let i = 1; i < numStops; i++) {
		deltas.push({
			r: stops[i].red - stops[i - 1].red,
			g: stops[i].green - stops[i - 1].green,
			b: stops[i].blue - stops[i - 1].blue
		})
	}

	const stepsPerStop = steps / deltas.length;

	for (let i = 1; i < steps; i++) {

		let d = Math.floor(i / stepsPerStop);

		g.push(new paper.Color(
			g[i - 1].red + (deltas[d].r / stepsPerStop),
			g[i - 1].green + (deltas[d].g / stepsPerStop),
			g[i - 1].blue + (deltas[d].b / stepsPerStop)
		));

		let g0 = g[g.length - 1];

	}

	return g;

}


export interface Color {
	r: number,
	g: number,
	b: number
};

export const gradient_a = (stops: Color[], steps: number): Color[] => {

	const numStops = stops.length;

	const deltas = [];
	let g: Color[] = [ stops[0] ];

	for (let i = 1; i < numStops; i++) {
		deltas.push({
			r: stops[i].r - stops[i - 1].r,
			g: stops[i].g - stops[i - 1].g,
			b: stops[i].b - stops[i - 1].b
		})
	}

	const stepsPerStop = steps / deltas.length;

	for (let i = 1; i < steps; i++) {

		let d = Math.floor(i / stepsPerStop);

		g.push({
			r: g[i - 1].r + (deltas[d].r / stepsPerStop),
			g: g[i - 1].g + (deltas[d].g / stepsPerStop),
			b: g[i - 1].b + (deltas[d].b / stepsPerStop)
		});

		let g0 = g[g.length - 1];

	}

	return g;

}
