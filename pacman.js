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
        let direction = "d";
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
        const y = this.position[1][3];
        const x = this.position[0][3];
        const adjusted_y = ((Math.floor(y)%2) === 1) ? Math.floor(y)+1 : Math.floor(y)
        const adjusted_x = ((Math.floor(x)%2) === 1) ? Math.floor(x)+1 : Math.floor(x)
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
        if(this.direction === 'a' || this.direction === 'd'){
            this.position[1][3] = adjusted_y
        }
        else if(this.direction === 'w' || this.direction === 's'){
            this.position[0][3] = adjusted_x
        }
    }

}