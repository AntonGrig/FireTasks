const { Client, Pool } = require('pg')
const client = new Client()

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
};

const pool = new Pool(config);

pool.query('SELECT * FROM tasks', (err, res) => {
    console.log(err, res.rows)
    pool.end()
})