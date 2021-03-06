import { solve, calcWeight } from './Solve';
import Terrain from './Terrain';

test('return No start position error message if start is not set', () => {
  let terrain = new Terrain(3)
  terrain.setEdge([2,0], "end");
  let res = solve(terrain)
  expect(res).toBe("No start position");
});

test('return No end position error message if end is not set', () => {
  let terrain = new Terrain(3)
  terrain.setEdge([2,0], "start");
  let res = solve(terrain)
  expect(res).toBe("No end position");
});

test('return Cannot find path error message if there is a wall spliting terrain, with start and end on each side', () => {
  let terrain = new Terrain(3)
  terrain.setEdge([0,0], "start");
  terrain.setEdge([2,0], "end");
  terrain.addCell([1, 0], "boulder")
  terrain.addCell([1, 1], "boulder")
  terrain.addCell([1, 2], "boulder")
  let res = solve(terrain)
  expect(res).toBe("Cannot find path");
});

test('weight of traveling between gravel and normal is 1.5 = 0.5 * 1 + 0.5 * 2', () => {
  expect(calcWeight("normal", "gravel")).toBe(1.5)  
});

test('weight of traveling between gravel and gravel is 2 = 0.5 * 2 + 0.5 * 2', () => {
  expect(calcWeight("gravel", "gravel")).toBe(2)  
});

test('weight of traveling between normal and wormhole enter is 0.5', () => {
  expect(calcWeight("normal", "enter")).toBe(0.5)  
});

test('weight of traveling between gravel and wormhole enter is 1', () => {
  expect(calcWeight("normal", "enter")).toBe(0.5)  
});

test('weight of traveling between normal and wormhole exit is 0.5', () => {
  expect(calcWeight("normal", "enter")).toBe(0.5)  
});

test('weight of traveling between gravel and wormhole exit is 1', () => {
  expect(calcWeight("normal", "enter")).toBe(0.5)  
});

test('return a Path if there is a wormhole over the wall', () => {
  let terrain = new Terrain(3)
  terrain.setEdge([0,0], "start");
  terrain.setEdge([2,0], "end");
  terrain.addCell([1, 0], "boulder")
  terrain.addCell([1, 1], "boulder")
  terrain.addCell([1, 2], "boulder")
  terrain.addCell([0, 1], "enter")
  terrain.addCell([2, 1], "exit")
  let res = solve(terrain)
  expect(res.length).toBe(4);
});
