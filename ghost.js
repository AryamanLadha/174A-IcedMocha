import { defs, tiny } from './examples/common.js';
import Actor from "./actor.js"

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export default class Ghost extends Actor {
    constructor() {
        const info = {
            shape: new Shape_From_File("assets/teapot.obj"),
            material: new Material(new defs.Phong_Shader(),
                { ambient: 0.4, diffusivity: 0.8, color: hex_color("#fac91a") }),
        }
        super(info, Mat4.identity(), direction, speed);
    }

    draw(context, program_state, model_transform, materials) {
        this.info.shape.draw(context, program_state, model_transform.times(this.position), materials);
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