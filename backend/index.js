import { app } from './app.js';
import 'dotenv/config';
import { figletText, printDevOptions, print } from './util/print.js';
import { createDatabase } from './database/init.js';
var port = process.env.PORT || 3000;
var initDatabase = function () {
    createDatabase();
};
app.listen(port, function () {
    var rlen = 35;
    console.log(figletText("QRCade"));
    console.log("-".repeat(rlen));
    printDevOptions();
    console.log("-".repeat(rlen));
    print("localhost:" + port, "Running on: ");
    console.log("-".repeat(rlen));
    initDatabase();
    console.log("-".repeat(rlen));
});
//# sourceMappingURL=index.js.map