import * as React from "react";
import * as ReactDOM from "react-dom";

import { Universe } from "./components/Universe";

import { renderHilbert } from "./render/render";

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
	let y = margin;

	for (let order = 1; order < max_order; order++) {

		renderHilbert(canvas, order, { x: margin, y: y}, scale);

		let height = scale * Math.pow(2, order);
		y += height + margin;

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
