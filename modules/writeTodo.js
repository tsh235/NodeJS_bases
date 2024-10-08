import {writeFile} from 'node:fs/promises';

export const writeTodo = async (pathFile, data) => {
	try {
		await writeFile(pathFile, data, {encoding: 'utf8'});
		return true;
	} catch (err) {
		console.error(`Ошибка записи в файл: ${err.message}`);
	}
}
