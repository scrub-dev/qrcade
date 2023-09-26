import express from 'express';
import { debugWebPrint } from './util/print.js';
export var app = express();
var webLogger = function (req, res, next) {
    debugWebPrint("Path: ".concat(req.url, " | Time: ").concat(new Date(Date.now()).toUTCString()));
    next();
};
app.use(webLogger);
app.get("/", function (req, res) {
    res.send("Hello World").status(200).end();
});
app.get("/auth", function (req, res) {
    res.send("Hello AUTH").status(200).end();
});
app.get("/getuser", function (req, res) {
    res.send("Hello GETUSER").status(200).end();
});
app.get("/hit", function (req, res) {
    res.send("YOU SHOT SOMEONE!!!!!111").status(200).end();
});
//# sourceMappingURL=app.js.map