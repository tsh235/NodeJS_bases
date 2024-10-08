#!/usr/bin/env node

import {generatePassword} from './service/generatePassword.service.js';
import {getPasswordOptions} from './service/getPasswordOptions.service.js';
import {getSetting, saveSetting} from './service/setting.service.js';
import {argsParse} from './util/argsParse.js';

const app = async () => {
	const args = argsParse(process.argv, ['ask', 'setting']);

	if (args.h || args.help) {
		console.log(`
		-h --help      | список команд (игнорирует другие команды)
		-l --length    | длина пароля
		-u --uppercase | включить заглавные буквы
		-n --number    | включить числа
		-s --special   | включить спецсимволы
		ask -a --ask   | провести опрос	(игнорирует другие команды)
		setting        | сохраняет настройки из параметров -l -u -n -s
		`);

		process.exit();
	}

	if (args.a || args.ask) {
		console.log('Ответьте на вопросы:');
		const options = await getPasswordOptions();
		const password = generatePassword(options);
		process.stdout.write(`Пароль: '${password}'\n`);
		process.exit();
	}

	const options = {
		length: 16,
		number: false,
		uppercase: false,
		special: false,
	};

	if (!args.setting) {
		const setting = await getSetting();
		Object.assign(options, setting);
	}

	if (args.l || args.length) {
		options.length = +(args.l || args.length);
	}

	if (args.u || args.uppercase) {
		options.uppercase = args.u || args.uppercase;
	}

	if (args.n || args.number) {
		options.number = args.n || args.number;
	}

	if (args.s || args.special) {
		options.special = args.s || args.special;
	}

	if (args.setting) {
		await saveSetting(options);
		process.exit();
	}

	const password = generatePassword(options);
	process.stdout.write(`Пароль: '${password}'\n`);
	process.exit();
};

app();
