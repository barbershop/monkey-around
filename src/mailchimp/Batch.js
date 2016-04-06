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
