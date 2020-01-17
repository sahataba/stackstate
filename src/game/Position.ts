export default class Position {
    readonly x: number;
    readonly y: number;
    readonly nodeId: string;
    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
        this.nodeId = `${this.x}-${this.y}`;
    }
}