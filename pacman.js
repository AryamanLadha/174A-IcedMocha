import { defs, tiny } from './examples/common.js';
import Actor from "./actor.js"

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;
// position = (0,0)
// direction = f
// speed = 0

export default class PacMan extends Actor {
    constructor(speed, initPosition) {
        let direction = "f";
        const info = {
            shape: new defs.Subdivision_Sphere(4),
            materials: new Material(new defs.Phong_Shader(),
                { ambient: 0.4, diffusivity: 0.8, color: hex_color("#fac91a") }),
        }
        super(info, Mat4.identity(), direction, speed);
        this.position = initPosition;
    }

    draw(context, program_state, materials) {
        this.info.shape.draw(context, program_state, this.position, materials);
    }

    move() {
        let matrix = Mat4.identity();
        switch (this.direction) {
            // up
            case 'w':
                matrix = Mat4.translation(0, this.speed, 0);
                break;
            // down
            case 's':
                matrix = Mat4.translation(0, -this.speed, 0);
                break;
            // left
            case 'a':
                matrix = Mat4.translation(-this.speed, 0, 0);
                break;
            // right
            case 'd':
                matrix = Mat4.translation(this.speed, 0, 0);
                break;
            default:
                matrix = Mat4.translation(0, 0, 0);
                break;
        }
        this.position = this.position.times(matrix);
    }

}