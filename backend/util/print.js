var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import figlet from "figlet";
import { DEV_OPTIONS } from "../config.js";
import chalk from 'chalk';
import { pad } from "./pad.js";
export var print = function (text, header) { return header ? console.log("".concat(header, " ").concat(text)) : console.log(text); };
export var debugLog = function (str) {
    if (DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.PRINT_DEBUG_MESSAGES)
        print("[DEBUG]", str);
};
export var figletText = function (str, opts) {
    var defaultOptions = {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
    };
    return figlet.textSync(str, __assign(__assign({}, opts), defaultOptions));
};
export var printBool = function (val, padLength) {
    if (!padLength)
        padLength = 0;
    return val ? chalk.bold.green(pad("Enabled", padLength, "start")) : chalk.bold.red(pad("Disabled", padLength, "start"));
};
export var printDevOptions = function () {
    var printDevOption = function (opt, val, optPadLen, padLength) {
        console.log("".concat(pad(opt, optPadLen, "end"), " | ").concat(printBool(val, padLength)));
    };
    var padLength = 10;
    var maxPadLength = Math.max.apply(Math, Object.keys(DEV_OPTIONS).map(function (e) { return e.length; }));
    print("".concat(chalk.bold("Developer Mode"), " ").concat(printBool(DEV_OPTIONS.DEV_MODE), " \n"));
    if (!DEV_OPTIONS.DEV_MODE)
        return;
    print(chalk.bold.blueBright.underline("".concat(pad("Option", maxPadLength, "end"), " | ").concat(pad("Value", padLength, "start"))));
    var values = Object.values(DEV_OPTIONS);
    Object.keys(DEV_OPTIONS)
        .map(function (e, i) { return [e, values[i]]; })
        .forEach(function (e) { return printDevOption(e[0], e[1], maxPadLength, padLength); });
};
export var debugPrint = function (str) { return (DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.PRINT_DEBUG_MESSAGES) ? print(str, chalk.bold.magenta("[DEBUG]")) : ""; };
export var debugWebPrint = function (str) { return (DEV_OPTIONS.DEV_MODE && DEV_OPTIONS.PRINT_DEBUG_MESSAGES && DEV_OPTIONS.SERVER_LOGGING) ? print(str, chalk.bold.magenta("[ WEB ]")) : ""; };
export var iniPrint = function (str) { return print(str, chalk.bold.magenta("[ INI ]")); };
export var errorPrint = function (text) { return console.error("".concat(chalk.bold.red("[ERROR]"), " ").concat(text)); };
//# sourceMappingURL=print.js.map