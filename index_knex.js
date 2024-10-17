import 'dotenv/config';
import {default as Knex} from 'knex';

const knex = Knex({
	client: 'pg',
	connection: {
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		ssl: process.env.DB_SSL,
	},
});

const getAllUsers = async () => await knex('users');

const addUser = async ({name, phone, email, age}) => {
	await knex('users').insert({name, phone, email, age});
	console.log('Пользователь успешно добавлен');
};

const updateUser = async (id, user) => {
	await knex('users').where({id}).update(user);
};

const deleteUser = async (id) => {
	await knex('users').where({id}).del();
};

// const getUserByName = async name => await knex('users').where('name', '=', name); // '=' поиск по Полному имени, чувствителен к регистру
// const getUserByName = async name => await knex('users').where('name', 'ilike', name); // 'ilike' не чувствителен к регистру (почему-то не работает)
const getUserByName = async name => await knex('users').where('name', 'ilike', `%${name}%`); // поиск по части имени

const getUserByAge = async age => await knex('users').where('age', '>', age); // поиск по части имени

const init = async () => {
	const users = await getAllUsers();
	console.log('users: ', users);

	// await addUser({
	// 	name: 'Vlad',
	// 	phone: '+79999999999',
	// 	email: 'vlad@mail.ru',
	// 	age: 16,
	// });

	// await updateUser(3, {age: 32});

	// await deleteUser(5);

	// const allUsers = await getAllUsers();
	// console.log('users: ', allUsers);

	const user1 = await getUserByName('shustrova');
	console.log('user: ', user1);

	const user2 = await getUserByAge(40);
	console.log('user: ', user2);

	knex.destroy();
};

init();
