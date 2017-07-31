import * as React from "react";
import * as ReactDOM from "react-dom";

import { Universe } from "./components/Universe";

import * as paper from "paper";

import { hilbert } from "./hilbert";
import { gradient } from "./gradient";

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

	// Black background.
	// const ctx = canvas.getContext("2d");
	// ctx.fillStyle = "#000";
	// ctx.fillRect(0, 0, canvas.width, canvas.height);

	const ORDER = Number(getParameterByName("order")) || 6;

	renderHilbert(canvas, ORDER);

}

// Inject the universe.
ReactDOM.render(
	<Universe/>,
	document.getElementById("container")
);

// Animate it.
console.log(document.readyState);

if (document.readyState === "interactive") {
	begin();
} else {
	window.onload = begin;
}


