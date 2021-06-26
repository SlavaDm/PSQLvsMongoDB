const Router = require('express')
const router = Router()
const PSQL = require('./Controllers/PSQLController')
const Mongo = require('./Controllers/MongoController')

router.get('/fullname', async (req, res) => {
	const p = await PSQL.getFullName()
	const m = await Mongo.getFullName()
	
	await PSQL.saveGetResult(p.PSQLtime, m.MongoTime)
	res.json({ ...p, MongoTime: m.MongoTime })
})

router.post('/fullname', async (req, res) => {
	const p = await PSQL.createFullName(req)
	const m = await Mongo.createFullName(req)

	await PSQL.savePostResult(p.time, m.time)
	res.json(`${p?.message}, ${m?.message}`)
})

router.put('/fullname', async (req, res) => {
	const p = await PSQL.updateFullName(req)
	const m = await Mongo.updateFullName(req)

	await PSQL.saveUpdateResult(p.time, m.time)
	res.json(`${p?.message}, ${m?.message}`)
})

router.delete('/fullname', async (req, res) => {
	const p = await PSQL.deleteFullName(req)
	const m = await Mongo.deleteFullName(req)

	await PSQL.saveDeleteResult(p.time, m.time)
	res.json(`${p?.message}, ${m?.message}`)
})


module.exports = router
