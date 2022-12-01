import { defs, tiny } from './examples/common.js';
const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export default class Maze {
    constructor(material) {
        //2x2x2 cube
        this.wall = new defs.Cube;
        this.material = material;

        this.walls = [];
    }

    draw(context, program_state) {
        // Place the walls
        // left
        let model_transform = Mat4.identity().times(Mat4.translation(0,8,0));
        for (let i = 0; i < 25; i += 1) {
            this.wall.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0, 2, 0))

            this.walls.push(model_transform);
        }

        //right
        model_transform = Mat4.identity().times(Mat4.translation(36,8,0))
        for (let i = 0; i < 25; i += 1) {
            this.wall.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0, 2, 0))

            this.walls.push(model_transform);
        }

        //bottom
        model_transform = Mat4.identity().times(Mat4.translation(2,8,0));
        for (let i = 0; i < 17; i += 1) {
            this.wall.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(2, 0, 0))

            this.walls.push(model_transform);
        }

        //top
        model_transform = Mat4.identity().times(Mat4.translation(2, 28*2, 0));
        for (let i = 0; i < 17;i += 1) {
            this.wall.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(2, 0, 0))

            this.walls.push(model_transform);
        }

        // first layer
        model_transform = Mat4.identity().times(Mat4.translation(4, 50, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2, 0, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, 2, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2, 0, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(6, 0, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2, 0, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2, 0, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2, 0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2, 0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(8,4,0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0 ,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        //second layer
        model_transform = Mat4.identity().times(Mat4.translation(4, 46, 0))
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = Mat4.identity().times(Mat4.translation(10, 46, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0, -2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,6, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,4, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,-2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,8, 0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,-4,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-8,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-10,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(10,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,-6,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,-6,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(6,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(6,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,4,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-4,-2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(0,2,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-6,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);

        model_transform = model_transform.times(Mat4.translation(-2,0,0));
        this.wall.draw(context, program_state, model_transform, this.material);
        this.walls.push(model_transform);
    }
}