import readline from "readline";
import { draw } from "./src/draw.js";
import { state, ui, } from "./src/const.js";
import dotenv from 'dotenv';
dotenv.config();


(function main() {

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    ui.onReturn = () => draw(state, ui)
    ui.onReturn()    
    // console.log("bye bye i guess");
    // console.log(state);
    // console.log("state again!");
    
    
    
})()

