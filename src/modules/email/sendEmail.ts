import * as dotenv from 'dotenv';
import * as SparkPost from 'sparkpost';

dotenv.config();

const client = new SparkPost();
export async function sendEmail(
	address: string,
	subject: string,
	content: string
) {
	try {
		await client.transmissions.send({
			options: {
				sandbox: true
			},
			content: {
				from: 'testing@sparkpostbox.com',
				subject,
				html: `<html><body><p>SparkPost - ${content}</p></body></html>`
			},
			recipients: [ { address } ]
		});
		console.log('Email Sent');
	} catch (_) {
		console.log('Email Error');
	}
}
