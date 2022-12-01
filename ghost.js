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
        let direction = "w";
        const info = {
            shape: new Shape_From_File_2("assets/ghost.obj"),
            material: new Material(new defs.Phong_Shader(),
                { ambient: 0.4, diffusivity: 0.8, color: hex_color("#fac91a") }),
        }
        super(info, Mat4.identity(), direction, speed);
        this.position = initPosition;
        this.number = number;
        this.direction = "horizontal";
        this.hor_collision = false;
        this.vert_collision = false;
        this.dir = 1;
        
    }

    draw(context, program_state, materials) {
        // console.log(`${this.position[0][3]}, ${this.position[1][3]}`)
        this.info.shape.draw(context, program_state, this.position, materials);
    }

    init_move(game){
        let matrix = Mat4.identity();
        
        switch (this.number){
            case 1:
            case 2:
                // console.log("case 1")
                if (Math.floor(this.position[0][3]) != 18){ 
                    matrix = Mat4.translation(this.speed, 0, 0);
                }
                else if (Math.floor(this.position[1][3]) != 38){
                    matrix = Mat4.translation(0, this.speed, 0);
                }
                else if((Math.floor(this.position[0][3]) === 18) && (Math.floor(this.position[1][3]) === 38)){
                    game.init = false;
                }
                else {
                    matrix = Mat4.translation(0, 0, 0);
                }
                break;
            case 3:
            case 4:
                if (Math.ceil(this.position[0][3]) != 18) {
                    // console.log("case 2.1")
                    matrix = Mat4.translation(-this.speed, 0, 0);
                }
                else if (Math.floor(this.position[1][3]) != 38){
                    // console.log("case 2.2")
                    matrix = Mat4.translation(0, this.speed, 0);
                }
                else {
                    matrix = Mat4.translation(0, 0, 0);
                }
                break;
            default:
                matrix = Mat4.translation(0,0,0);
        }
        this.position = this.position.times(matrix);
    }

    collision_detection(all_mazes){
        // test maze block at (18, 40) from (18, 38)
        // (26, 38) for left and right
        // let maze_x = 18;
        // let maze_y = 40;
        // let maze_x2 = 26;
        // let maze_y2 = 38;
        let detected = false;

        for (let i = 0; i < all_mazes.length; i++){
            let matrix = Mat4.identity();

            let maze_x = all_mazes[i][0];
            let maze_y = all_mazes[i][1];
            //console.log(`Maze location is: ${maze_x}, ${maze_y}`)

            let x_loc = this.position[0][3];
            let y_loc = this.position[1][3];

            let dir;

            // console.log(this.direction);
            // collision from down to up
            if (Math.abs(y_loc-maze_y) < 2 && (x_loc === maze_x) && (this.dir === 1 || this.dir === 2)){
                // go right is pos, go left is neg except it doesnt work
                // console.log(this.speed);
                // this.hor_collsion = true;
                dir =  Math.random() >= 0.5 ? 3 : 4;
                // console.log(`Direction to move is: ${dir}`)
                this.dir = dir;
                // console.log('Chose a random direction to move in' + this.dir);
                this.move(this.dir)
                detected = true;
                break;
            }

            else if(Math.abs(x_loc-maze_x)<2 && (y_loc === maze_y) && (this.dir == 3 || this.dir == 4)){
                // this.hor_collsion = true;
                dir =  Math.random() >= 0.5 ? 1 : 2;
                // console.log(`Direction to move is: ${dir}`)
                this.dir = dir;
                this.move(this.dir)
                detected = true;
                break;
                // console.log('Chose a random direction to move in');
            }

        }
        if(!detected)
            this.move(this.dir)
    }

    move(dir){
        let matrix = Mat4.identity();
        const y = this.position[1][3];
        const x = this.position[0][3];
        const adjusted_y = ((Math.floor(y)%2) === 1) ? Math.floor(y)+1 : Math.floor(y)
        const adjusted_x = ((Math.floor(x)%2) === 1) ? Math.floor(x)+1 : Math.floor(x)
        switch (dir){
            // up
            case 1:
                matrix = Mat4.translation(0, this.speed, 0);
                this.position = this.position.times(matrix);
                break;

            // down
            case 2:
                matrix = Mat4.translation(0, -this.speed, 0);
                this.position = this.position.times(matrix);
                break;

            // left
            case 3:
                matrix = Mat4.translation(-this.speed, 0, 0);
                this.position = this.position.times(matrix);
                break;

            // right
            case 4:
                matrix = Mat4.translation(this.speed, 0, 0);
                this.position = this.position.times(matrix);
                break;

            default:
                break;
        }

        if(this.dir === 3 || this.dir === 4){
            // console.log('adjusting y');
            this.position[1][3] = adjusted_y
        }
        else if(this.dir === 1 || this.dir === 2){
            // console.log('adjusting x');
            this.position[0][3] = adjusted_x
        }
    }


}