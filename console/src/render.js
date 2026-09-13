import readline from "readline";

export function render(state, ui, func, obj, inputtype = "") {

    console.clear();

    process.stdin.setRawMode(true);

    func(state, ui, obj);

    readline.emitKeypressEvents(process.stdin);

    const handler = (str, key) => {

        switch (key.name.toLowerCase()) {

            case "up":
                console.log(ui.cursor);

                if (ui.cursor - 1 < 0) {
                    ui.cursor = Object.keys(obj).length - 1;
                } else {
                    ui.cursor -= 1;
                }
                break;

            case "down":
                if (ui.cursor + 1 >= Object.keys(obj).length) {
                    ui.cursor = 0;
                } else {
                    ui.cursor += 1;
                }
                break;

            case "q":
                ui.run = false;
                process.stdin.setRawMode(false);
                process.stdin.pause();
                process.stdin.off("keypress", handler);
                return;

            case "space":
                if (inputtype === "multiselect") {
                    ui.run = false;
                    process.stdin.pause();
                    process.stdin.off("keypress", handler);
                    return;
                }

                if (inputtype === "singleselect") {
                    let filt = obj.filter((item) => { return item.selected == true })
                    if (filt.length == 1) {
                        filt[0].selected = false

                    }
                    obj[ui.cursor].selected = true
                }
                break;

            case "return":
                console.log("console log i return");
                process.stdin.off("keypress", handler);
                process.stdin.setRawMode(false);
                if (ui.onSelect) {
                    ui.onSelect();
                    ui.onSelect = null;
                }
                setImmediate(() => ui.onReturn());
                return;
        }

        func(state, ui, obj);
    };

    process.stdin.on("keypress", handler);
}