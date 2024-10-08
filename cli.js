#!/usr/bin/env node

import {generatePassword} from './service/generatePassword.service.js';
import {argsParse} from './util/argsParse.js';

const app = () => {
	const args = argsParse(process.argv);

	const options = {
		length: 16,
		number: false,
		uppercase: false,
		special: false,
	};

	if (args.a || args.ask) {
		// TODO сделать опрос пользователя
		generatePassword(options);
		return;
	}

	if (args.h || args.help) {
		console.log(`
		-h --help      | список команд (игнорирует другие команды)
		-l --length    | длина пароля
		-u --uppercase | включить заглавные буквы
		-n --number    | включить числа
		-s --special   | включить спецсимволы
		-a --ask       | провести опрос	(игнорирует другие команды)
		`);

		return;
	}

	if (args.l || args.length) {
		console.log(`Длина: ${args.l || args.length}`);
		options.length = args.l || args.length;
	}

	if (args.u || args.uppercase) {
		console.log('Прописные буквы');
		options.uppercase = args.u || args.uppercase;
	}

	if (args.n || args.number) {
		console.log('Цифры');
		options.number = args.n || args.number;
	}

	if (args.s || args.special) {
		console.log('Спецсимволы');
		options.special = args.s || args.special;
	}

	console.log('options: ', options);
	generatePassword(options);
};

app();
