import {getTodo} from '../utils/getTodo.js'
import {writeTodo} from '../modules/writeTodo.js';

export const deleteTask = async id => {
	const todoList = await getTodo();

	if (!todoList.length) {
		console.log('Список задач пуст');
		return;
	}

	const [todo] = todoList.filter(item => item.id === +id);

	if (todo) {
		const newTodoList = todoList.filter(item => item.id !== +id);
		writeTodo('./to-do.json', JSON.stringify(newTodoList))
		console.log(`Задача с идентификатором ${id} удалена`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}
};
