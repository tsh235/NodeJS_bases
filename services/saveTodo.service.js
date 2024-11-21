import {writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {knex} from '../modules/connectDB.js';
import {red} from 'colorette';

const filePath = path.join(os.homedir(), 'to-do.json');

export const saveTodo = async () => {
	const todoList = await knex('todos');

	if (!todoList.length) {
		console.log('Список задач пуст, сохранять нечего');
		knex.destroy();
		return;
	}

	try {
		await writeFile(filePath, JSON.stringify(todoList), 'utf8');
		console.log('Список задач записан на диск и находится по этому пути:');
		console.log(`${filePath}`);
	} catch (err) {
		console.error(red(`Ошибка записи ${err.message}`));
	}

	knex.destroy();
}
