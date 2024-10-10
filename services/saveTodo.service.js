import {writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {getTodo} from '../modules/getTodo.js';

const filePath = path.join(os.homedir(), 'to-do.json');

export const saveTodo = async () => {
	const todoList = await getTodo();

	if (!todoList.length) {
		console.log('Список задач пуст, сохранять нечего');
		return;
	}

	try {
		await writeFile(filePath, JSON.stringify(todoList), 'utf8');
		console.log('Список задач записан на диск и находится по этому пути:');
		console.log(`${filePath}`);
	} catch (err) {
		console.error(`Ошибка записи ${err.message}`);
	}
}
