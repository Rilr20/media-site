import { mediatypes, sources, gamegenres, colours } from "./const.js";
import { render } from "./render.js";
import { drawCycleSelect, drawRadioButton, drawTextInput, getSourceItems, drawCycleSelectColour } from './inputs.js';
import { saveReview } from "./api.js";
import { resetAndIncrement, CreatorEnum, PublisherEnum, draw } from "./draw.js";

export function drawMediaType(state, ui) {
    //TODO: NOT NULL
    console.log("I am here");

    ui.onSelect = () => {
        state.media_type = mediatypes[ui.cursor]
        resetAndIncrement()
    }

    render(state, ui, drawCycleSelect, mediatypes)
}

export function drawTitle(state, ui) {
    ui.onSelect = () => {
        state.title = ui.text
        resetAndIncrement()
    }
    drawTextInput(state, ui, "Title", false)
}

export function drawCreator(state, ui) {
    ui.onSelect = () => {
        state.creator = ui.text
        resetAndIncrement()
    }
    const creatorText = CreatorEnum[state.media_type]
    drawTextInput(state, ui, creatorText, false)
}

export function drawPublisher(state, ui) {
    ui.onSelect = () => {
        state.publisher = ui.text

        if (state.media_type == "game") {
            resetAndIncrement(999)
        }
        else {
            resetAndIncrement()
        }
    }
    const publisherText = PublisherEnum[state.media_type]
    drawTextInput(state, ui, publisherText, true)
}

export function drawYear(state, ui) {
    ui.onSelect = () => {
        if (Number(ui.text)) {
            state.year = ui.text
            resetAndIncrement()
        }
    }
    drawTextInput(state, ui, "Year", false)
}

export function drawEdition(state, ui) {
    ui.onSelect = () => {
        state.edition = ui.text === "" ? null : ui.text
        resetAndIncrement()
    }
    drawTextInput(state, ui, "Edition", true)
}

export function drawOrigYear(state, ui) {
    if (state.edition == null) {
        resetAndIncrement()
        draw(state, ui)
        return
    }
    ui.onSelect = () => {
        if (Number(ui.text)) {
            state.orig_year = ui.text
            resetAndIncrement()
        }
    }
    drawTextInput(state, ui, "Original Release Year")
}

export function drawReviewText(state, ui) {
    ui.onSelect = () => {
        state.review_text = ui.text
        resetAndIncrement()
    }
    drawTextInput(state, ui, "Review Text", false)
}

export function drawSource(state, ui) {
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
}

export function drawBaseScore(state, ui) {
    ui.cursor = colours.length - 1
    ui.onSelect = () => {
        let match = colours[ui.cursor].text.match(/^([+=-])(\d+)$/)
        state.tier = match[1]
        state.base_score = match[2]
        resetAndIncrement()
    }
    render(state, ui, drawCycleSelectColour, colours, "score")
}

export function drawStandoutInconsistentDivisive(state, ui) {
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
}

export function drawGenre(state, ui) {
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
}

export function drawSubGenre(state, ui) {
    ui.onSelect = () => {
        state.sub_genre = ui.text
        resetAndIncrement("done")
    }
    drawTextInput(state, ui, `${state.media_type} sub genre`)
}

export function isIndieGame(state, ui) {
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
}

export function finishReview(state, ui) {
    ui.run = false
    console.log(state);

    saveReview(state).finally(() => {
        process.stdin.setRawMode(false)
        process.stdin.pause()
        process.exit(0)
    })
}

export function drawReviewYearQuarter(state, ui) {
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
}