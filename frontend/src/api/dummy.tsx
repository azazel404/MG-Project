import fetchHelper from '../utils/fetch'

type paramGetList = {
	// _page: number
	// _limit: number
	// title?: string
	[key: string]: number | string | undefined
}

const DummyAPI = {
	get: (payload: paramGetList) => {
		const params = new URLSearchParams()

		for (const key in payload) {
			if (payload[key] !== undefined) {
				// console.log('key', key, payload[key], payload)
				params.append(key, (payload[key] as number | string).toString())
			}
		}
		// _page=${payload.page}&_limit=${payload.limit}&title=${payload.title}
		const url = `/posts?${params.toString()}`
		let options = {
			method: 'GET',
		}
		return fetchHelper(url, options)
	},
}

export default DummyAPI
