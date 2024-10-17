import {knex} from '../modules/connectDB.js';

export const updateTask = async ({id, str: task}) => {
	const isUpdatedTask = await knex('todos').where({id}).update({task});

	if (isUpdatedTask) {
		console.log(`Задача с идентификатором ${id} обновлена`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}

	knex.destroy();
}
