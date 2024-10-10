import {getTodo} from '../modules/getTodo.js';

export const listTodo = async () => {
	const todoList = await getTodo();

	if (!todoList.length) {
		console.log('Список задач пуст');
		return;
	}

	console.log('Список задач:');
	todoList.forEach(({id, status, task}) => {
		console.log(`${id}. [${status}] ${task}`);
	});
}
