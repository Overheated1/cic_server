const Pool = require("pg").Pool;
const pool = new Pool({
    user:"postgres",
    password:"BU-p2GeEi3pG-5>",
    host:"localhost",
    port:"5432",
    database:"cic"
});

module.exports = pool;