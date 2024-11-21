import {green} from 'colorette';
import {knex} from '../modules/connectDB.js';

export const addTask = async task => {
	const [{id}] = await knex('todos').returning('id').insert({status: 'В работе', task});

	console.log(green(`Задача добавлена с идентификатором ${id}`));

	knex.destroy();
}
