import {green, red} from 'colorette';
import {knex} from '../modules/connectDB.js';

export const changeStatus = async ({id, str: status}) => {
	const isUpdatedStatus = await knex('todos').where({id}).update({status});

	if (isUpdatedStatus) {
		console.log(green(`Статус задачи с идентификатором ${id} обновлен`));
	} else {
		console.log(red(`Задачи с идентификатором ${id} не существует`));
	}

	knex.destroy();
}
