const testGetMethood = document.querySelector('#testGetMethood')
const testPostMethood = document.querySelector('#testPostMethood')
const testUpdateMethood = document.querySelector('#testUpdateMethood')
const testDeleteMethood = document.querySelector('#testDeleteMethood')

testGetMethood.addEventListener('click', async () => {
	for (let i = 0; i < 1000; i++) {
		await fetch('http://127.0.0.1:5000/api/fullname', {
			method: 'GET'
		})
		console.log('ok get')
	}
})

testPostMethood.addEventListener('click', async () => {
	for (let i = 0; i < 1000; i++) {
		const user = {
			'n_iter': i,
			'first_name': `Alex${i}`,
			'last_name': `LastName${i}`
		}
		await fetch('http://127.0.0.1:5000/api/fullname', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		})
		console.log('ok post')
	}
})

testUpdateMethood.addEventListener('click', async () => {
	for (let i = 0; i < 1000; i++) {
		const date = Date.now()
		const user = {
			'first_name': `Alex${i}`,
			'last_name': `LastName${i}`,
			'new_first_name': `Alex${date}`,
			'new_last_name': `LastName${date}`
		}

		await fetch('http://127.0.0.1:5000/api/fullname', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			},
			body: JSON.stringify(user)
		})
		console.log('ok update')
	}
})

testDeleteMethood.addEventListener('click', async () => {
	for (let i = 0; i < 1000; i++) {
		await fetch(`http://127.0.0.1:5000/api/fullname?n_iter=${i}`, {
			method: 'DELETE'
		})
		console.log('ok')
	}
})