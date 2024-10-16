import 'dotenv/config';
import htts from 'node:https';
import {readFile, writeFile} from 'node:fs/promises';
import {API_URL, MAX_QUOTES, PRICE_URL, QUOTES_FILE, TICKERS_URL, TSYMS} from './const.js';

export const fetchUrlAsync = async (url) => new Promise((resolve, reject) => {
	htts.get(url, response => {
		let data = '';

		response.on('data', chunk => {
			data += chunk;
		});

		response.on('end', () => {
			resolve(data);
		});

		response.on('error', (err) => {
			reject(err);
		})
	})
});

export const fetchValidTickers = async () => {
	try {
		const url = `${API_URL}${TICKERS_URL}`;
		const data = await fetchUrlAsync(url);
		const validTickers = Object.keys(JSON.parse(data).Data);
		return validTickers;
	} catch (err) {
		console.error(`Ошибка получения данных с сервера: ${err.message}`);
	}
};

const fetchTickersData = async tickers => {
	try {
		const url = new URL(`${API_URL}${PRICE_URL}`);
		url.searchParams.set('tsyms', TSYMS);
		// url.searchParams.set('api_key', API_KEY);
		url.searchParams.set('fsyms', tickers.join(','));

		const data = await fetchUrlAsync(url);
		return JSON.parse(data);
	} catch (err) {
		console.error(`Ошибка получения данных с сервера: ${err.message}`);
	}
};

const createTimestampedData = tickersData => {
	const timestampedData = {};
	const timestamp = Date.now();

	const tsyms = TSYMS.split(',');

	for (const currency in tickersData) {
		timestampedData[currency] = {
			timestamp,
		}

		tsyms.forEach(item => {
			timestampedData[currency][`price_${item}`] = tickersData[currency][item]
		});
	};

	return(timestampedData);
};

const storeQuotesData = async data => {
	try {
		const fileData = await readFile(QUOTES_FILE, 'utf8');
		const quotesData = JSON.parse(fileData);

		for (const currency in data) {
			if (Object.prototype.hasOwnProperty.call(data, currency)) {
				if (!Object.prototype.hasOwnProperty.call(quotesData, currency)) {
					quotesData[currency] =[];
				}
				quotesData[currency].push(data[currency]);
			}
		}

		for (const currency in quotesData) {
			if (Object.prototype.hasOwnProperty.call(quotesData, currency)) {
				if(quotesData[currency].length > MAX_QUOTES) {
					quotesData[currency].shift();
				}
			}
		}

		try {
			await writeFile(QUOTES_FILE, JSON.stringify(quotesData))
		} catch (err) {
			console.error(`Ошибка при записи данных в файл: ${err.message}`);
		}
	} catch (err) {
		console.error(`Ошибка при чтении данных из файла: ${err.message}`);
	}
}

export const fetchAndStoreData = async tickers => {
	const tickersData = await fetchTickersData(tickers);
	console.log('tickersData: ', tickersData);
	const timestampedData = createTimestampedData(tickersData);
	storeQuotesData(timestampedData);
}
