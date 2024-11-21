import {open} from 'node:fs/promises';

export const createTodo = async pathFile => {
	try {
		await open(pathFile, 'a');
		console.log(`Файл ${pathFile} был создан`);
	} catch (err) {
		console.log(`Ошибка: ${err.message}`);
	}
}
