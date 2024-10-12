import { fetchData } from './modules/fetchData.js';
import { parseHTML } from './modules/parseHTML.js';

const options = {
	headers: {
		'Content-Type': 'text/plain; charset=utf8',
		'User-Agent': 'ParseApp/1.0',
	},
};

const urlString = 'https://mos-dealer.ru/';

const data = await fetchData(urlString, options);

parseHTML(data);
