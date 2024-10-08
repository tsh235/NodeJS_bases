import {readFile} from 'node:fs/promises';
import {createTodo} from './createTodo.js';

export const readTodo = async pathFile => {
	try {
		return await readFile(pathFile, 'utf8');
	} catch (err) {
		console.error('Такого файла нет');
		await createTodo(pathFile);
	}
}
