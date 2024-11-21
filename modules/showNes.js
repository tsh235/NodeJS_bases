import {bgBlue, bgYellow, green, red} from 'colorette';
import {declOfNum} from '../utils/declOfNum.js';

export const showNews = (data, count) => {
	if (data === undefined) {
		console.log(red(`\nОшибка авторизации!\n`))
		process.exit();
	};

	data.length < count ?
		console.log(bgYellow(`\nНайдено ${declOfNum(data.length, ['новость', 'новости', 'новостей'])}\n`)) :
		console.log(bgYellow(`\nНайдено ${declOfNum(data.length, ['новость', 'новости', 'новостей'])}, выведено - ${count}\n`));

	data.forEach((item, i) => {
		console.log(bgBlue(`Новость ${i+1}:`));
		for (const key in item) {
			console.log(`${key}: ${green(item[key])}`);
		}
	});
};
