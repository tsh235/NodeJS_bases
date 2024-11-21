import {getTodo} from '../modules/getTodo.js';
import {writeTodo} from '../modules/writeTodo.js';

export const addTask = async task => {
	const todoList = await getTodo();

	const id = (todoList[todoList.length - 1]?.id || 0) + 1;

	const newTask = {id, status: 'В работе', task};

	writeTodo('./to-do.json', JSON.stringify([...todoList, newTask]));

	console.log(`Задача добавлена с идентификатором ${id}`);
}
