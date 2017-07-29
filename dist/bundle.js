/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = paper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(3);
var Universe_1 = __webpack_require__(4);
var paper = __webpack_require__(1);
var hilbert_1 = __webpack_require__(5);
var gradient_1 = __webpack_require__(6);
ReactDOM.render(React.createElement(Universe_1.Universe, null), document.getElementById("container"));
// paper.view.viewSize = new paper.Size(1600, 1600);
var begin = function () {
    var canvas = document.getElementById("Universe");
    var ORDER = 6;
    var MAX_INDEX = Math.pow(4, ORDER);
    var LENGTH = 4 << (ORDER - 1);
    var SCALE = 4;
    var grad = gradient_1.gradient([
        new paper.Color("red"),
        new paper.Color("green"),
        new paper.Color("blue")
    ], MAX_INDEX + 1);
    console.dir(grad);
    paper.setup(canvas);
    var path = new paper.Path();
    var START = new paper.Point(24, 48);
    path.moveTo(START);
    var p = START;
    var index = 0;
    var previous = { x: 0, y: 0 };
    var pointText = new paper.PointText(new paper.Point(8, 12));
    var avgFps = 0;
    var totalFps = 0;
    var countFps = 0;
    var frameTime = 0;
    paper.view.onFrame = function (event) {
        if (index == MAX_INDEX) {
            return;
        }
        var now = window.performance.now();
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
        var current = hilbert_1.hilbert(index++, ORDER);
        var delta = {
            x: SCALE * (current.x - previous.x),
            y: SCALE * (current.y - previous.y)
        };
        var path = new paper.Path();
        path.strokeColor = grad[index];
        path.moveTo(p);
        p = p.add([delta.x, delta.y]);
        path.lineTo(p);
        previous = current;
    };
};
console.log(document.readyState);
if (document.readyState === "interactive") {
    begin();
}
else {
    window.onload = begin;
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
exports.Universe = function () {
    return React.createElement("canvas", { id: "Universe", width: "800", height: "600" });
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var padLeft = function (s, n, c) {
    if (c === void 0) { c = " "; }
    return n > s.length ? padLeft(c + s, n - 1) : s;
};
exports.hilbert = function (index, order) {
    // console.log("{"+index+","+order+"} index: "+index);
    // console.log("{"+index+","+order+"} order: "+order);
    var area = Math.pow(4, order);
    var max_index = area - 1;
    // console.log("{"+index+","+order+"} area: "+area);
    // console.log("{"+index+","+order+"} max_index: "+max_index);
    if (index > max_index) {
        throw "Err: index must be less than the maximum index (" + max_index + ") of an order " + order + " cruve.";
    }
    // Return trivial curves for order 0,1 hilbert curves.
    if (order === 0) {
        return { x: 0, y: 0 };
    }
    else if (order === 1) {
        switch (index) {
            case 0: return { x: 0, y: 0 };
            case 1: return { x: 0, y: 1 };
            case 2: return { x: 1, y: 1 };
            case 3: return { x: 1, y: 0 };
        }
    }
    var order_prime = order - 1;
    var offset = Math.pow(2, order_prime);
    var area_prime = Math.pow(4, order_prime);
    var index_prime = index % area_prime;
    var quadrant = Math.floor(index / area_prime);
    // console.log("{"+index+","+order+"} order_prime: "+order_prime);
    // console.log("{"+index+","+order+"} offset: "+offset);
    // console.log("{"+index+","+order+"} area_prime: "+area_prime);
    // console.log("{"+index+","+order+"} index_prime: "+index_prime);
    // console.log("{"+index+","+order+"} quadrant: "+quadrant);
    var hilbert_prime = exports.hilbert(index_prime, order_prime);
    // console.log("{"+index+","+order+"} hilbert_prime: (" + 
    // 	hilbert_prime.x + "," + hilbert_prime.y + ")");
    switch (quadrant) {
        case 0: return {
            x: hilbert_prime.y,
            y: hilbert_prime.x
        };
        case 1: return {
            x: hilbert_prime.x,
            y: hilbert_prime.y + offset
        };
        case 2: return {
            x: hilbert_prime.x + offset,
            y: hilbert_prime.y + offset
        };
        case 3: return {
            x: 2 * offset - hilbert_prime.y - 1,
            y: offset - hilbert_prime.x - 1,
        };
        default: return {
            x: 0,
            y: 0
        };
    }
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var paper = __webpack_require__(1);
exports.gradient2 = function (c0, c1, steps) {
    var g = [];
    var delta = {
        r: c1.red - c0.red,
        g: c1.green - c0.green,
        b: c1.blue - c0.blue
    };
    g.push(c0);
    for (var i = 1; i < steps; i++) {
        g.push(new paper.Color(g[i - 1].red + (delta.r / steps), g[i - 1].green + (delta.g / steps), g[i - 1].blue + (delta.b / steps)));
    }
    return g;
};
exports.gradient = function (stops, steps) {
    var numStops = stops.length;
    var deltas = [];
    var g = [stops[0]];
    for (var i = 1; i < numStops; i++) {
        deltas.push({
            r: stops[i].red - stops[i - 1].red,
            g: stops[i].green - stops[i - 1].green,
            b: stops[i].blue - stops[i - 1].blue
        });
    }
    var stepsPerStop = steps / deltas.length;
    for (var i = 1; i < steps; i++) {
        var d = Math.floor(i / stepsPerStop);
        g.push(new paper.Color(g[i - 1].red + (deltas[d].r / stepsPerStop), g[i - 1].green + (deltas[d].g / stepsPerStop), g[i - 1].blue + (deltas[d].b / stepsPerStop)));
        var g0 = g[g.length - 1];
    }
    return g;
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map