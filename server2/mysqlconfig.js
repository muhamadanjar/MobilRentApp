var mysql   =     require("mysql");
var pool    =    mysql.createPool({
    connectionLimit   :   100,
    host              :   'localhost',
    user              :   'root',
    password          :   '',
    database          :   'rentalmobil',
    port: 3306,
    debug             :   true
});

module.exports = pool;