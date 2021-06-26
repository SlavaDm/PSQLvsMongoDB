const express = require('express')
const app = express()
const api = require('./api')
const cors = require('cors')

app.use(express.json())
app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true }))
app.use('/api', api)

try {
	app.listen(5000, () => {
		console.log('Listening port 5000...')
	})
} catch (e) {
	console.log(e)
}



