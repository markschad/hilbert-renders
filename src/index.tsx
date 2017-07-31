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

	const ORDER = Number(getParameterByName("order")) || 6;

	renderHilbert(canvas, ORDER);

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


