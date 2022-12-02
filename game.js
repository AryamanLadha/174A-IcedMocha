import { defs, tiny } from './examples/common.js';
import {Text_Line} from './examples/text-demo.js';

import Maze from "./maze.js"
import PacMan from "./pacman.js";
import Ghost from "./ghost.js";
import Gouraud_Shader from "./gourad-shader.js"
import Tokens from "./tokens.js";
const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

export class Game extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        this.speed = 0.05;
        this.pacman_scale = Mat4.identity().times(Mat4.scale(1, 1, 1));
        const initPosition = Mat4.identity().times(Mat4.translation(18, 28, 0)).times(this.pacman_scale);
        this.attached = false;

        this.score = 0;

        this.ghost_scale = Mat4.identity().times(Mat4.scale(0.6, 0.6, 0.6));
        const opening = Mat4.identity().times(Mat4.translation(18, 38, 0)).times(this.ghost_scale);
        const ghost_initPosition1 = Mat4.identity().times(Mat4.translation(17, 34, 0)).times(this.ghost_scale);
        const ghost_initPosition2 = Mat4.identity().times(Mat4.translation(17, 32, 0)).times(this.ghost_scale);
        const ghost_initPosition3 = Mat4.identity().times(Mat4.translation(19, 34, 0)).times(this.ghost_scale);
        const ghost_initPosition4 = Mat4.identity().times(Mat4.translation(19, 32, 0)).times(this.ghost_scale);
        
        const texture = new defs.Textured_Phong(1);

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            text: new Text_Line(35),
            square: new defs.Square(),
            tokens: new Tokens(),
            maze: new Maze(),
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

            endgame: new Material(texture, {
                ambient: 1, diffusivity: 0, specularity: 0
                // change texture to something else
            }),
            text_image: new Material(texture, {
                ambient: 1, diffusivity: 0, specularity: 0,
                texture: new Texture("assets/text.png")
            })

        }

        this.initial_camera_location = Mat4.look_at(vec3(19, 30, 70), vec3(19, 30, 0), vec3(0, 50, 0));
        this.init = true;
        this.ghost_inits = [ghost_initPosition1, ghost_initPosition2, ghost_initPosition3, ghost_initPosition4];
        this.ghost_positions = [this.shapes.ghost1.position, this.shapes.ghost2.position, this.shapes.ghost3.position, this.shapes.ghost4.position];
        this.opening = opening;
        this.powerup_timer = 0;

    }

    // Going up can mean different things based on the direction you are currently moving in.
    handleUp(){
        if (!this.attached){
            this.shapes.pacman.direction = 'w';
            return;
        }
        const direction = this.shapes.pacman.direction === 'z' ? this.shapes.pacman.prev_direction : this.shapes.pacman.direction
        switch(direction){
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
        const direction = this.shapes.pacman.direction === 'z' ? this.shapes.pacman.prev_direction : this.shapes.pacman.direction
        switch(direction){
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
        const direction = this.shapes.pacman.direction === 'z' ? this.shapes.pacman.prev_direction : this.shapes.pacman.direction
        switch(direction){
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
        const direction = this.shapes.pacman.direction === 'z' ? this.shapes.pacman.prev_direction : this.shapes.pacman.direction
        switch(direction){
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
        const direction = this.shapes.pacman.direction === 'z' ? this.shapes.pacman.prev_direction : this.shapes.pacman.direction
        switch (direction) {
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
            program_state.set_camera(desired);
        } else{
            let desired = this.initial_camera_location;
            desired = desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, blending_factor));
            program_state.set_camera(desired);
        }

    }

    // Pacman eats the ghosts
    pacman_eats_ghost_collision_detection(){
        let pacman_x = this.shapes.pacman.position[0][3];
        let pacman_y = this.shapes.pacman.position[1][3];

        let dir;

        for (let i = 0; i < this.ghost_positions.length; i++){
            let ghost_x = this.ghost_positions[i][0][3];
            let ghost_y = this.ghost_positions[i][1][3];

            let y_collision = false;
            let x_collision = false;

            if (Math.abs(pacman_y - ghost_y) < 2 && (pacman_x === ghost_x) && (this.shapes.pacman.direction == "w" || this.shapes.pacman.direction == "s" || this.shapes.pacman.direction == "z"))
                y_collision = true;
            else if (Math.abs(pacman_x - ghost_x)<2 && (pacman_y === ghost_y) && (this.shapes.pacman.direction == "a" || this.shapes.pacman.direction == "d" || this.shapes.pacman.direction == "z"))
                x_collision = true;

            if (y_collision || x_collision){
                this.score += 100;
                dir =  Math.random() >= 0.5 ? 3 : 4;
                switch (i){
                    case 0:
                        this.shapes.ghost1.position = this.opening;
                        this.shapes.ghost1.dir = dir;
                        break;
                    case 1:
                        this.shapes.ghost2.position = this.opening;
                        this.shapes.ghost2.dir = dir;
                        break;
                    case 2:
                        this.shapes.ghost3.position = this.opening;
                        this.shapes.ghost3.dir = dir;
                        break;
                    case 3:
                        this.shapes.ghost4.position = this.opening;
                        this.shapes.ghost4.dir = dir;
                        break;
                }
                x_collision = false;
                y_collision = false;
            }
        }
    }

    // Ghosts eat pacman
    ghost_eat_pacman_collision_detection(context, program_state){
        let pacman_x = this.shapes.pacman.position[0][3];
        let pacman_y = this.shapes.pacman.position[1][3];

        let dir;

        for (let i = 0; i < this.ghost_positions.length; i++){
            let ghost_x = this.ghost_positions[i][0][3];
            let ghost_y = this.ghost_positions[i][1][3];

            let y_collision = false;
            let x_collision = false;

            if (Math.abs(pacman_y - ghost_y) < 2 && (pacman_x === ghost_x) && (this.shapes.pacman.direction == "w" || this.shapes.pacman.direction == "s" || this.shapes.pacman.direction == "z"))
                y_collision = true;
            else if (Math.abs(pacman_x - ghost_x)<2 && (pacman_y === ghost_y) && (this.shapes.pacman.direction == "a" || this.shapes.pacman.direction == "d" || this.shapes.pacman.direction == "z"))
                x_collision = true;

            if (y_collision || x_collision){
                console.log("GAME OVER");
                x_collision = false;
                y_collision = false;
                return true;
            }
        }
    }

    // Pacman eats tokens and powerups
    pacman_eats_token_collision_detection(context, program_state, all_tokens, score=10){
        let pacman_x = this.shapes.pacman.position[0][3];
        let pacman_y = this.shapes.pacman.position[1][3];

        let dir;

        for (let i = 0; i < all_tokens.length; i++){
            let token_x = all_tokens[i][0][3];
            let token_y = all_tokens[i][1][3];

            let y_collision = false;
            let x_collision = false;

            if (Math.abs(pacman_y - token_y) < 1 && (pacman_x === token_x) && (this.shapes.pacman.direction == "w" || this.shapes.pacman.direction == "s" || this.shapes.pacman.direction == "z"))
                y_collision = true;
            else if (Math.abs(pacman_x - token_x)<1 && (pacman_y === token_y) && (this.shapes.pacman.direction == "a" || this.shapes.pacman.direction == "d" || this.shapes.pacman.direction == "z"))
                x_collision = true;

            if (y_collision || x_collision){
                this.score += score;
                all_tokens.splice(i,1);
                x_collision = false;
                y_collision = false;
                return true;
            }
        }
    }

    end_game(context, program_state){
        let score_transform = program_state.camera_transform.times(Mat4.translation(4,4,-11)).times(Mat4.scale(0.2, 0.2, 0.2));
        let game_over;

        // pacman died
        if (this.shapes.tokens.tokens.length == 0 && this.shapes.maze.walls.length == 0){
            program_state.set_camera(this.initial_camera_location);
            this.shapes.ghost1.position = Mat4.identity().times(Mat4.translation(-5,-5, 0)).times(this.ghost_scale);
            this.shapes.ghost2.position = Mat4.identity().times(Mat4.translation(-5,-5, 0)).times(this.ghost_scale);
            this.shapes.ghost3.position = Mat4.identity().times(Mat4.translation(-5,-5, 0)).times(this.ghost_scale);
            this.shapes.ghost4.position = Mat4.identity().times(Mat4.translation(-5,-5, 0)).times(this.ghost_scale);
            this.shapes.pacman.position = Mat4.identity().times(Mat4.translation(-10,-10, 0)).times(this.pacman_scale);
            score_transform = program_state.camera_transform.times(Mat4.translation(-1.75,0,-10)).times(Mat4.scale(0.2, 0.2, 0.2));
            game_over = program_state.camera_transform.times(Mat4.translation(-2.75,1,-10)).times(Mat4.scale(0.2, 0.2, 0.2));
            this.show_text(context, program_state, game_over, "GAME OVER - YOU LOST!")
        }

        this.show_text(context, program_state, score_transform, "Score: "+String(this.score).padStart(5,'0'));
    }

    show_text(context, program_state, model_transform, str){
        const multi_line_string = str.split('\n');
        for (let line of multi_line_string.slice(0, 10)) {
            this.shapes.text.set_string(line, context.context);
            this.shapes.text.draw(context, program_state, model_transform, this.materials.text_image);
            model_transform.post_multiply(Mat4.translation(0, -2, 0));
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
        this.shapes.maze.render(context, program_state);

        // Place the tokens
        this.shapes.tokens.render(context, program_state);

        // Place score and end game check  
        this.end_game(context, program_state);


        // Place one ghost
        const white = hex_color("#FFFFFF");
        this.shapes.ghost1.draw(context, program_state, this.materials.test.override({ color: white }));
        this.shapes.ghost2.draw(context, program_state, this.materials.test.override({ color: white }));
        this.shapes.ghost3.draw(context, program_state, this.materials.test.override({ color: white }));
        this.shapes.ghost4.draw(context, program_state, this.materials.test.override({ color: white }));

        // Move ghosts out of pen
        if (this.init){
            this.shapes.ghost1.init_move(this);
            this.shapes.ghost2.init_move(this);
            this.shapes.ghost3.init_move(this);
            this.shapes.ghost4.init_move(this);
        } 
 
        else{
            // Ghosts vs walls collisions
            this.shapes.ghost1.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[0] = this.shapes.ghost1.position;
            
            this.shapes.ghost2.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[1] = this.shapes.ghost2.position;

            this.shapes.ghost3.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[2] = this.shapes.ghost3.position;

            this.shapes.ghost4.collision_detection(this.shapes.maze.walls);
            this.ghost_positions[3] = this.shapes.ghost4.position;

            // Pacman vs tokens collisions
            this.pacman_eats_token_collision_detection(context, program_state, this.shapes.tokens.tokens);

            // Pacman vs powerups collisions
            if (this.pacman_eats_token_collision_detection(context, program_state, this.shapes.tokens.powerups, 50)  ){
                // console.log("ate a powerup")
                this.shapes.pacman.speed = 0.15;
                this.powerup_timer = t;
            }

            if ((this.powerup_timer!== 0) && (t - this.powerup_timer < 20)){
                this.pacman_eats_ghost_collision_detection(this.ghost_positions);
            } 
            else if((this.powerup_timer!== 0) && (t - this.powerup_timer > 20)) {
                this.shapes.pacman.speed = this.speed;
                this.powerup_timer =0;
            }

            else if(this.powerup_timer === 0){
                // If pacman dies, game ends, take everything off the board
                if (this.ghost_eat_pacman_collision_detection(context, program_state, this.ghost_positions)){
                    this.shapes.tokens.tokens = [];
                    this.shapes.tokens.powerups = [];
                    this.shapes.maze.walls = [];
                }
            }



        }
       

        // Place pacman and check for pacman vs wall collisions
        const yellow = hex_color("#fac91a");
        this.shapes.pacman.collision_detection(this.shapes.maze.walls);
        this.shapes.pacman.draw(context, program_state, this.materials.test.override({ color: yellow }));

        // Camera that follows PacMan in a POV-style
        this.move_camera(program_state);
        


    }
}

