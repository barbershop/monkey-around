import Mailchimp from './Mailchimp';
import _ from 'lodash';


export class Batch extends Mailchimp {

	constructor(apiKey, dc, options) {
		super(apiKey, dc, options);
	}

	subscribe(list, operation_id, paramsArr) {

		const URL = `/lists/${list}/members/`;
		const METHOD = 'post';
		let operations = [];

		operations = _.map(paramsArr, function(body, i) {
			operation_id = `${operation_id}_${i}`;
			// do not mutate the original object last param in list wins
			return {
				path: URL,
				method: METHOD,
				operation_id,
				body
			};
		});

		return this.request({
			url: '/batches',
			method: 'post',
			data: operations
		});

	}

	status(id) {
		return this.request({
			url: `/batches/${id}`,
			method: 'get'
		});
	}
}
