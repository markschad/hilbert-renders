
export interface Color {
	r: number,
	g: number,
	b: number
};

export const gradient = (stops: Color[], steps: number): Color[] => {

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
			r: Math.max(0, Math.min(1, g[i - 1].r + (deltas[d].r / stepsPerStop))),
			g: Math.max(0, Math.min(1, g[i - 1].g + (deltas[d].g / stepsPerStop))),
			b: Math.max(0, Math.min(1, g[i - 1].b + (deltas[d].b / stepsPerStop)))
		});

		let g0 = g[g.length - 1];

	}

	return g;

}
