const psql = require('../psql')


class PSQLController {
	getFullName = async () => {
		try {
			const startTime = Date.now()
			const fullname = await psql.query('select * from fullname;')
			const end = Date.now() - startTime
			return { data: {...fullname.rows}, PSQLtime: end }
		} catch (e) {
			return { message: e.detail || e }
		}
	}

	createFullName = async (req) => {
		try {
			const { n_iter, first_name, last_name } = req.body
			const isFullName = await psql.query('select * from fullname where n_iter = $1 and first_name = $2 and last_name = $3;', [n_iter, first_name, last_name])
			if (isFullName?.rows?.length) {
				return { message: 'User already is here' }
			}
			const startTime = Date.now()
			await psql.query('insert into fullname values($1, $2, $3);', [n_iter, first_name, last_name])
			const end = Date.now() - startTime
			return { message: 'Fullname was created', time: end }
		}
		catch (e) {
			return { message: e.detail || e }
		}
	}

	updateFullName = async (req) => {
		try {
			const { first_name, last_name, new_first_name, new_last_name } = req.body
			const fullname = await psql.query('select * from fullname where first_name = $1 and last_name = $2;', [first_name, last_name])
			if (!fullname?.rows?.length) {
				return { message: 'User is not found' }
			}
			if (first_name === new_first_name && last_name === new_last_name) {
				return { message: 'Same values' }
			}
			const startTime = Date.now()
			await psql.query('update fullname set(first_name, last_name) = ($1, $2) where first_name = $3 and last_name = $4;', [new_first_name, new_last_name, first_name, last_name])
			const end = Date.now() - startTime
			return { message: 'Fullname was updated', time: end }
		} catch (e) {
			return { message: e.detail || e }
		}
	}

	deleteFullName = async (req) => {
		try {
			const { n_iter } = req.query
			const user = await psql.query('select * from fullname where n_iter = $1;', [n_iter])
			if (user?.rows?.length) {
				const startTime = Date.now()
				await psql.query('delete from fullname where n_iter = $1;', [n_iter])
				const end = Date.now() - startTime
				return { message: 'Fullname was deleted', time: end }
			}
			return { message: 'User was not here' }
		}
		catch (e) {
			return { message: e.detail || e }
		}
	}

	saveGetResult = async (PSQLTime, MongoTime, type = 'read') => {
		try {
			if (PSQLTime === undefined || MongoTime === undefined) {
				return { message: 'undefined' }
			}
			await psql.query('insert into results(type, psql_time, mongo_time) values($1,$2,$3);', [type, PSQLTime, MongoTime])
			return { message: 'OK' }
		}
		catch (e) {
			console.log(e)
			return { message: e.detail || e }
		}
	}

	savePostResult = async (PSQLTime, MongoTime, type = 'create') => {
		try {
			if (PSQLTime === undefined || MongoTime === undefined) {
				return { message: 'undefined' }
			}
			await psql.query('insert into results(type, psql_time, mongo_time) values($1,$2,$3);', [type, PSQLTime, MongoTime])
			return { message: 'OK' }
		}
		catch (e) {
			console.log(e)
			return { message: e.detail || e }
		}
	}

	saveUpdateResult = async (PSQLTime, MongoTime, type = 'update') => {
		try {
			if (PSQLTime === undefined || MongoTime === undefined) {

				return { message: 'undefined' }
			}
			await psql.query('insert into results(type, psql_time, mongo_time) values($1,$2,$3);', [type, PSQLTime, MongoTime])
			return { message: 'OK' }
		}
		catch (e) {
			console.log(e)
			return { message: e.detail || e }
		}
	}

	saveDeleteResult = async (PSQLTime, MongoTime, type = 'delete') => {
		try {
			if (PSQLTime === undefined || MongoTime === undefined) {

				return { message: 'undefined' }
			}
			await psql.query('insert into results(type, psql_time, mongo_time) values($1,$2,$3);', [type, PSQLTime, MongoTime])
			return { message: 'OK' }
		}
		catch (e) {
			console.log(e)
			return { message: e.detail || e }
		}
	}
}

module.exports = new PSQLController()