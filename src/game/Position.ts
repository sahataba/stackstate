export default class Position {
    x: number;
    y: number;
    constructor(x: number, y:number) {
        this.x = x;
        this.y = y;
    }
    nodeId(): string {
        return `${this.x}-${this.y}`;
    }
}