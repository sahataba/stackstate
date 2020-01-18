import Terrain from './Terrain';

test('adding normal cells removes boulder, gravel and wormholes(enter and exit)', () => {
  let terrain = new Terrain(3)
  terrain.addCell([0,0], "boulder");
  terrain.addCell([0,1], "gravel");
  terrain.addCell([0,2], "enter");
  terrain.addCell([1,0], "exit");

  expect(terrain.isCellType([0, 0], "boulder")).toBe(true)
  expect(terrain.isCellType([0, 1], "gravel")).toBe(true)
  expect(terrain.isCellType([0, 2], "enter")).toBe(true)
  expect(terrain.isCellType([1, 0], "exit")).toBe(true)

  terrain.addCell([0,0], "normal");
  terrain.addCell([0,1], "normal");
  terrain.addCell([0,2], "normal");
  terrain.addCell([1,0], "normal");

  expect(terrain.isCellType([0, 0], "boulder")).toBe(false)
  expect(terrain.isCellType([0, 1], "gravel")).toBe(false)
  expect(terrain.isCellType([0, 2], "enter")).toBe(false)
  expect(terrain.isCellType([1, 0], "exit")).toBe(false)

  expect(terrain.isCellType([0, 0], "normal")).toBe(true)
  expect(terrain.isCellType([0, 1], "normal")).toBe(true)
  expect(terrain.isCellType([0, 2], "normal")).toBe(true)
  expect(terrain.isCellType([1, 0], "normal")).toBe(true)

});

test('start and end can also be on boulder, gravel and wormholes(enter and exit)', () => {
  let terrain = new Terrain(3)
  terrain.addCell([0,0], "boulder");
  terrain.addCell([0,1], "gravel");
  terrain.addCell([0,2], "enter");
  terrain.addCell([1,0], "exit");

  expect(terrain.isCellType([0, 0], "boulder")).toBe(true)
  expect(terrain.isCellType([0, 1], "gravel")).toBe(true)
  expect(terrain.isCellType([0, 2], "enter")).toBe(true)
  expect(terrain.isCellType([1, 0], "exit")).toBe(true)

  terrain.setEdge([0,0], "start");
  expect(terrain.isCellType([0, 0], "boulder")).toBe(true)
  expect(terrain.start).toStrictEqual([0, 0]);

  terrain.setEdge([0,1], "start");
  expect(terrain.isCellType([0, 1], "gravel")).toBe(true)
  expect(terrain.start).toStrictEqual([0, 1]);

  terrain.setEdge([0,2], "start");
  expect(terrain.isCellType([0, 2], "enter")).toBe(true)
  expect(terrain.start).toStrictEqual([0, 2]);

  terrain.setEdge([1, 0], "start");
  expect(terrain.isCellType([1, 0], "exit")).toBe(true)
  expect(terrain.start).toStrictEqual([1, 0]);

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
