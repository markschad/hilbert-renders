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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(2);
var Universe_1 = __webpack_require__(3);
var render_poly_1 = __webpack_require__(4);
var getParameterByName = function (name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"), results = regex.exec(url);
    if (!results)
        return null;
    if (!results[2])
        return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};
var begin = function () {
    var canvas = document.getElementById("Universe");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var max_order = Number(getParameterByName("order")) || 6;
    var scale = Number(getParameterByName("scale")) || 4;
    var margin = Number(getParameterByName("margin")) || 4;
    var divisions = Number(getParameterByName("div")) || 2;
    render_poly_1.renderHilbert(canvas, max_order, { x: margin, y: margin }, scale, divisions);
    // const max_margin = max_order * margin;
    // // renderHilbert(canvas, max_order, { x: margin, y: margin }, scale);
    // let y = margin;
    // for (let order = 1; order <= max_order; order++) {
    // 	let length = scale * Math.pow(2, order);
    // 	let x = margin;
    // 	while (x + length < canvas.width) {
    // 		renderHilbert(canvas, order, { x: x, y: y}, scale);
    // 		x += length + scale; //max_margin / order;
    // 	}
    // 	y += length + scale; // margin;
    // }
};
// Inject the universe.
ReactDOM.render(React.createElement(Universe_1.Universe, null), document.getElementById("container"));
if (document.readyState === "interactive") {
    begin();
}
else {
    window.onload = begin;
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var React = __webpack_require__(0);
exports.Universe = function () {
    return React.createElement("canvas", { id: "Universe", width: "800", height: "600" });
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hilbert_fractal_1 = __webpack_require__(5);
var gradient_1 = __webpack_require__(7);
;
exports.renderHilbert = function (canvas, order, offset, scale, divisions) {
    // console.log("order: %s", order);
    // console.log("divisions: %s", divisions);
    if (divisions === void 0) { divisions = 2; }
    var ctx = canvas.getContext("2d");
    var hilbertLength = Math.pow(4, order);
    var numTracers = 2 * divisions;
    var tracerGap = 2 * Math.floor(hilbertLength / numTracers);
    // console.log("hilbertLength: %s", hilbertLength);
    // console.log("numtracers: %s", numTracers);
    // console.log("tracerGap: %s", tracerGap);
    var tracers = [
        hilbert_fractal_1.FirstHilbertPart(order)
    ];
    // TODO: Tracers need to move off in both directions from each "tracerGap".
    var lastTracerIndex = numTracers - 1;
    var len;
    var pos = 0;
    while (tracers.length < numTracers) {
        pos += tracerGap;
        // console.log("len: %s", len);
        // console.log("push index: %s", pos - 1);
        tracers.push(hilbert_fractal_1.HilbertPartAt(pos - 1, order));
        if (tracers.length < numTracers) {
            // console.log("push opposite: %s", pos);
            tracers.push(hilbert_fractal_1.HilbertPartAt(pos, order));
        }
    }
    // console.log("lastTracerIndex %s", lastTracerIndex);
    // console.dir(tracers);
    // Build the array of colours which smoothly transition from red to green to blue.
    var stops = [];
    for (var i = 0; i < numTracers; i++) {
        stops.push({ r: 1, g: 0, b: 0 });
        stops.push({ r: 0, g: 1, b: 0 });
        stops.push({ r: 0, g: 0, b: 1 });
    }
    var colourMap = gradient_1.gradient(stops, Math.pow(4, order));
    var _render = function () {
        if (tracers[0].index < tracerGap) {
            for (var i = 0; i < numTracers; i++) {
                var h = tracers[i];
                // Set the line path.
                ctx.beginPath();
                ctx.moveTo(offset.x + h.previous.x * scale, offset.y + h.previous.y * scale);
                ctx.lineTo(offset.x + h.current.x * scale, offset.y + h.current.y * scale);
                // Set the line colour.
                var colour = colourMap[h.index];
                var colourStr = "rgb(" +
                    Math.floor(255 * colour.r) + ", " +
                    Math.floor(255 * colour.g) + ", " +
                    Math.floor(255 * colour.b) + ")";
                ctx.strokeStyle = colourStr;
                ctx.lineWidth = 2;
                ctx.stroke();
                // If this tracer is moving forward.
                if (i % 2 === 0) {
                    tracers[i] = hilbert_fractal_1.NextHilbertPart(h);
                }
                else {
                    tracers[i] = hilbert_fractal_1.PreviousHilbertPart(h);
                }
            }
            window.requestAnimationFrame(_render);
        }
    };
    window.requestAnimationFrame(_render);
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hilbert_1 = __webpack_require__(6);
/**
 * Returns an object representing the next part of a pseudo-Hilbert curve, given some other part.
 * @param p Some part of a pseudo-Hilbert curve.
 */
exports.NextHilbertPart = function (p) {
    var index_prime = p.index + 1;
    if (index_prime < Math.pow(4, p.order)) {
        var current_prime = hilbert_1.hilbert(index_prime, p.order);
        return {
            order: p.order,
            index: index_prime,
            previous: { x: p.current.x, y: p.current.y },
            current: current_prime
        };
    }
    else {
        return null;
    }
};
/**
 * Returns an object representing the previous part of a pseudo-Hilbert curve, given some other part.
 * @param p Some part of a pseudo-Hilbert curve.
 */
exports.PreviousHilbertPart = function (p) {
    var index_prime = p.index - 1;
    if (index_prime < Math.pow(4, p.order)) {
        var current_prime = hilbert_1.hilbert(index_prime, p.order);
        return {
            order: p.order,
            index: index_prime,
            previous: { x: p.current.x, y: p.current.y },
            current: current_prime
        };
    }
    else {
        return null;
    }
};
/**
 * Returns an object representing the first part of a pseudo-Hilbert curve of the given order.
 * @param order The order of the desired pseudo-Hilbert curve.
 */
exports.FirstHilbertPart = function (order) {
    return {
        order: order,
        index: 1,
        previous: { x: 0, y: 0 },
        current: hilbert_1.hilbert(1, order)
    };
};
/**
 * Returns an object representing the last part of a pseudo-Hilbert curve of the given order.
 * @param order The order of the desired pseudo-Hilbert curve.
 */
exports.LastHilbertPart = function (order) {
    var last_index = Math.pow(4, order) - 1;
    return {
        order: order,
        index: last_index,
        previous: { x: 0, y: 0 },
        current: hilbert_1.hilbert(1, order)
    };
};
/**
 * Returns an object representing the part of a pseudo-Hilbert curve of the given order at
 * the given index.
 * @param index
 * @param order
 */
exports.HilbertPartAt = function (index, order) {
    var max_index = Math.pow(4, order) - 1;
    if (index === 0) {
        return exports.FirstHilbertPart(order);
    }
    else if (index > max_index) {
        throw "Err: index (" + index + ") exceeds maximum (" + max_index + ") for curve of this order. (" + order + ")";
    }
    return {
        order: order,
        index: index,
        previous: hilbert_1.hilbert(index - 1, order),
        current: hilbert_1.hilbert(index, order)
    };
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var padLeft = function (s, n, c) {
    if (c === void 0) { c = " "; }
    return n > s.length ? padLeft(c + s, n - 1) : s;
};
exports.hilbert = function (index, order) {
    var area = Math.pow(4, order);
    var max_index = area - 1;
    if (index > max_index) {
        throw "Err: index (" + index + ") must be less than the maximum index (" + max_index + ") of an order " + order + " cruve.";
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
    var hilbert_prime = exports.hilbert(index_prime, order_prime);
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
var Hilbert = (function () {
    function Hilbert() {
    }
    Hilbert.IndexToPoint = function (index, order) {
        return exports.hilbert(index, order);
    };
    Hilbert.PointToIndex = function (x, y, order) {
        var side_length = Math.pow(2, order);
        var max_side_length = side_length - 1;
        console.log("{%s, %s, %s} side_length: %s", x, y, order, side_length);
        if (x > max_side_length || y > max_side_length) {
            throw "Err: x and y (" + x + "," + y + ") cannot exceed the maximum side length (" + side_length + ")";
        }
        var order_1 = [
            [0, 1],
            [3, 2]
        ];
        if (order === 0) {
            return 0;
        }
        else if (order === 1) {
            return order_1[x][y];
        }
        var order_prime = order - 1;
        var max_index_prime = Math.pow(4, order_prime);
        var half_side_length = Math.pow(2, order_prime);
        var qx = x >= half_side_length ? 1 : 0;
        var qy = y >= half_side_length ? 1 : 0;
        var quadrant = order_1[qx][qy];
        var index_offset = max_index_prime * quadrant;
        console.log("{%s, %s, %s} half_side_length: %s", x, y, order, half_side_length);
        console.log("{%s, %s, %s} qx, qy: %s, %s", x, y, order, qx, qy);
        console.log("{%s, %s, %s} quadrant: %s", x, y, order, quadrant);
        console.log("{%s, %s, %s} index_offset: %s", x, y, order, index_offset);
        switch (quadrant) {
            case 0: return Hilbert.PointToIndex(y, x, order_prime);
            case 1: return index_offset + Hilbert.PointToIndex(x, y - half_side_length, order_prime);
            case 2: return 2 * index_offset + Hilbert.PointToIndex(x - half_side_length, y - half_side_length, order_prime);
            case 3: return 3 * index_offset + Hilbert.PointToIndex(y - 1, x - half_side_length, order_prime);
        }
        throw "Err: something has gone terribly wrong.";
    };
    return Hilbert;
}());
exports.Hilbert = Hilbert;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
;
exports.gradient = function (stops, steps) {
    var numStops = stops.length;
    var deltas = [];
    var g = [stops[0]];
    for (var i = 1; i < numStops; i++) {
        deltas.push({
            r: stops[i].r - stops[i - 1].r,
            g: stops[i].g - stops[i - 1].g,
            b: stops[i].b - stops[i - 1].b
        });
    }
    var stepsPerStop = steps / deltas.length;
    for (var i = 1; i < steps; i++) {
        var d = Math.floor(i / stepsPerStop);
        g.push({
            r: Math.max(0, Math.min(1, g[i - 1].r + (deltas[d].r / stepsPerStop))),
            g: Math.max(0, Math.min(1, g[i - 1].g + (deltas[d].g / stepsPerStop))),
            b: Math.max(0, Math.min(1, g[i - 1].b + (deltas[d].b / stepsPerStop)))
        });
        var g0 = g[g.length - 1];
    }
    return g;
};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map