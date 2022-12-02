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
        this.prev_direction = null;
    }

    draw(context, program_state, materials) {
        this.info.shape.draw(context, program_state, this.position, materials);
    }

    collision_detection(all_mazes){
        let detected = false;

        for (let i = 0; i < all_mazes.length; i++){
            let matrix = Mat4.identity();

            let maze_x = all_mazes[i][0][3];
            let maze_y = all_mazes[i][1][3];

            let x_loc = this.position[0][3];
            let y_loc = this.position[1][3];
            
            // collision from down to up
            if (Math.abs(y_loc-maze_y) < 2 && (x_loc === maze_x) && (this.direction == "w" || this.direction == "s") && (this.prev_direction === null)){
                this.prev_direction = this.direction;
                this.direction = "z";
                this.move(this.direction)
                detected = true;
                break;
            }

            // colliison from right or left
            else if(Math.abs(x_loc-maze_x)<2 && (y_loc === maze_y) && (this.direction == "a" || this.direction == "d") && (this.prev_direction === null)){
                this.prev_direction = this.direction;
                this.direction = "z";
                this.move(this.direction)
                detected = true;
                break;
            }

        }
        if(!detected)
            this.move(this.direction)
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
                if(this.prev_direction === 'w'){break;}
                matrix = Mat4.translation(0, this.speed, 0);
                this.prev_direction = null;
                break;
            // down
            case 's':
                if(this.prev_direction === 's'){break;}
                matrix = Mat4.translation(0, -this.speed, 0);
                this.prev_direction = null;
                break;
            // left
            case 'a':
                if(this.prev_direction === 'a'){break;}
                matrix = Mat4.translation(-this.speed, 0, 0);
                this.prev_direction = null;
                break;
            // right
            case 'd':
                if(this.prev_direction === 'd'){break;}
                matrix = Mat4.translation(this.speed, 0, 0);
                this.prev_direction = null;
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