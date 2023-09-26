import fs from 'fs';
import connection from './connection.js';
import config from './config.js';
import { iniPrint, errorPrint } from '../util/print.js';
export var doesDBExist = function () { return fs.existsSync(config.DATABASE_DIR + config.DATABASE_NAME); };
export var deleteDatabase = function () { fs.unlinkSync(config.DATABASE_DIR + config.DATABASE_NAME); };
var createDatabaseFile = function () { return fs.writeFileSync(config.DATABASE_DIR + config.DATABASE_NAME, ''); };
var getTableList = function () { return config.TABLES.map(function (e) { return e.name; }); };
export var createDatabase = function () {
    iniPrint("Creating Database ".concat(config.DATABASE_DIR + config.DATABASE_NAME));
    createDatabaseFile();
    getTableList().forEach(function (e) { return createTable(e, getTableDetails(e)); });
};
var createTable = function (tableName, tableDetails) {
    if (!tableDetails)
        return;
    var columns = [];
    tableDetails.columns.forEach(function (e) {
        columns.push("".concat(e.name.toLowerCase(), " ").concat(e.attr.toUpperCase()));
    });
    var columnString = "(".concat(columns.join(", "), ")");
    var tableString = "CREATE TABLE IF NOT EXISTS ".concat(tableName, " ").concat(columnString);
    connection().exec(tableString);
    iniPrint("Creating Table: ".concat(tableName));
};
var getTableDetails = function (table) {
    var foundTable = config.TABLES.filter(function (e) { return e.name == table; });
    if (foundTable.length != 1)
        errorPrint("Invalid table operation");
    else
        return foundTable[0];
};
//# sourceMappingURL=init.js.map