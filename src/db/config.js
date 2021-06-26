'use strict'

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

module.exports = () =>
    open({
        filename: './src/db/belloinfo_db.db',
        driver: sqlite3.Database,
    });