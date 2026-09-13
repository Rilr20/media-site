import readline from "readline";
import { colours } from "./const.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
export function drawCycleSelect(state, ui, arr) {
    /**
     * vad som ska hända
     *
     * visa 3 alternativ av de 4 som existerar
     * pilen ska alltid vara i mitten
     *
     */
    console.clear()

    const before = ui.cursor - 1 < 0 ? Object.keys(arr).length - 1 : ui.cursor - 1
    const after = ui.cursor + 1 >= Object.keys(arr).length ? 0 : ui.cursor + 1

    const items = [before, ui.cursor, after]


    for (let i = 0; i <= items.length - 1; i++) {
        if (items[i] == ui.cursor) {
            console.log(`-> ${arr[items[i]]}`);
        } else {
            console.log(`   ${arr[items[i]]}`);
        }
    }
    return arr[ui.cursor]
}

export function drawCheckBox(state, ui, obj, source) {
    console.clear()

    console.log("☐");
    console.log("☑");


    // let sourceArr = getSourceItems(obj, source)

}

export function drawRadioButton(state, ui, source) {
    console.clear()

    // console.log("○");
    // console.log("●");
    // console.log(obj);

    source.forEach((item, i) => {
        let  text = "    "
        if (i == ui.cursor) {
            text = "->  "
        }
        if (item.selected) {
            text += `● ${ item.text }`
        } else {
            text += `○ ${item.text}`

        }
        console.log(text)
    });
}

export function drawCycleSelectColour(state, ui) {
    console.clear()
    let diff = 3 - colours[ui.cursor].text.length 
    console.log("↑")
    console.log(`${colours[ui.cursor].colour}${" ".repeat(diff)}${colours[ui.cursor].text}\x1b[0m`);
    console.log("↓")
}

export function getSourceItems(obj, source) {


    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key, item]) => item.source === source)
            .map(([key, item]) => [
                key,
                { ...item, selected: false }
            ])
    );
}

export function drawTextInput(state, ui, question, nullable) {
    console.clear()
    rl.question(question + ": ", (answer) => {
        if (!nullable && answer === "") {
            drawTextInput(state, ui, question, nullable)
            return
        }
        ui.text = answer
        if (ui.onSelect) {
            ui.onSelect()
            ui.onSelect = null
        }
        ui.onReturn()
    })
}