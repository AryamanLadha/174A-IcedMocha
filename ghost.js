import { defs, tiny } from './examples/common.js';
import Actor from "./actor.js"

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export default class Ghost extends Actor {
    constructor() {
        const info = {
            shape: new defs.Subdivision_Sphere(4),
            material: new Material(new defs.Phong_Shader(),
                { ambient: 0.4, diffusivity: 0.8, color: hex_color("#fac91a") }),
        }
        super(info, Mat4.identity(), direction, speed);
    }
}