
const padLeft = (s: string, n: number, c: string = " "): string => {
	return n > s.length ? padLeft(c + s, n - 1) : s;
}


export const hilbert = (index: number, order: number): { x: number, y: number } => {

	// console.log("{"+index+","+order+"} index: "+index);
	// console.log("{"+index+","+order+"} order: "+order);

	const area = Math.pow(4, order);
	const max_index = area - 1;

	// console.log("{"+index+","+order+"} area: "+area);
	// console.log("{"+index+","+order+"} max_index: "+max_index);

	if (index > max_index) {
		throw "Err: index must be less than the maximum index (" + max_index + ") of an order " + order + " cruve."
	}

	// Return trivial curves for order 0,1 hilbert curves.
	if (order === 0 ) {
		return { x: 0, y: 0 };
	} else if (order === 1) {
		switch (index) {
			case 0: return { x: 0, y: 0 };
			case 1: return { x: 0, y: 1 };
			case 2: return { x: 1, y: 1 };
			case 3: return { x: 1, y: 0 };
		}
	}

	const order_prime = order - 1;
	const offset = Math.pow(2, order_prime);
	const area_prime = Math.pow(4, order_prime);
	const index_prime = index % area_prime;
	const quadrant = Math.floor(index / area_prime);

	// console.log("{"+index+","+order+"} order_prime: "+order_prime);
	// console.log("{"+index+","+order+"} offset: "+offset);
	// console.log("{"+index+","+order+"} area_prime: "+area_prime);
	// console.log("{"+index+","+order+"} index_prime: "+index_prime);
	// console.log("{"+index+","+order+"} quadrant: "+quadrant);

	const hilbert_prime = hilbert(index_prime, order_prime);

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
		}
		default: return {
			x: 0,
			y: 0
		}
	}

}


export class Hilbert {


	static IndexToPoint(index: number, order: number): { x: number, y: number } {
		return hilbert(index, order);
	}


	static PointToIndex(x: number, y: number, order: number): number {

		const order_prime = order - 1;
		const max_index = Math.pow(4, order);
		const area = Math.pow(4, order_prime);
		const offset = Math.pow(2, order_prime);

		return 0;

	}



}

