const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres', // I don't really have to hide anything here lol :P
    port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      callback(err, client, done)
    })
  }
}