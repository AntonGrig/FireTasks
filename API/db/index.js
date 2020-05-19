const { Pool } = require('pg');

// Example of programmatic approach
/*
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
};
const pool = new Pool();
*/

// Configurations are taken from environment variables PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT
const pool = new Pool();

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
}