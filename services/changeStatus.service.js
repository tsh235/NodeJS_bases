import {getTodo} from '../utils/getTodo.js';
import {writeTodo} from '../modules/writeTodo.js';

export const changeStatus = async ({id, str}) => {
	const todoList = await getTodo();

	if (!todoList.length) {
		console.log('Список задач пуст');
		return;
	}

	const [todo] = todoList.filter(item => item.id === +id);

	if (todo) {
		todoList.forEach(item => {
			if (item.id === +id) {
				item.status = str;
			}
		})
		writeTodo('./to-do.json', JSON.stringify(todoList))
		console.log(`Статус задачи с идентификатором ${id} обновлен`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}
}
