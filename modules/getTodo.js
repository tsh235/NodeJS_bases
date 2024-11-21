import {readTodo} from '../modules/readTodo.js';

export const getTodo = async () => {
	return JSON.parse((await readTodo('./to-do.json', 'utf8')) || '[]');
};
