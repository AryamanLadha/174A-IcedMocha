
import { defs, tiny } from './examples/common.js';
import Gouraud_Shader from "./gourad-shader.js";

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

        //store location of tokens
        this.tokenStored = false;
        this.tokens = [];

        // Place the tokens
        let model_transform = Mat4.identity().times(Mat4.translation(2,10,0)).times(Mat4.scale(this.factor, this.factor, this.factor))
        for(let i = 0; i<17; i+=1){
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = Mat4.identity().times(Mat4.translation(2,12,0)).times(Mat4.scale(this.factor, this.factor, this.factor));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        for(let i=0; i<20;i+=1){
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-8,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-24,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-16,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-8,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(12,8,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(8,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,8,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,8,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,-4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-8,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-4,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(4,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        for(let i=0; i<6; i+=1){
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }
        for(let i=0; i<6; i+=1){
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }
        for(let i=0; i<6; i+=1){
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }
        model_transform = model_transform.times(Mat4.translation(4,12,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-32,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(36,0,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        for(let i=0; i<3; i+=1){
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = model_transform.times(Mat4.translation(-12,-16,0));

        for(let i=0; i<3; i+=1){
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = model_transform.times(Mat4.translation(0,8,0));
        for(let i=0; i<11; i+=1){
            // this.token.draw(context, program_state, model_transform, this.material);
            model_transform = model_transform.times(Mat4.translation(0,4,0));
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = model_transform.times(Mat4.translation(0,-4,0))
        for(let i=0; i<3; i+=1){
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }
        for(let i=0; i<3; i+=1){
            model_transform = model_transform.times(Mat4.translation(0,-4,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        for(let i=0; i<2; i+=1){
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = model_transform.times(Mat4.translation(-4,-8,0));
        for(let i=0; i<3; i+=1){
            model_transform = model_transform.times(Mat4.translation(4,0,0));
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        model_transform = model_transform.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        model_transform = model_transform.times(Mat4.translation(-12,4,0));
        // this.token.draw(context, program_state, model_transform, this.material);
        if (!this.tokenstored) this.tokens.push(model_transform)

        let m1, m2;
        for(let i=0; i<9; i+=1){
            model_transform = model_transform.times(Mat4.translation(-4,0,0));
            if(i == 3) {m1 = model_transform};
            if(i == 5) {m2 = model_transform};
            // this.token.draw(context, program_state, model_transform, this.material);
            if (!this.tokenstored) this.tokens.push(model_transform)
        }

        for(let i=0; i<3; i+=1){
            m1 = m1.times(Mat4.translation(0,4,0));
            m2 = m2.times(Mat4.translation(0,4,0));
            // this.token.draw(context, program_state, m1, this.material);
            // this.token.draw(context, program_state, m2, this.material);

            if (!this.tokenstored) this.tokens.push(m1)
            if (!this.tokenstored) this.tokens.push(m2)
        }

        for(let i=0; i<3; i+=1){
            m1 = m1.times(Mat4.translation(4,0,0));
            m2 = m2.times(Mat4.translation(-4,0,0));
            
            // this.token.draw(context, program_state, m1, this.material);
            // this.token.draw(context, program_state, m2, this.material);

            if (!this.tokenstored) this.tokens.push(m1)
            if (!this.tokenstored) this.tokens.push(m2)
        }

        m1 = m1.times(Mat4.translation(-4,-16,0));
        m2 = m2.times(Mat4.translation(4,-16,0));
        for(let i=0; i<3; i+=1){
            if (!this.tokenstored) this.tokens.push(m1)
            if (!this.tokenstored) this.tokens.push(m2)
            // this.token.draw(context, program_state, m1, this.material);
            // this.token.draw(context, program_state, m2, this.material);
            m1 = m1.times(Mat4.translation(-4,0,0));
            m2 = m2.times(Mat4.translation(4,0,0));

            if (!this.tokenstored) this.tokens.push(m1)
            if (!this.tokenstored) this.tokens.push(m2)
        }

        m1 = m1.times(Mat4.translation(4,-16,0));
        m2 = m2.times(Mat4.translation(-4,-16,0));

        for(let i=0; i<2; i+=1){
            m1 = m1.times(Mat4.translation(0,4,0));
            m2 = m2.times(Mat4.translation(0,4,0));
            // this.token.draw(context, program_state, m1, this.material);
            // this.token.draw(context, program_state, m2, this.material);

            if (!this.tokenstored) this.tokens.push(m1)
            if (!this.tokenstored) this.tokens.push(m2)
        }

        for(let i=0; i<2; i+=1){
            m1 = m1.times(Mat4.translation(4,0,0));
            m2 = m2.times(Mat4.translation(-4,0,0));
            // this.token.draw(context, program_state, m1, this.material);
            // this.token.draw(context, program_state, m2, this.material);

            if (!this.tokenstored) this.tokens.push(m1)
            if (!this.tokenstored) this.tokens.push(m2)
        }

        m1 = m1.times(Mat4.translation(0,4,0));
        m2 = m2.times(Mat4.translation(0,4,0));
        // this.token.draw(context, program_state, m1, this.material);
        // this.token.draw(context, program_state, m2, this.material);
        if (!this.tokenstored) this.tokens.push(m1)
        if (!this.tokenstored) this.tokens.push(m2)

        m1 = m1.times(Mat4.translation(-12,4,0));
        // this.token.draw(context, program_state, m1, this.material);
        if (!this.tokenstored) this.tokens.push(m1)

        this.tokenstored = true;

    };

    render(context, program_state){
        // console.log(this.tokens.length);
        for (let i = 0; i < this.tokens.length; i++){
            this.token.draw(context, program_state, this.tokens[i], this.material);
        }
    }
}