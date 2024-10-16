import {readFile} from 'node:fs/promises';
import {handleStepQuery} from './handleStepQuery.js';
import {QUOTES_FILE, SERVER_ERROR_MESSAGE} from '../const.js';

export const handleCryptoRequest = async (res, query) => {
	try {
		const fileData = await readFile(QUOTES_FILE, 'utf8')

		res.writeHead(200, {'Content-Type': 'application/json'});
		const quotesData = JSON.parse(fileData);

		if (query.tickers) {
			const tickers = query.tickers.toUpperCase().split(',');
			const filteredData = {};

			tickers.forEach(ticker => {
				if (Object.prototype.hasOwnProperty.call(quotesData, ticker)) {
					filteredData[ticker] = quotesData[ticker];
				}
			})
			return handleStepQuery(res, filteredData, query.step);
		}

		handleStepQuery(res, quotesData, query.step);
	} catch (err) {
		console.error(`Ошибка при чтении файла: ${err.message}`);
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: SERVER_ERROR_MESSAGE}));
	}
};
