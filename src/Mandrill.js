import axios from 'axios';

export default class Mandrill {
	constructor(apiKey, options) {

		if(!apiKey) throw new Error('No Mandrill API key given to monkey-around. Please see Mandrill to get your API Key.');

		// TODO: add test for promises and throw error if no polyfill is given or provide the polyfill
		// TODO: what options should we prevent from happening?

		const defaults = {
			baseURL: 'https://${dc}.api.mailchimp.com/3.0/',
			timeout: 1000,
			headers: {
				'content-type': 'application/json',
			},
			auth: {
				username: 'monkey-around',
				password: apiKey
			}
		};

		const config = Object.assign(defaults, options);

		let request = axios.create(config);
	}
}
