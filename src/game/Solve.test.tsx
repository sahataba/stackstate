import { solve } from './Solve';
import Terrain from './Terrain';
import Position from './Position';

test('return No start position error message if start is not set', () => {
  let terrain = new Terrain(3)
  terrain.setEdge(new Position(2,0), "end");
  let res = solve(terrain)
  expect(res).toBe("No start position");
});

test('return No end position error message if end is not set', () => {
  let terrain = new Terrain(3)
  terrain.setEdge(new Position(2,0), "start");
  let res = solve(terrain)
  expect(res).toBe("No end position");
});

test('return Cannot find path error message if path cannot be found', () => {
  let terrain = new Terrain(3)
  terrain.setEdge(new Position(0,0), "start");
  terrain.setEdge(new Position(2,0), "end");
  terrain.addCell(new Position(1, 0), "boulder")
  terrain.addCell(new Position(1, 1), "boulder")
  terrain.addCell(new Position(1, 2), "boulder")
  let res = solve(terrain)
  expect(res).toBe("Cannot find path");
});
