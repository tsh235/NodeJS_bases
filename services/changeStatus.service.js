import {knex} from '../modules/connectDB.js';

export const changeStatus = async ({id, str: status}) => {
	const isUpdatedStatus = await knex('todos').where({id}).update({status});

	if (isUpdatedStatus) {
		console.log(`Статус задачи с идентификатором ${id} обновлен`);
	} else {
		console.log(`Задачи с идентификатором ${id} не существует`);
	}

	knex.destroy();
}
