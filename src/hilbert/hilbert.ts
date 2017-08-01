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
		throw "Err: index (" + index + ") must be less than the maximum index (" + max_index + ") of an order " + order + " cruve."
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

		const side_length = Math.pow(2, order);
		const max_side_length = side_length - 1;

		console.log("{%s, %s, %s} side_length: %s", x, y, order, side_length);

		if (x > max_side_length || y > max_side_length) {
			throw "Err: x and y (" + x + "," + y + ") cannot exceed the maximum side length (" + side_length + ")";
		}

		const order_1 = [
			[ 0, 1 ],
			[ 3, 2 ]
		];

		if (order === 0) {
			return 0;
		} else if (order === 1) {
			return order_1[x][y];
		}

		const order_prime = order - 1;
		const max_index_prime = Math.pow(4, order_prime);
		const half_side_length = Math.pow(2, order_prime);
		const qx = x >= half_side_length ? 1 : 0;
		const qy = y >= half_side_length ? 1 : 0;
		const quadrant = order_1[qx][qy];
		const index_offset = max_index_prime * quadrant;

		console.log("{%s, %s, %s} half_side_length: %s", x, y, order, half_side_length);
		console.log("{%s, %s, %s} qx, qy: %s, %s", x, y, order, qx, qy);
		console.log("{%s, %s, %s} quadrant: %s", x, y, order, quadrant);
		console.log("{%s, %s, %s} index_offset: %s", x, y, order, index_offset);

		switch (quadrant) {

			case 0: return Hilbert.PointToIndex(
				y, 
				x, 
				order_prime);

			case 1: return index_offset + Hilbert.PointToIndex(
				x, 
				y - half_side_length,
				order_prime);

			case 2: return 2 * index_offset + Hilbert.PointToIndex(
				x - half_side_length,
				y - half_side_length,
				order_prime);

			case 3: return 3 * index_offset + Hilbert.PointToIndex(
				y - 1,
				x - half_side_length,
				order_prime);

		}

		throw "Err: something has gone terribly wrong.";

	}

}

