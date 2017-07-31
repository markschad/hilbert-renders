/**
 * Passing no arguments to the fractal returns an initial state.
 */
export interface Fractal<T> {
	(t?: T): T;
}
