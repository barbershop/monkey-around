import axios from 'axios';
import crypto from 'crypto';

import Lists from './Lists';
import Batch from './Batch';

export { Lists, Batch };

export default class Mailchimp {

	constructor(apiKey, dc, options) {

		if(!apiKey) throw new Error('No Mailchimp API key given to monkey-around. Please see Mailchimp to get your API Key.');
		if(!dc) throw new Error('No Mailchimp Data Center provided. Please see Mailchimp to get your accounts Data Center.');

		const API_VERSION = '3.0';
		const CRYPT_KEY = 'monkey-around';

		// TODO: add test for promises and throw error if no polyfill is given or provide the polyfill
		// TODO: what options should we prevent from happening?

		const DEFAULTS = {
			baseURL: 'https://${dc}.api.mailchimp.com/${API_VERSION}/',
			timeout: 1000,
			headers: {
				'content-type': 'application/json',

			},
			auth: {
				username: 'monkey-around',
				password: apiKey
			}
		};

		const CONFIG = Object.assign(DEFAULTS, options);
		const REQUEST = axios.create(CONFIG);

		this.request = REQUEST;
		this.cryptKey = CRYPT_KEY;

	}

	set memberHash(email) {
		return crypto.createHmac('md5', this.cryptKey).update(email).digest('hex');
	}
}
