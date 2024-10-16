import {readFile, writeFile} from 'node:fs/promises';
import {
	INVALID_REQUEST_MESSAGE,
	QUOTES_FILE,
	SERVER_ERROR_MESSAGE,
	SUCCESS_DELETE_MESSAGE,
	TICKERS_FILE
} from '../const.js';

export const handleRemoveTickers = async (res, tickers, query) => {
	const tickersLength = tickers.length;

	try {
		if (!query.tickers) {
			res.writeHead(400, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: INVALID_REQUEST_MESSAGE}));
			return;
		}

		const removeTicker = query.tickers.toUpperCase().split(',');
		const quotesFileData = await readFile(QUOTES_FILE, 'utf8');
		const quotesData = JSON.parse(quotesFileData);

		removeTicker.forEach(ticker => {
			const index = tickers.indexOf(ticker);
			if (index > -1) {
				tickers.splice(index, 1);
				delete quotesData[ticker];
			}
		});

		if (tickers.length !== tickersLength) {
			await writeFile(TICKERS_FILE, JSON.stringify(tickers));
			await writeFile(QUOTES_FILE, JSON.stringify(quotesData));

			res.writeHead(200, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: SUCCESS_DELETE_MESSAGE}))
		} else {
			res.writeHead(400, {'Content-Type': 'application/json'});
			res.end(JSON.stringify({message: INVALID_REQUEST_MESSAGE}));
		}
	} catch (err) {
		console.error('Ошибка при удалении данных: ', err);
		res.writeHead(500, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({message: SERVER_ERROR_MESSAGE}));
	}
};
