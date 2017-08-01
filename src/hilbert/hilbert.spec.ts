import * as test from "tape";

import { hilbert, Hilbert as H } from "./hilbert";


const fixtures = [
	{
		order: 0,
		expected: [
			{
				x: 0, y: 0
			}
		]
	},
	{
		order: 1,
		expected: [
			{
				x: 0, y: 0
			}, {
				x: 0, y: 1
			}, {
				x: 1, y: 1
			}, {
				x: 1, y: 0
			}
		]	
	},
	{
		order: 2,
		expected: [
			{
				x: 0, y: 0	//  0
			}, {
				x: 1, y: 0	//  1
			}, {
				x: 1, y: 1	//  2
			}, {
				x: 0, y: 1	//  3
			}, {
				x: 0, y: 2	//  4
			}, {
				x: 0, y: 3	//  5
			}, {
				x: 1, y: 3	//  6
			}, {
				x: 1, y: 2	//  7
			}, {
				x: 2, y: 2	//  8
			}, {
				x: 2, y: 3	//  9
			}, {
				x: 3, y: 3	// 10
			}, {
				x: 3, y: 2	// 11
			}, {
				x: 3, y: 1	// 12
			}, {
				x: 2, y: 1	// 13
			}, {
				x: 2, y: 0	// 14
			}, {
				x: 3, y: 0	// 15
			}
		]
	},{
		order: 3,
		expected: [
			{
				x: 0, y: 0	//  0
			},{
				x: 0, y: 1	//  1
			},{
				x: 1, y: 1	//  2
			},{
				x: 1, y: 0	//  3
			},{
				x: 2, y: 0	//  4
			},{
				x: 3, y: 0	//  5
			},{
				x: 3, y: 1	//  6
			},{
				x: 2, y: 1	//  7
			},{
				x: 2, y: 2	//  8
			},{
				x: 3, y: 2	//  9
			},{
				x: 3, y: 3	// 10
			},{
				x: 2, y: 3	// 11
			},{
				x: 1, y: 3	// 12
			},{
				x: 1, y: 2	// 13
			},{
				x: 0, y: 2	// 14
			},{
				x: 0, y: 3	// 15
			},{
				x: 0, y: 4	// 16
			}
		]
	}
];


const num_tests = fixtures.length;

for (let i = 0; i < num_tests; i++) {

	const f = fixtures[i];
	const order = f.order;

	test("hilbert (index -> x,y), order: " + f.order, (t) => {

		let num_indices = f.expected.length;

		for (let j = 0; j < num_indices; j++) {

			t.test("index: " + j, (ti) => {

				const exp = f.expected[j];
				ti.deepEqual(hilbert(j, order), exp);
				ti.end();

			});		

		}

	});

	test ("hilbert (x,y -> index), order: " + f.order, (t) => {

		let num_indices = f.expected.length;

		for (let j = 0; j < num_indices; j++) {

			t.test("index: " + j, (ti) => {

				const exp = f.expected[j];
				ti.deepEqual(H.PointToIndex(exp.x, exp.y, order), j);
				ti.end();

			});		

		}

	});

}
