const Pool = require('pg').Pool

const psql = new Pool({
	user: 'postgres',
	password: 'postgres',
	host: 'localhost',
	port: 5432,
	database: 'postgres'
})

module.exports = psql


