import * as paper from "paper";

export const gradient = (c0: paper.Color, c1: paper.Color, steps: number): paper.Color[] => {

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
