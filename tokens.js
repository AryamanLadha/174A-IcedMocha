
import { defs, tiny } from './examples/common.js';
import Gouraud_Shader from "./gourad-shader.js"

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export default class Tokens{
    constructor(){
        //an array of spheres
        // The diameter of each sphere is two units, i.e they fit perfectly in one of our slots.
        // If we scale them down to diameter one unit, then the amount of separation needed is 0.5
        this.rows = 29;
        this.cols = 26;
        this.factor = 0.5
        this.material =  new Material(
            new Gouraud_Shader(),
            { ambient: 1, color: hex_color("#d2c1b0") }
            );
        this.token = new defs.Subdivision_Sphere(4);
    }

    draw(context, program_state){
        // Place the tokens
            let model_transform = Mat4.identity().times(Mat4.translation(2,10,0)).times(Mat4.scale(this.factor, this.factor, this.factor))
            for(let i = 0; i<17; i+=1){
                this.token.draw(context, program_state, model_transform, this.material);
                model_transform = model_transform.times(Mat4.translation(4,0,0));
            }
            model_transform = Mat4.identity().times(Mat4.translation(2,12,0)).times(Mat4.scale(this.factor, this.factor, this.factor));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            for(let i=0; i<20;i+=1){
                model_transform = model_transform.times(Mat4.translation(0,4,0));
                this.token.draw(context, program_state, model_transform, this.material);
            }
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-8,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-24,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-16,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-8,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(12,8,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(8,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(-4,-4,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,8,0));
            this.token.draw(context, program_state, model_transform, this.material);
            


        };
}