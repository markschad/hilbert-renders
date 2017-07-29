import * as React from "react";
import * as ReactDOM from "react-dom";

import { Universe } from "./components/Universe";

import * as paper from "paper";

import { hilbert } from "./hilbert";

ReactDOM.render(
	<Universe/>,
	document.getElementById("container")
);


// paper.view.viewSize = new paper.Size(1600, 1600);

const begin = () => {
	
	const canvas: HTMLCanvasElement = 
		document.getElementById("Universe") as HTMLCanvasElement;

	paper.setup(canvas);

	const path = new paper.Path();

	path.strokeColor = "black";

	const START = new paper.Point(24, 48);
	path.moveTo(START);
	
	let p = START;		

	const ORDER = 7;
	const MAX_INDEX = Math.pow(4, ORDER);
	const SCALE = 8;

	let index = 0;
	let previous = { x: 0, y: 0 };

	let pointText = new paper.PointText(new paper.Point(8, 12));

	let avgFps = 0;
	let totalFps = 0;
	let countFps = 0;
	let frameTime = 0;

	paper.view.onFrame = (event: paper.IFrameEvent) => {

		if (index == MAX_INDEX) {
			index = 0;
		}

		let now = window.performance.now();
		
		totalFps += 1 / event.delta;
		countFps++;
		frameTime += event.delta;

		if (frameTime > 1) {
			avgFps = Math.floor(totalFps / countFps);
			totalFps = 0;
			countFps = 0;
			frameTime = 0;
		}

		pointText.content = 
			"index: " + index + "\n" +
			"fps: " + avgFps;

		let current = hilbert(index++, ORDER);

		let delta = {
			x: SCALE * (current.x - previous.x),
			y: SCALE * (current.y - previous.y)
		}

		p = p.add([ delta.x, delta.y ]);
		path.lineTo(p);	
		
		previous = current;		

	};
	
	// paper.view.draw();

}

console.log(document.readyState);

if (document.readyState === "interactive") {
	begin();
} else {
	window.onload = begin;
}

