const POOL = require('pg').Pool;
const config = require('../config/default.json');

const pool = new POOL({
    user:config.pg_user,
    host:config.pg_host,
    port:config.pg_port,
    database:config.pg_db,
    password:config.pg_password
})

module.exports = pool