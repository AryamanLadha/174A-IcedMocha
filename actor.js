export default class Actor {
    constructor(info, position, direction = "f", speed = 2) {
        this.info = info;
        this.position = position;
        this.direction = direction;
        this.speed = speed;
    }
}