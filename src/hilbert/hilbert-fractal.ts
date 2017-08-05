import { hilbert } from "./hilbert";
import { Fractal } from "../common/fractal";


interface Point {
	x: number, y: number
}

export interface HilbertPart {
	order: number,
	index: number,
	previous: Point,
	current: Point
}

/**
 * Returns an object representing the next part of a pseudo-Hilbert curve, given some other part.
 * @param p Some part of a pseudo-Hilbert curve.
 */
export const NextHilbertPart: Fractal<HilbertPart> = (p: HilbertPart) => {

	let index_prime = p.index + 1;
	if (index_prime < Math.pow(4, p.order)) {
		let current_prime = hilbert(index_prime, p.order);
		return {
			order: p.order,
			index: index_prime,
			previous: { x: p.current.x, y: p.current.y },
			current: current_prime
		}
	}
	else {
		return null;
	}
}

/**
 * Returns an object representing the previous part of a pseudo-Hilbert curve, given some other part.
 * @param p Some part of a pseudo-Hilbert curve.
 */
export const PreviousHilbertPart: Fractal<HilbertPart> = (p: HilbertPart) => {

	let index_prime = p.index - 1;
	if (index_prime < Math.pow(4, p.order)) {
		let current_prime = hilbert(index_prime, p.order);
		return {
			order: p.order,
			index: index_prime,
			previous: { x: p.current.x, y: p.current.y },
			current: current_prime
		}
	}
	else {
		return null;
	}
}

/**
 * Returns an object representing the first part of a pseudo-Hilbert curve of the given order.
 * @param order The order of the desired pseudo-Hilbert curve.
 */
export const FirstHilbertPart = (order: number) => {
	return {
		order: order,
		index: 1,
		previous: { x: 0, y: 0},
		current: hilbert(1, order)
	}
}

/**
 * Returns an object representing the last part of a pseudo-Hilbert curve of the given order.
 * @param order The order of the desired pseudo-Hilbert curve.
 */
export const LastHilbertPart = (order: number) => {
	const last_index = Math.pow(4, order) - 1;
	return {
		order: order,
		index: last_index,
		previous: { x: 0, y: 0 },
		current: hilbert(1, order)
	}
}

/**
 * Returns an object representing the part of a pseudo-Hilbert curve of the given order at
 * the given index.
 * @param index 
 * @param order 
 */
export const HilbertPartAt = (index: number, order: number) => {
	const max_index = Math.pow(4, order) - 1;
	if (index === 0) {
		return FirstHilbertPart(order);
	} else if (index > max_index) {
		throw "Err: index (" + index + ") exceeds maximum (" + max_index + ") for curve of this order. (" + order + ")";
	}
	return {
		order: order,
		index: index,
		previous: hilbert(index - 1, order),
		current: hilbert(index, order)
	}
}

