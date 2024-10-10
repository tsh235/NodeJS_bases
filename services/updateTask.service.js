import {getTodo} from '../modules/getTodo.js';
import {writeTodo} from '../modules/writeTodo.js';

export const updateTask = async ({id, str}) => {
	const todoList = await getTodo();

	if (!todoList.length) {
		console.log('Список задач пуст');
		return;
	}

	const [todo] = todoList.filter(item => item.id === +id);

	if (todo) {
		todoList.forEach(item => {
			if (item.id === +id) {
				item.task = str;
			}
		})
		writeTodo('./to-do.json', JSON.stringify(todoList))
		console.log(`Задача с идентификатором ${id} обновлена`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}
}
