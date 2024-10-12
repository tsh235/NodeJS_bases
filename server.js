import {createServer} from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import {parse} from 'node:url';

const server = createServer(async(req, res) => {
	const {method, url} = req;
	const parsedUrl = parse(url, true);

	// Получение юзеров
	if (method === 'GET' && parsedUrl.pathname.startsWith('/users')) {
		try {
			const data = await readFile('users.json', 'utf8');
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(data);
		} catch (err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'text/plain; charset=utf8');
			res.end('Server Error');
		}

		return;
	}

	// Добавление данных на сервер для обработки или сохранения
	if (method === 'POST' && parsedUrl.pathname.startsWith('/users')) {
		if (req.headers['content-type'] !== 'application/json') {
			res.statusCode = 415; // сервер не принимает запрос, т.к. содержимое не поддерживается сервером (неверный формат данных)
			res.setHeader('Content-Type', 'text/plain; charset=utf8');
			return res.end('Данные можно отправлять только в формате json')
		}

		let body = '';
		req.on('data', chunk => {
			body += chunk;
		});

		req.on('end', async () => {
			try {
				const userData = JSON.parse(body);
				userData.id = Math.random().toString(36).substring(2, 10);

				// !todo проверить данные пользователя

				const data = await readFile('users.json', 'utf8');
				const users = JSON.parse(data);
				users.push(userData);

				await writeFile('users.json', JSON.stringify(users), {encoding: 'utf8'});
				res.statusCode = 201;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(userData));
			} catch (err) {
				console.log('err: ', err);
				res.statusCode = 400;
				res.setHeader('Content-Type', 'text/plain; charset=utf8');
				res.end('Неверный формат данных');
			}
		});

		return;
	}

	// Удаление юзера
	if (method === 'DELETE' && parsedUrl.pathname.startsWith('/users/')) {
		// const userId = parsedUrl.pathname.substring(7);
		const userId = parsedUrl.pathname.split('/')[2];
		try {
			const data = await readFile('users.json', 'utf8');

			const users = JSON.parse(data);
			const index = users.findIndex(user => user.id === userId);

			if (index === -1) {
				res.statusCode = 404;
				res.setHeader('Content-Type', 'text/plain; charset=utf8');
				return res.end(`Пользователь с id ${userId} не найден`);
			}

			users.splice(index, 1);

			await writeFile('users.json', JSON.stringify(users), {encoding: 'utf8'});

			res.statusCode = 204;
			res.setHeader('Content-Length', '0');
			res.end();
		} catch (err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'text/plain; charset=utf8');
			res.end('Server Error');
		}

		return;
	}

	// Обновление всех данных о юзере
	if (method === 'PUT' && parsedUrl.pathname.startsWith('/users/')) {
		const userId = parsedUrl.pathname.split('/')[2];
		let body = '';

		req.on('data', chunk => {
			body += chunk;
		});

		req.on('end', async () => {
			try {
				const userData = JSON.parse(body);
				const data = await readFile('users.json', 'utf8');
				const users = JSON.parse(data);

				const updatedUsers = users.map(user => {
					if (user.id === userId) {
						userData.id = userId;
						return userData;
					}

					return user;
				});

				await writeFile('users.json', JSON.stringify(updatedUsers), {encoding: 'utf8'});

				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end(`Данные пользователя с id ${userId} успешно обновлены`);
			} catch (err) {
				console.log('err: ', err);
				res.statusCode = 500;
				res.setHeader('Content-Type', 'text/plain; charset=utf8');
				res.end('Server Error');
			}
		});

		return;
	}

	// Обновление данных о юзере частично
	if (method === 'PATCH' && parsedUrl.pathname.startsWith('/users/')) {
		const userId = parsedUrl.pathname.split('/')[2];
		let body = '';

		req.on('data', chunk => {
			body += chunk;
		});

		req.on('end', async () => {
			try {
				const userData = JSON.parse(body);
				const data = await readFile('users.json', 'utf8');
				const users = JSON.parse(data);
				const index = users.findIndex(user => user.id === userId);

				if (index === -1) {
					res.statusCode = 404;
					res.setHeader('Content-Type', 'text/plain; charset=utf8');
					return res.end(`Пользователь с id ${userId} не найден`);
				}

				const updatedUsers = users.map(user => {
					if (user.id === userId) {
						return {...user, ...userData}
					}

					return user;
				});

				await writeFile('users.json', JSON.stringify(updatedUsers), {encoding: 'utf8'});

				res.statusCode = 200;
				res.setHeader('Content-Type', 'text/plain');
				res.end(`Частичное обновление данных пользователя с id ${userId} успешно произведено`);
			} catch (err) {
				console.log('err: ', err);
				res.statusCode = 500;
				res.setHeader('Content-Type', 'text/plain; charset=utf8');
				res.end('Server Error');
			}
		});

		return;
	}

	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain; charset=utf8');
	res.end('Not found');
});

server.listen(3000, 'localhost', () => {
	console.log('Сервер запущен по адресу http://localhost:3000');
});
