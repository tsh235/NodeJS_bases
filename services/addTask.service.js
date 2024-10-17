import {knex} from '../modules/connectDB.js';

export const addTask = async task => {
	const [{id}] = await knex('todos').returning('id').insert({status: 'В работе', task});

	console.log(`Задача добавлена с идентификатором ${id}`);

	knex.destroy();
}
