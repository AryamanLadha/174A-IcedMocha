import { defs, tiny } from './examples/common.js';
import Maze from "./maze.js"
import PacMan from "./pacman.js";
import Ghost from "./ghost.js";
import Gouraud_Shader from "./gourad-shader.js"

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class Game extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        this.speed = 0.05;

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            token: new defs.Subdivision_Sphere(4),
            maze: new Maze(new Material(new Gouraud_Shader(), { ambient: 1, color: hex_color("#00008B") })),
            pacman: new PacMan(this.speed),
        },
            // *** Materials
            this.materials = {
                test: new Material(new defs.Phong_Shader(),
                    { ambient: 1, diffusivity: .6, color: hex_color("#ffffff") }),
                token: new Material(new Gouraud_Shader(),
                    { ambient: 1, color: hex_color("#d2c1b0") }),
            }

        this.initial_camera_location = Mat4.look_at(vec3(-10, -10, 10), vec3(0, 0, 0), vec3(1, 1, 0));
    }

    make_control_panel() {
        this.key_triggered_button("Up", ["w"], () => { this.shapes.pacman.direction = "w" });
        this.key_triggered_button("Down", ["s"], () => { this.shapes.pacman.direction = "s" });
        this.key_triggered_button("Left", ["a"], () => { this.shapes.pacman.direction = "a" });
        this.key_triggered_button("Right", ["d"], () => { this.shapes.pacman.direction = "d" });
        this.key_triggered_button("Stop", ["z"], () => { this.shapes.pacman.direction = "z" });
    } 

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }


        let model_transform = Mat4.identity().times(Mat4.translation(2,10,0).times(Mat4.scale(0.9,0.9,0.9)));
        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        program_state.projection_transform = Mat4.perspective(Math.PI / 4, context.width / context.height, .1, 1000);

        // TODO: Lighting (Requirement 2)
        const light_position = vec4(0, 5, 5, 1);
        // The parameters of the Light are: position, color, size
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        // Place the maze
        this.shapes.maze.draw(context, program_state);


        // Place pacman
        const yellow = hex_color("#fac91a");
        this.shapes.pacman.draw(context, program_state, model_transform, this.materials.test.override({ color: yellow }));
        this.shapes.pacman.move();

        const rows = 29;
        const cols = 26;
        const factor = 0.1
        const sep = 5;
        // Place the tokens
        for (let r = 0; r < rows; r += 1) {
            for (let c = 0; c < cols; c += 1) {
                let model_transform = Mat4.identity().times(Mat4.scale(factor, factor, factor)).times(Mat4.translation(r * sep, c * sep, 0))
                this.shapes.token.draw(context, program_state, model_transform, this.materials.token)
            }
        };
    }
}