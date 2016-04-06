import _ from 'lodash';


export class Batch {

	constructor(mailchimp) {
		this.mailchimp = mailchimp;
	}

	send(operations) {
		return this.mailchimp.request({
			url: '/batches',
			method: 'post',
			data: {
				operations
			}
		});
	}

	subscribe(list, bodyArr, operation_id) {

		const URL = `/lists/${list}/members/`;
		const METHOD = 'post';
		let operations = [];

		// TODO: generate an operation_id from Date and project name or make required

		operations = _.map(bodyArr, function(body, i) {
			operation_id = `${operation_id}_${i}`;
			// do not mutate the original object last param in list wins
			return {
				path: URL,
				method: METHOD,
				operation_id,
				body
			};
		});

		return this.mailchimp.request({
			url: '/batches',
			method: 'post',
			data: {
				operations
			}
		});

	}

	status(id) {
		return this.mailchimp.request({
			url: `/batches/${id}`,
			method: 'get'
		});
	}
}
