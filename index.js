import 'dotenv/config';
import {readFile} from 'node:fs/promises';
import {fetchAndStoreData, fetchValidTickers} from './modules/dataModule.js';
import {startServer} from './modules/serverModule.js';
import {TICKERS_FILE} from './modules/const.js';

const PORT = process.env.PORT || 3000;

try {
	const validTickers = await fetchValidTickers();

	const fileData = await readFile(TICKERS_FILE, 'utf8');
	const tickers = JSON.parse(fileData);

	const server = startServer(tickers, validTickers);
	server.listen(PORT, () => {
		console.log(`Сервер запущен на ${PORT} порту`);
	});

	setInterval(() => {
		fetchAndStoreData(tickers);
	}, 5000);

} catch (err) {
	console.error(`Ошибка при чтении данных из файла: ${err.message}`);
}
