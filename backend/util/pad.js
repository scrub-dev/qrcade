export var pad = function (input, fillLength, location) {
    if (location == "end") {
        return input.padEnd(fillLength, " ");
    }
    else {
        return input.padStart(fillLength, " ");
    }
};
//# sourceMappingURL=pad.js.map