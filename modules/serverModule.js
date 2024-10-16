import url from 'node:url';
import {createServer} from 'node:http';
import {handleCryptoRequest} from './serverModules/handleCryptoRequest.js';
import {handleAddTickers} from './serverModules/handleAddTickers.js';
import {handleRemoveTickers} from './serverModules/handleRemoveTickers.js';
import {NOT_FOUND_MESSAGE} from './const.js';

export const startServer = (tickers, validTickers) =>
	createServer((req, res) => {
		const {pathname, query} = url.parse(req.url, true);

		if (pathname.startsWith('/crypto') && req.method === 'GET') {
			handleCryptoRequest(res, query);
			return;
		}

		if (pathname.startsWith('/crypto') && req.method === 'POST') {
			handleAddTickers(req, res, tickers, validTickers);
			return;
		}

		if (pathname.startsWith('/crypto') && req.method === 'DELETE') {
			handleRemoveTickers(res, tickers, query);
			return;
		}

		res.writeHead(404, {'Content-Type': 'application/json'})
		res.end(JSON.stringify({message: NOT_FOUND_MESSAGE}));
	});
