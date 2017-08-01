import * as React from "react";
import * as ReactDOM from "react-dom";

import { Universe } from "./components/Universe";

import { renderHilbert } from "./render/render-poly";

const getParameterByName = (name: string) => {
	const url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const begin = () => {
	
	const canvas: HTMLCanvasElement = 
		document.getElementById("Universe") as HTMLCanvasElement;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const max_order = Number(getParameterByName("order")) || 6;

	const scale = 3;
	const margin = 4;

	// renderHilbert(canvas, max_order, { x: margin, y: margin }, scale);

	let y = margin;

	for (let order = 1; order <= max_order; order++) {

		let length = scale * Math.pow(2, order);
		let x = margin;

		while (x + length < canvas.width) {
			renderHilbert(canvas, order, { x: x, y: y}, scale);
			x += length + order * margin;
		}

		y += length + margin;

	}

}

// Inject the universe.
ReactDOM.render(
	<Universe/>,
	document.getElementById("container")
);

if (document.readyState === "interactive") {
	begin();
} else {
	window.onload = begin;
}
