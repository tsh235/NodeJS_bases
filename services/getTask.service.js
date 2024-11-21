import {getTodo} from '../modules/getTodo.js'

export const getTask = async id => {
	const todoList = await getTodo();

	if (!todoList.length) {
		console.log('Список задач пуст');
		return;
	}

	const [todo] = todoList.filter(item => item.id === +id);

	if (todo) {
		console.log(`Задача с идентификатором ${id}:`);
		console.log(`Название: ${todo.task}`);
		console.log(`Статус: ${todo.status}`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}
}
