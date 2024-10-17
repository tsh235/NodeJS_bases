import {knex} from '../modules/connectDB.js';

export const getTask = async id => {
	const [task] = await knex('todos').where('id', '=', id);

	if (task) {
		console.log(`Задача с идентификатором ${id}:`);
		console.log(`Название: ${task.task}`);
		console.log(`Статус: ${task.status}`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}

	knex.destroy();
}
