const FullName = require('../models/fullName')

class MongoController {
	getFullName = async () => {
		try {
			const startTime = Date.now()
			const fullname = await FullName.find()
			const end = Date.now() - startTime
			return { ...fullname, MongoTime: end }
		} catch (e) {
			return { message: e.detail || e }
		}
	}

	createFullName = async (req) => {
		try {
			const { n_iter, first_name, last_name } = req.body
			const isFullName = await FullName.find({ n_iter, first_name, last_name })
			if (isFullName.length) {
				return { message: 'User already is here' }
			}
			const startTime = Date.now()
			const user = await new FullName({ n_iter, first_name, last_name })
			await user.save()
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

			const person = await FullName.find({ first_name, last_name })
			if (!person || !person?.length) {
				return { message: 'User is not found' }
			}
			if (first_name === new_first_name && last_name === new_last_name) {
				return { message: 'Same values' }
			}
			const startTime = Date.now()
			await FullName.updateOne({ first_name, last_name }, { $set: { first_name: new_first_name, last_name: new_last_name } })
			const end = Date.now() - startTime
			return { message: 'Fullname was updated', time: end }
		} catch (e) {
			return { message: e.detail || e }
		}
	}

	deleteFullName = async (req) => {
		try {
			const { n_iter } = req.query

			const person = await FullName.findOne({ n_iter })

			if (!person) {
				console.log(person?.length)
				return { message: 'User was not here' }
			}

			const startTime = Date.now()
			await person.remove()
			const end = Date.now() - startTime
			return { message: 'Fullname was deleted', time: end }
		}
		catch (e) {
			return { message: e.detail || e }
		}
	}
}

module.exports = new MongoController()
