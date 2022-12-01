import { defs, tiny } from './examples/common.js';
import Maze from "./maze.js"
import PacMan from "./pacman.js";
import Ghost from "./ghost.js";
import Gouraud_Shader from "./gourad-shader.js"
import Tokens from "./tokens.js";
const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class Game extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        this.speed = 0.05;
        this.pacman_scale = Mat4.identity().times(Mat4.scale(1, 1, 1));
        const initPosition = Mat4.identity().times(Mat4.translation(18, 28, 0)).times(this.pacman_scale);
        this.attached = false;

        this.ghost_scale = Mat4.identity().times(Mat4.scale(0.6, 0.6, 0.6));
        const opening = Mat4.identity().times(Mat4.translation(18, 38, 0)).times(this.ghost_scale);
        const ghost_initPosition1 = Mat4.identity().times(Mat4.translation(17, 34, 0)).times(this.ghost_scale);
        const ghost_initPosition2 = Mat4.identity().times(Mat4.translation(17, 32, 0)).times(this.ghost_scale);
        const ghost_initPosition3 = Mat4.identity().times(Mat4.translation(19, 34, 0)).times(this.ghost_scale);
        const ghost_initPosition4 = Mat4.identity().times(Mat4.translation(19, 32, 0)).times(this.ghost_scale);

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            tokens: new Tokens(),
            maze: new Maze(new Material(new Gouraud_Shader(), { ambient: 1, color: hex_color("#00008B") })),
            pacman: new PacMan(this.speed, initPosition),
            ghost1: new Ghost(this.speed*3, ghost_initPosition1, 1),
            ghost2: new Ghost(this.speed*3, ghost_initPosition2, 2),
            ghost3: new Ghost(this.speed*3, ghost_initPosition3, 3),
            ghost4: new Ghost(this.speed*3, ghost_initPosition4, 4)
        },
            // *** Materials
            this.materials = {
                test: new Material(new defs.Phong_Shader(),
                    { ambient: 1, diffusivity: .6, color: hex_color("#ffffff") }),
            }

        this.initial_camera_location = Mat4.look_at(vec3(19, 30, 70), vec3(19, 30, 0), vec3(0, 50, 0));
        this.init = true;
        this.ghost_inits = [ghost_initPosition1, ghost_initPosition2, ghost_initPosition3, ghost_initPosition4];
        this.ghost_positions = [this.shapes.ghost1.position, this.shapes.ghost2.position, this.shapes.ghost3.position, this.shapes.ghost4.position];
        this.opening = opening;

    }

    // Going up can mean different things based on the direction you are currently moving in.
    handleUp(){
        if (!this.attached){
            this.shapes.pacman.direction = 'w';
            return;
        }
        switch(this.shapes.pacman.direction){
            case 'w':
                this.shapes.pacman.direction = 'w';
                break;
            case 's':
                this.shapes.pacman.direction = "s";
                break;
            case 'a':
                this.shapes.pacman.direction = "a";
                break;
            case 'd':
                this.shapes.pacman.direction = 'd';
                break;
            default:
                this.shapes.pacman.direction = 'w';
                break
        }
    }

    handleDown(){
        console.log(this.shapes.pacman.direction);
        if (!this.attached){
            this.shapes.pacman.direction = 's';
            return;
        }
        console.log(this.shapes.pacman.direction);
        switch(this.shapes.pacman.direction){
            case 'w':
                this.shapes.pacman.direction = 's';
                break;
            case 's':
                this.shapes.pacman.direction = "w";
                break;
            case 'a':
                this.shapes.pacman.direction = "d";
                break;
            case 'd':
                this.shapes.pacman.direction = 'a';
                break;
            default:
                this.shapes.pacman.direction = 's';
                break
        }
    }

    handleLeft(){
        if (!this.attached){
            this.shapes.pacman.direction = 'a';
            return;
        }
        switch(this.shapes.pacman.direction){
            case 'w':
                this.shapes.pacman.direction = 'a';
                break;
            case 's':
                this.shapes.pacman.direction = "d";
                break;
            case 'a':
                this.shapes.pacman.direction = "s";
                break;
            case 'd':
                this.shapes.pacman.direction = 'w';
                break;
            default:
                this.shapes.pacman.direction = 'a';
                break
        }
    }

    handleRight(){
        if (!this.attached){
            this.shapes.pacman.direction = 'd';
            return;
        }
        switch(this.shapes.pacman.direction){
            case 'w':
                this.shapes.pacman.direction = 'd';
                break;
            case 's':
                this.shapes.pacman.direction = "a";
                break;
            case 'a':
                this.shapes.pacman.direction = "w";
                break;
            case 'd':
                this.shapes.pacman.direction = 's';
                break;
            default:
                this.shapes.pacman.direction = 'd';
                break
        }
    }

    make_control_panel() {
        this.key_triggered_button("Up", ["w"], this.handleUp);
        this.key_triggered_button("Down", ["s"], this.handleDown);
        this.key_triggered_button("Left", ["a"], this.handleLeft);
        this.key_triggered_button("Right", ["d"], this.handleRight);
        this.key_triggered_button("Stop", ["z"], () => { this.shapes.pacman.direction = "z" });
        this.new_line();
        this.key_triggered_button("Bird's Eye View", [","], () => this.attached = false);
        this.key_triggered_button("Pac-Man View", ["."], () => this.attached = true);
    }

    move_camera(program_state) {
        let desired = this.initial_camera_location;
        let matrix = Mat4.identity();
        switch (this.shapes.pacman.direction) {
            // up
            case 'w':
                matrix = matrix.times(Mat4.translation(0, -5, 5)).times(Mat4.rotation(0.3 * Math.PI, 1, 0, 0));
                break;
            // down
            case 's':
                matrix = matrix.times(Mat4.translation(0, 5, 5)).times(Mat4.rotation(Math.PI, 0, 0, 1)).times(Mat4.rotation(0.3 * Math.PI, 1, 0, 0));
                break;
            // left
            case 'a':
                matrix = matrix.times(Mat4.translation(5, 0, 5).times(Mat4.rotation(Math.PI / 2, 0, 0, 1).times(Mat4.rotation(0.3 * Math.PI, 1, 0, 0))));
                break;
            // right
            case 'd':
                matrix = matrix.times(Mat4.translation(-5, 0, 5).times(Mat4.rotation(-Math.PI / 2, 0, 0, 1).times(Mat4.rotation(0.3 * Math.PI, 1, 0, 0))));
                break;
            default:
                matrix = Mat4.identity();
                break;
        }

        const blending_factor = 0.5;
        if (this.attached) {
            desired = this.pacman_scale.times(this.shapes.pacman.position).times(matrix);
            desired = Mat4.inverse(desired);
            desired = desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, blending_factor));
            if (this.shapes.pacman.direction !== 'z')
                program_state.set_camera(desired);
        } else{
            let desired = this.initial_camera_location;
            desired = desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, blending_factor));
            program_state.set_camera(desired);
        }

    }

    pacman_ghost_collision_detection(){
        // let detected = true;
        let pacman_x = this.shapes.pacman.position[0][3];
        let pacman_y = this.shapes.pacman.position[1][3];

        let dir;

        for (let i = 0; i < this.ghost_positions.length; i++){
            let ghost_x = this.ghost_positions[i][0][3];
            let ghost_y = this.ghost_positions[i][1][3];
            // console.log(ghost_y);
            // console.log(Math.abs(pacman_y - ghost_y));

            if (Math.abs(pacman_y - ghost_y) < 2 && (pacman_x === ghost_x) && (this.shapes.pacman.direction == "w" || this.shapes.pacman.direction == "s")){
                // console.log("bump")
                // this.init = true;
                dir =  Math.random() >= 0.5 ? 3 : 4;
                if (i == 0) {
                    this.shapes.ghost1.position = this.opening;
                    this.shapes.ghost1.dir = dir;
                    // this.shapes.ghost1.init_move(this);
                    // this.init = false;
                    break;
                }
                else if (i == 1){
                    this.shapes.ghost2.position = this.opening;
                    this.shapes.ghost2.dir = dir;
                    // this.shapes.ghost2.init_move(this);
                    // this.init = false;
                    // break;
                }
                else if (i == 2) {
                    this.shapes.ghost3.position = this.opening;
                    this.shapes.ghost3.dir = dir;
                    // this.shapes.ghost3.init_move(this);
                    // this.init = false;
                    // break;
                }
                else if (i == 3) {
                    this.shapes.ghost4.position = this.opening;
                    this.shapes.ghost4.dir = dir;
                    // this.shapes.ghost4.init_move(this);
                    // this.init = false;
                    // break;
                }
            }

            // colliison from right or left
            else if(Math.abs(pacman_x - pacman_y)<2 && (pacman_y === ghost_y) && (this.shapes.pacman.direction == "a" || this.shapes.pacman.direction == "d")){
                // console.log("bump22")
                // this.init = true;
                dir =  Math.random() >= 0.5 ? 3 : 4;
                if (i == 0){
                    this.shapes.ghost1.position = this.opening;
                    this.shapes.ghost1.dir = dir;
                    // this.shapes.ghost1.init_move(this);
                    // this.init = false;
                    // break;
                }
                else if (i == 1) {
                    this.shapes.ghost2.position = this.opening;
                    this.shapes.ghost2.dir = dir;
                    // this.shapes.ghost2.init_move(this);
                    // this.init = false;
                    // break;
                }
                else if (i == 2) {
                    this.shapes.ghost3.position = this.opening;
                    this.shapes.ghost3.dir = dir;
                    // this.shapes.ghost3.init_move(this);
                    // this.init = false;
                    // break;
                }
                else if (i == 3) {
                    this.shapes.ghost4.position = this.opening;
                    this.shapes.ghost4.dir = dir;
                    // this.shapes.ghost4.init_move(this);
                    // this.init = false;
                    // break;
                }
                    // this.init = false;
                // this.direction = "z";
                // this.move(this.direction)
                // detected = true;
                // break;
            }
        }
    }
    

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        program_state.projection_transform = Mat4.perspective(Math.PI / 4, context.width / context.height, .1, 1000);
        const light_position = vec4(0, 5, 5, 1);
        // The parameters of the Light are: position, color, size
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        // Place the maze
        this.shapes.maze.draw(context, program_state);

        // Place one ghost
        const white = hex_color("#FFFFFF");
        this.shapes.ghost1.draw(context, program_state, this.materials.test.override({ color: white }));
        this.shapes.ghost2.draw(context, program_state, this.materials.test.override({ color: white }));
        this.shapes.ghost3.draw(context, program_state, this.materials.test.override({ color: white }));
        this.shapes.ghost4.draw(context, program_state, this.materials.test.override({ color: white }));

        // Move ghosts out of pen
        if (this.init){
            // console.log("true");
            this.shapes.ghost1.init_move(this);
            this.shapes.ghost2.init_move(this);
            this.shapes.ghost3.init_move(this);
            this.shapes.ghost4.init_move(this);
            // this.init = false;
        } else{
            this.shapes.ghost1.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[0] = this.shapes.ghost1.position;
            
            this.shapes.ghost2.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[1] = this.shapes.ghost2.position;

            this.shapes.ghost3.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[2] = this.shapes.ghost3.position;

            this.shapes.ghost4.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[3] = this.shapes.ghost4.position;

            this.pacman_ghost_collision_detection(this.ghost_positions);
        }
       

        // Place pacman
        const yellow = hex_color("#fac91a");
        this.shapes.pacman.draw(context, program_state, this.materials.test.override({ color: yellow }));
        this.shapes.pacman.collision_detection(this.shapes.maze.walls);

        //Place the tokens
        this.shapes.tokens.draw(context, program_state);
        // Camera that follows PacMan in a POV-style
        this.move_camera(program_state);

        
        // console.log(this.ghost_positions);

    }
}

