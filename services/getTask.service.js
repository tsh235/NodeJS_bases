import {blue, red, yellow} from 'colorette';
import {knex} from '../modules/connectDB.js';

export const getTask = async id => {
	const [task] = await knex('todos').where('id', '=', id);

	if (task) {
		console.log(blue(`Задача с идентификатором ${id}:`));
		console.log(`Название: ${yellow(task.task)}`);
		console.log(`Статус: ${yellow(task.status)}`);
	} else {
		console.log(red(`Задачи с идентификатором ${id} не существует`));
	}

	knex.destroy();
}
