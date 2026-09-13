import { mediatypes, sources, gamegenres, ui, colours } from "./const.js";
import { render } from "./render.js"
import { drawCheckBox, drawCycleSelect, drawRadioButton, drawTextInput, getSourceItems, drawCycleSelectColour } from './inputs.js';
import { saveReview } from "./api.js";

function resetAndIncrement(input = "") {
    ui.cursor = 0
    ui.text = 0
    ui.field = input === "" ? ui.field + 1 : input
    ui.onSelect = undefined
}

export function draw(state, ui) {

    switch (ui.field) {
        case 1: // Media types
            //TODO: NOT NULL
            console.log("I am here");

            ui.onSelect = () => {
                state.media_type = mediatypes[ui.cursor]
                resetAndIncrement()
            }

            render(state, ui, drawCycleSelect, mediatypes)
            break;
        case 2: // text title
            ui.onSelect = () => {
                state.title = ui.text
                resetAndIncrement()
            }
            drawTextInput(state, ui, "Title", false)
            break

        case 3: // text creator
            ui.onSelect = () => {
                state.creator = ui.text
                resetAndIncrement()
            }
            drawTextInput(state, ui, "Creator", false)
            break

        case 4: // text publisher
            ui.onSelect = () => {
                state.publisher = ui.text

                if (state.media_type == "game") {
                    resetAndIncrement(999)
                }
                else {
                    resetAndIncrement()
                }
            }
            drawTextInput(state, ui, "Publisher", true)
            break
        case 5: // number year
            ui.onSelect = () => {
                if (Number(ui.text)) {
                    state.year = ui.text
                    resetAndIncrement()
                }
            }
            drawTextInput(state, ui, "Year", false)
            break
        case 6: // Edition
            ui.onSelect = () => {
                state.edition = ui.text === "" ? null : ui.text
                resetAndIncrement()
            }
            drawTextInput(state, ui, "Edition", true)
            break
        case 7: // number orig_year
            if (state.edition == null) {
                resetAndIncrement()
                draw(state,ui)
                break
            }
            ui.onSelect = () => {
                if (Number(ui.text)) {
                    state.orig_year = ui.text
                    resetAndIncrement()
                }
            }
            drawTextInput(state, ui, "Original Release Year")
            break
        case 8: // review text
            ui.onSelect = () => {
                state.review_text = ui.text
                resetAndIncrement()
            }
            drawTextInput(state, ui, "Review Text", false)
            break
        case 9: // source
            //TODO: NOT NULL
            let obj = Object.values(getSourceItems(sources, state.media_type));
            obj[0].selected = true
            ui.onSelect = () => {
                const objselect = Object.values(obj).filter(item => item.selected);

                if (objselect.length === 1) {
                    state.source = objselect[0].text;
                    resetAndIncrement();
                }
            }

            render(state, ui, drawRadioButton, obj, "singleselect")
            break
        case 10: //base score
            //tier
            //TODO: NOT NULL on score
            ui.cursor = colours.length - 1
            ui.onSelect = () => {
                let split = colours[ui.cursor].text.split("")
                state.base_score = split.length == 1 ? split[0] : split[1]
                state.tier = split.length == 2 ? split[1] : ""
                resetAndIncrement()
            }
            render(state, ui, drawCycleSelectColour, colours, "score")
            break
        case 11: //select 1 standout incosistent divisive
            let sourceArr = [
                { "text": "  - Nothing", selected: false },
                { "text": "* - Standout", selected: false },
                { "text": "~ - Inconsistent", selected: false },
                { "text": "? - Divisive", selected: false },
            ]
            sourceArr[0].selected = true
            ui.onSelect = () => {
                state.standout = sourceArr[0].selected
                state.inconsistent = sourceArr[1].selected
                state.divisive = sourceArr[2].selected
                resetAndIncrement()
            }

            render(state, ui, drawRadioButton, sourceArr, "singleselect")
            break
        case 12: //genre complicated cause of games
            //TODO: NOT NULL
            if (state.media_type == "game") {
                render(state, ui, drawCycleSelect, gamegenres)

                state.genre = gamegenres[ui.cursor]
                resetAndIncrement(888)
            }
            else {
                ui.onSelect = () => {
                    state.genre = ui.text
                    resetAndIncrement("done")
                }
                drawTextInput(state, ui, `${state.media_type} genre`)
            }
            break

        case 888: // sub genre
            ui.onSelect = () => {
                state.sub_genre = ui.text
                resetAndIncrement("done")
            }
            drawTextInput(state, ui, `${state.media_type} sub genre`)
            break
        case 999:
            let indieGame = [
                { text: "Not an indie game", selected: false },
                { text: "Indie game", selected: false }
            ]
            indieGame[0].selected = true
            ui.onSelect = () => {
                const selected = indieGame.filter(item => item.selected)

                if (selected.length === 1) {
                    state.indie_game = selected[0].text === "Indie game"
                    resetAndIncrement(5)
                }
            }

            render(state, ui, drawRadioButton, indieGame, "singleselect")
            break
        case 889:
        case 13:
        case "done":
            ui.run = false
            console.log(state);

            saveReview(state).finally(() => {
                process.stdin.setRawMode(false)
                process.stdin.pause()
                process.exit(0)
            })
            break
        case 0:
            ui.onSelect = () => {
                const parts = ui.text.split(",").map(x => x.trim())
                if (parts.length !== 2) return

                const [year, quarter] = parts
                const quarterNumber = Number(quarter.replace("q", "").replace("Q", ""))

                if (year.length !== 4 || !Number(year)) return
                if (!Number.isInteger(quarterNumber) || quarterNumber < 1 || quarterNumber > 5) return

                state.review_year = Number(year)
                state.review_quarter = quarterNumber

                resetAndIncrement()
            }


            drawTextInput(state, ui, "Review year and quarter (YYYY, Q)", false)
            break;
    }

}