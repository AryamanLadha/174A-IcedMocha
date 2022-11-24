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
        this.pacman_scale = Mat4.identity().times(Mat4.scale(0.9, 0.9, 0.9));
        const initPosition = Mat4.identity().times(Mat4.translation(2, 10, 0)).times(this.pacman_scale);

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            tokens: new Tokens(),
            maze: new Maze(new Material(new Gouraud_Shader(), { ambient: 1, color: hex_color("#00008B") })),
            pacman: new PacMan(this.speed, initPosition),
        },
            // *** Materials
            this.materials = {
                test: new Material(new defs.Phong_Shader(),
                    { ambient: 1, diffusivity: .6, color: hex_color("#ffffff") }),
            }

        this.initial_camera_location = Mat4.look_at(vec3(-10, -10, 10), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    make_control_panel() {
        this.key_triggered_button("Up", ["w"], () => { this.shapes.pacman.direction = "w" });
        this.key_triggered_button("Down", ["s"], () => { this.shapes.pacman.direction = "s" });
        this.key_triggered_button("Left", ["a"], () => { this.shapes.pacman.direction = "a" });
        this.key_triggered_button("Right", ["d"], () => { this.shapes.pacman.direction = "d" });
        this.key_triggered_button("Stop", ["z"], () => { this.shapes.pacman.direction = "z" });
        this.new_line();
        this.key_triggered_button("Bird's Eye View", ["b"], () => this.attached = () => null);
        this.key_triggered_button("Pac-Man View", ["c"], () => this.attached = () => this.shapes.pacman.direction);
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

        if (this.attached && this.attached() !== null) {
            desired = this.pacman_scale.times(this.shapes.pacman.position).times(matrix);
            desired = Mat4.inverse(desired);
            let blending_factor = 0.1;
            desired = desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, blending_factor));
            if (this.shapes.pacman.direction !== 'z')
                program_state.set_camera(desired);
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


        // Place pacman
        const yellow = hex_color("#fac91a");
        this.shapes.pacman.draw(context, program_state, this.materials.test.override({ color: yellow }));
        this.shapes.pacman.move();

        //Place the tokens
        this.shapes.tokens.draw(context, program_state);
        // Camera that follows PacMan in a POV-style
        this.move_camera(program_state);

    }
}