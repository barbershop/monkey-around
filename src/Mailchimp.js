import axios from 'axios';

export default class Mailchimp {
	constructor(apiKey, dc, options) {

		if(!apiKey) throw new Error('No Mailchimp API key given to monkey-around. Please see Mailchimp to get your API Key.');
		if(!dc) throw new Error('No Mailchimp Data Center provided. Please see Mailchimp to get your accounts Data Center.');

		// TODO: add test for promises and throw error if no polyfill is given or provide the polyfill

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
