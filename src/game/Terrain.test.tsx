import Terrain from './Terrain';
import {nodeId} from './Position';

test('adding normal cells removes boulder, gravel and wormholes(enter and exit)', () => {
  let terrain = new Terrain(3)
  terrain.addCell([0,0], "boulder");
  terrain.addCell([0,1], "gravel");
  terrain.addCell([0,2], "enter");
  terrain.addCell([1,0], "exit");

  expect(terrain.getCellType([0, 0])).toBe("boulder")
  expect(terrain.getCellType([0, 1])).toBe("gravel")
  expect(terrain.getCellType([0, 2])).toBe("enter")
  expect(terrain.getCellType([1, 0])).toBe("exit")

  terrain.addCell([0,0], "normal");
  terrain.addCell([0,1], "normal");
  terrain.addCell([0,2], "normal");
  terrain.addCell([1,0], "normal");

  expect(terrain.getCellType([0, 0])).toBe("normal")
  expect(terrain.getCellType([0, 1], )).toBe("normal")
  expect(terrain.getCellType([0, 2])).toBe("normal")
  expect(terrain.getCellType([1, 0])).toBe("normal")

});

test('start and end can also be on boulder, gravel and wormholes(enter and exit)', () => {
  let terrain = new Terrain(3)
  terrain.addCell([0,0], "boulder");
  terrain.addCell([0,1], "gravel");
  terrain.addCell([0,2], "enter");
  terrain.addCell([1,0], "exit");

  expect(terrain.getCellType([0, 0])).toBe("boulder")
  expect(terrain.getCellType([0, 1])).toBe("gravel")
  expect(terrain.getCellType([0, 2])).toBe("enter")
  expect(terrain.getCellType([1, 0])).toBe("exit")

  terrain.setEdge([0,0], "start");
  expect(terrain.getCellType([0, 0])).toBe("boulder")
  expect(terrain.start).toStrictEqual([0, 0]);

  terrain.setEdge([0,1], "start");
  expect(terrain.getCellType([0, 1])).toBe("gravel")
  expect(terrain.start).toStrictEqual([0, 1]);

  terrain.setEdge([0,2], "start");
  expect(terrain.getCellType([0, 2])).toBe("enter")
  expect(terrain.start).toStrictEqual([0, 2]);

  terrain.setEdge([1, 0], "start");
  expect(terrain.getCellType([1, 0])).toBe("exit")
  expect(terrain.start).toStrictEqual([1, 0]);

});

test('adding and removing exit cell, adds it and removes it from exits set', () => {
  let terrain = new Terrain(3)

  expect(terrain.getCellType([0, 0])).toBe("normal")
  expect(terrain.exits.has(nodeId([0, 0]))).toBe(false)

  terrain.addCell([0,0], "exit");
  expect(terrain.exits.has(nodeId([0, 0]))).toBe(true)

  terrain.addCell([0,0], "normal");
  expect(terrain.exits.has(nodeId([0, 0]))).toBe(false)
});

test('new terrain of size 2 generates 4 cells', () => {
  let terrain = new Terrain(2)
  expect(terrain.allPositions).toStrictEqual([
    [0, 0], [1, 0],
    [0, 1], [1, 1]]
  );
});

test('neighbours of interior point returns 4 neighbour cell', () => {
  let terrain = new Terrain(3)
  const position: [number, number] = [1, 1]
  
  expect(terrain.neighbors(position).length).toBe(4);
});

test('neighbours of corner points returns 2 neighbour cell', () => {
  let terrain = new Terrain(3)
  
  expect(terrain.neighbors([0, 0]).length).toBe(2);
  expect(terrain.neighbors([0, 2]).length).toBe(2);
  expect(terrain.neighbors([2, 0]).length).toBe(2);
  expect(terrain.neighbors([2, 2]).length).toBe(2);

});

test('neighbours of side points returns 3 neighbour cell', () => {
  let terrain = new Terrain(3)
  
  expect(terrain.neighbors([1, 0]).length).toBe(3);
  expect(terrain.neighbors([1, 2]).length).toBe(3);
  expect(terrain.neighbors([0, 1]).length).toBe(3);
  expect(terrain.neighbors([2, 1]).length).toBe(3);

});
