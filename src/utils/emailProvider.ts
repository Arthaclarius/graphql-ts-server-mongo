import * as SparkPost from 'sparkpost'

const client = new SparkPost()
export async function sendEmail(address: string, subject: string, content: string) {
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
		})
		console.log('Email Sent')
	} catch (_error) {
		console.log('Email Error')
	}
}
