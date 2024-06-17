const Pool = require("pg").Pool;
//database configurations
const pool = new Pool({
    user:"postgres",
    password:"BU-p2GeEi3pG-5>",
    host:"localhost",
    port:"5432",
    database:"cic_database"
});

module.exports = pool;