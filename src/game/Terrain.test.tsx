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
