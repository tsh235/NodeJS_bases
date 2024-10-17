import {knex} from '../modules/connectDB.js';

export const deleteTask = async id => {
	const isDeletedTask = await knex('todos').where({id}).del();

	if (isDeletedTask) {
		console.log(`Задача с идентификатором ${id} удалена`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}

	knex.destroy();
};
