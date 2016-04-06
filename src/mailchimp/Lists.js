
export class List {

	constructor(mailchimp) {
		this.mailchimp = mailchimp;
	}

	// subscribe a user to a specfic list
	// Member Object - https://api.mailchimp.com/schema/3.0/Lists/Members/Instance.json?_ga=1.252183759.770295981.1457393059
	subscribe(list, params) {

		return this.mailchimp.request({
			url: `/lists/${list}/members/`,
			method: 'post',
			data: params
		});

	}

	updateSubscriber(list, params) {

		// create md5 hash of the email address to the the member id for mailchimp
		if(!params.email_address) throw new Error('No email address was given in the params');
		const MEMBER_HASH = this.mailchimp.memberHash(params.email_address);

		return this.mailchimp.request({
			url: `/lists/${list}/members/${MEMBER_HASH}`,
			method: 'put',
			data: params
		});

	}
}
