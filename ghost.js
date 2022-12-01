import { defs, tiny } from './examples/common.js';
import Actor from "./actor.js"
import { Shape_From_File } from './examples/obj-file-demo.js';

const {Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene} = tiny;

// const {vec3, vec4, vec, color, Mat4, Light, Shape, hex_color, Material, Shader, Texture, Scene} = tiny;


export class Shape_From_File_2 extends Shape {                                   // **Shape_From_File** is a versatile standalone Shape that imports
                                                                               // all its arrays' data from an .obj 3D model file.
    constructor(filename) {
        super("position", "normal", "texture_coord");
        // Begin downloading the mesh. Once that completes, return
        // control to our parse_into_mesh function.
        this.load_file(filename);
    }

    load_file(filename) {                             // Request the external file and wait for it to load.
        // Failure mode:  Loads an empty shape.
        return fetch(filename)
            .then(response => {
                if (response.ok) return Promise.resolve(response.text())
                else return Promise.reject(response.status)
            })
            .then(obj_file_contents => this.parse_into_mesh(obj_file_contents))
            .catch(error => {
                this.copy_onto_graphics_card(this.gl);
            })
    }

    parse_into_mesh(data) {                           // Adapted from the "webgl-obj-loader.js" library found online:
        var verts = [], vertNormals = [], textures = [], unpacked = {};

        unpacked.verts = [];
        unpacked.norms = [];
        unpacked.textures = [];
        unpacked.hashindices = {};
        unpacked.indices = [];
        unpacked.index = 0;

        var lines = data.split('\n');

        var VERTEX_RE = /^v\s/;
        var NORMAL_RE = /^vn\s/;
        var TEXTURE_RE = /^vt\s/;
        var FACE_RE = /^f\s/;
        var WHITESPACE_RE = /\s+/;

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            var elements = line.split(WHITESPACE_RE);
            elements.shift();

            if (VERTEX_RE.test(line)) verts.push.apply(verts, elements);
            else if (NORMAL_RE.test(line)) vertNormals.push.apply(vertNormals, elements);
            else if (TEXTURE_RE.test(line)) textures.push.apply(textures, elements);
            else if (FACE_RE.test(line)) {
                var quad = false;
                for (var j = 0, eleLen = elements.length; j < eleLen; j++) {
                    if (j === 3 && !quad) {
                        j = 2;
                        quad = true;
                    }
                    if (elements[j] in unpacked.hashindices)
                        unpacked.indices.push(unpacked.hashindices[elements[j]]);
                    else {
                        var vertex = elements[j].split('/');

                        unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 0]);
                        unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 1]);
                        unpacked.verts.push(+verts[(vertex[0] - 1) * 3 + 2]);

                        if (textures.length) {
                            unpacked.textures.push(+textures[((vertex[1] - 1) || vertex[0]) * 2 + 0]);
                            unpacked.textures.push(+textures[((vertex[1] - 1) || vertex[0]) * 2 + 1]);
                        }

                        unpacked.norms.push(+vertNormals[((vertex[2] - 1) || vertex[0]) * 3 + 0]);
                        unpacked.norms.push(+vertNormals[((vertex[2] - 1) || vertex[0]) * 3 + 1]);
                        unpacked.norms.push(+vertNormals[((vertex[2] - 1) || vertex[0]) * 3 + 2]);

                        unpacked.hashindices[elements[j]] = unpacked.index;
                        unpacked.indices.push(unpacked.index);
                        unpacked.index += 1;
                    }
                    if (j === 3 && quad) unpacked.indices.push(unpacked.hashindices[elements[0]]);
                }
            }
        }
        {
            const {verts, norms, textures} = unpacked;
            for (var j = 0; j < verts.length / 3; j++) {
                this.arrays.position.push(vec3(verts[3 * j], verts[3 * j + 1], verts[3 * j + 2]));
                this.arrays.normal.push(vec3(norms[3 * j], norms[3 * j + 1], norms[3 * j + 2]));
                this.arrays.texture_coord.push(vec(textures[2 * j], textures[2 * j + 1]));
            }
            this.indices = unpacked.indices;
        }
        this.normalize_positions(false);
        this.ready = true;
    }

    draw(context, program_state, model_transform, material) {               // draw(): Same as always for shapes, but cancel all
        // attempts to draw the shape before it loads:
        if (this.ready)
            super.draw(context, program_state, model_transform, material);
    }
}

// (18, 38, 0) translation is top of opening of ghost pen
// Initial : (17, 34, 0)), (17, 32, 0)), (19, 34, 0)), (19, 32, 0))
export default class Ghost extends Actor {
    constructor(speed, initPosition, number) {
        let direction = "d";
        const info = {
            shape: new Shape_From_File_2("assets/ghost.obj"),
            material: new Material(new defs.Phong_Shader(),
                { ambient: 0.4, diffusivity: 0.8, color: hex_color("#fac91a") }),
        }
        super(info, Mat4.identity(), direction, speed);
        this.position = initPosition;
        this.number = number;
    }

    draw(context, program_state, materials) {
        this.info.shape.draw(context, program_state, this.position, materials);
    }

    init_move(){
        let matrix = Mat4.identity();
        // console.log(this.position);
        switch (this.number){
            case 1:
            case 2:
                if (Math.floor(this.position[0][3]) != 18){ 
                    matrix = Mat4.translation(this.speed, 0, 0);
                }
                else if (Math.floor(this.position[1][3]) != 38){
                    matrix = Mat4.translation(0, this.speed, 0);
                }
                else {
                    matrix = Mat4.translation(0, 0, 0);
                }
                break;
            case 3:
            case 4:
                if (Math.ceil(this.position[0][3]) != 18) 
                    matrix = Mat4.translation(-this.speed, 0, 0);
                else if (Math.floor(this.position[1][3]) != 38)
                    matrix = Mat4.translation(0, this.speed, 0);
                else 
                    matrix = Mat4.translation(0, 0, 0);
                break;
            default:
                matrix = Mat4.translation(0,0,0);
        }
        this.position = this.position.times(matrix);
    }

    collision_detection(){
        // test maze block at (18, 40) from (18, 38)
        let maze_x = 18;
        let maze_y = 40;

        let matrix = Mat4.identity();

        let x_loc = this.position[0][3];
        let y_loc = this.position[1][3];

        // collision
        if (Math.abs(y_loc-maze_y) < 2){
            // go right is pos, go left is neg except it doesnt work
            console.log(this.speed);
            matrix = Mat4.translation(-0.1, 0, 0);
            this.position = this.position.times(matrix);
        }
        // else if (Math.abs(x_loc-maze_x) < 2){
        //     // go up
        //     console.log(this.speed);
        //     matrix = Mat4.translation(0, this.speed, 0);
        //     this.position = this.position.times(matrix);
        // }


    }

    move(program_state){
        let matrix = Mat4.identity();
        let dir;

        let min = Math.ceil(1);
        let max = Math.floor(4);
        
        let bool = false;
        let counter 
        // console.log(Math.floor(program_state.animation_time / 1000));
        if (Math.floor(program_state.animation_time / 1000) % 3 == 0){
            bool = true;
            console.log("now");
        }
        
            // exit;
            // console.log(dir);
        if (bool){
            dir =  Math.floor(Math.random() * (max - min + 1)) + min;
            switch (dir){
                // up
                case 1:
                    // for (let i = 0; i < 10; i++){
                        matrix = Mat4.translation(0, 1, 0);
                        this.position = this.position.times(matrix);
                    // }
                    
                    break;
                // down
                case 2:
                    // for (let i = 0; i < 10; i++){
                        matrix = Mat4.translation(0, -1, 0);
                        this.position = this.position.times(matrix);
                    // }
                    
                    break;
                // left
                case 3:
                    // for (let i = 0; i < 10; i++){
                        matrix = Mat4.translation(-1, 0, 0);
                        this.position = this.position.times(matrix);
                    // }
                    
                    break;
                // right
                case 4:
                //     // for (let i = 0; i < 10; i++){
                        matrix = Mat4.translation(1, 0, 0);
                        this.position = this.position.times(matrix);
                //     // }
                    
                    break;
                default:
                    // matrix = Mat4.translation(1, 1, 0);
                    break;
            }
            // this.position = this.position.times(matrix);
            bool = false;
        }
        
       
        
        // let dir = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        // console.log(dir);
        
        // this.position = this.position.times(matrix);
        
    }


}