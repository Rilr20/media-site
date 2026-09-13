export const state = {
    media_type: null,    // radiobutton

    creator: "",         // textinput
    publisher: "",       // textinput
    title: "",           // textinpu
    orig_year: null,     // textinput
    year: null,          // textinput
    edition: "",         // textinput

    review_text: "",     // textinput

    source: null,        // radio button

    base_score: null,    // number input
    tier: "",            // radio button

    standout: false,     // radio button
    inconsistent: false, // radio button
    divisive: false,     // radio button

    indie_game: false,   // radio button

    genre: null,         // textinput/radiobutton(for games)
    sub_genre: "",       // textinput

};

export const ui = {
    field: 0,
    cursor: 0,
    run: true,
    text: "",
    onReturn: null
};
export const mediatypes = {
    0: "game",
    1: "literature",
    2: "music",
    3: "film",
}
export const sources = {
    0: { text: "pc", source: "game" },
    1: { text: "sw", source: "game" },
    2: { text: "wiu", source: "game" },
    3: { text: "wii", source: "game" },
    4: { text: "ps5", source: "game" },
    5: { text: "ps4", source: "game" },
    6: { text: "ps3", source: "game" },
    7: { text: "ps2", source: "game" },
    8: { text: "ps1", source: "game" },
    9: { text: "xb1", source: "game" },
    10: { text: "360", source: "game" },
    11: { text: "xb", source: "game" },
    12: { text: "n64", source: "game" },
    13: { text: "gc", source: "game" },
    14: { text: "nds", source: "game" },
    15: { text: "3ds", source: "game" },
    16: { text: "psp", source: "game" },
    17: { text: "psv", source: "game" },
    18: { text: "nes", source: "game" },
    19: { text: "sns", source: "game" },
    20: { text: "md", source: "game" },
    21: { text: "dc", source: "game" },
    22: { text: "theater", source: "film" },
    23: { text: "st", source: "film" },
    24: { text: "blu", source: "film" },
    25: { text: "dvd", source: "film" },
    26: { text: "hb", source: "literature" },
    27: { text: "pb", source: "literature" },
    28: { text: "kindle", source: "literature" },
    29: { text: "eread", source: "literature" },
    30: { text: "aud", source: "literature" },
    31: { text: "dg", source: "music" },
    32: { text: "lp", source: "music" },
    33: { text: "cd", source: "music" },
    34: { text: "bc", source: "music" }
};
export const gamegenres = {
    0: "Action",
    1: "Puzzle",
    2: "Simulation",
    3: "Adventure",
    4: "Arcade"
}


export const colours = [
    { text: "10", colour: "\x1b[38;5;46m" },
    { text: "-10", colour: "\x1b[38;5;47m" },

    { text: "+9", colour: "\x1b[38;5;48m" },
    { text: "9", colour: "\x1b[38;5;82m" },
    { text: "-9", colour: "\x1b[38;5;83m" },

    { text: "+8", colour: "\x1b[38;5;84m" },
    { text: "8", colour: "\x1b[38;5;85m" },
    { text: "-8", colour: "\x1b[38;5;118m" },

    { text: "+7", colour: "\x1b[38;5;119m" },
    { text: "7", colour: "\x1b[38;5;120m" },
    { text: "-7", colour: "\x1b[38;5;121m" },

    { text: "+6", colour: "\x1b[38;5;190m" },
    { text: "6", colour: "\x1b[38;5;191m" },
    { text: "-6", colour: "\x1b[38;5;192m" },

    { text: "+5", colour: "\x1b[38;5;193m" },
    { text: "5", colour: "\x1b[38;5;227m" },
    { text: "-5", colour: "\x1b[38;5;228m" },

    { text: "+4", colour: "\x1b[38;5;229m" },
    { text: "4", colour: "\x1b[38;5;214m" },
    { text: "-4", colour: "\x1b[38;5;215m" },

    { text: "+3", colour: "\x1b[38;5;216m" },
    { text: "3", colour: "\x1b[38;5;196m" },
    { text: "-3", colour: "\x1b[38;5;197m" },

    { text: "+2", colour: "\x1b[38;5;198m" },
    { text: "2", colour: "\x1b[38;5;199m" },
    { text: "-2", colour: "\x1b[38;5;198m" },

    { text: "+1", colour: "\x1b[38;5;197m" },
    { text: "1", colour: "\x1b[38;5;196m" }
]