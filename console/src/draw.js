import { mediatypes, sources, gamegenres, ui, colours, CreatorEnum,PublisherEnum } from "./const.js";
import { render } from "./render.js"
import { drawCheckBox, drawCycleSelect, drawRadioButton, drawTextInput, getSourceItems, drawCycleSelectColour } from './inputs.js';
import { saveReview } from "./api.js";
import {
    drawMediaType, drawTitle, drawCreator, drawPublisher, drawYear, drawEdition,
    drawOrigYear, drawReviewText, drawSource, drawBaseScore,
    drawStandoutInconsistentDivisive, drawGenre, drawSubGenre, isIndieGame,
    finishReview, drawReviewYearQuarter
} from "./fields.js";

function resetAndIncrement(input = "") {
    ui.cursor = 0
    ui.text = 0
    ui.field = input === "" ? ui.field + 1 : input
    ui.onSelect = undefined
}

export function draw(state, ui) {
    switch (ui.field) {
        case 1: drawMediaType(state, ui); break;
        case 2: drawTitle(state, ui); break;
        case 3: drawCreator(state, ui); break;
        case 4: drawPublisher(state, ui); break;
        case 5: drawYear(state, ui); break;
        case 6: drawEdition(state, ui); break;
        case 7: drawOrigYear(state, ui); break;
        case 8: drawReviewText(state, ui); break;
        case 9: drawSource(state, ui); break;
        case 10: drawBaseScore(state, ui); break;
        case 11: drawStandoutInconsistentDivisive(state, ui); break;
        case 12: drawGenre(state, ui); break;
        case 888: drawSubGenre(state, ui); break;
        case 999: isIndieGame(state, ui); break;
        case 889:
        case 13:
        case "done": finishReview(state, ui); break;
        case 0: drawReviewYearQuarter(state, ui); break;
    }
}