import https from 'node:https';
import http from 'node:http';
import {URL} from 'node:url';

export const fetchData = async (urlString, options) => {
	const parsedUrl = new URL(urlString);
	options.hostname = parsedUrl.hostname;

	const httpModule = parsedUrl.protocol === 'https:' ? https : http;

	try {
		const data = await new Promise((resolve, reject) => {
			const req = httpModule.request(options, res => {
				let data = '';
				res.on('data', chunk => data += chunk);

				res.on('end', () => resolve(data));
			});
			req.on('error', err => reject(err));
			req.end();
		});

		return data;
	} catch (err) {
		console.error(err);
	}
}
