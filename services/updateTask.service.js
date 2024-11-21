import {green, red} from 'colorette';
import {knex} from '../modules/connectDB.js';

export const updateTask = async ({id, str: task}) => {
	const isUpdatedTask = await knex('todos').where({id}).update({task});

	if (isUpdatedTask) {
		console.log(green(`Задача с идентификатором ${id} обновлена`));
	} else {
		console.log(red(`Задачи с идентификатором ${id} не существует`));
	}

	knex.destroy();
}
