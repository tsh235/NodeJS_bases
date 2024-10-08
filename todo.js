#!/usr/bin/env node

import {addTask} from './services/addTask.service.js';
import {changeStatus} from './services/changeStatus.service.js';
import {deleteTask} from './services/deleteTask.service.js';
import {getTask} from './services/getTask.service.js';
import {listTodo} from './services/listTodo.service.js';
import {updateTask} from './services/updateTask.service.js';
import {argsParse} from './utils/argsParse.js';

const app = () => {
	const args = argsParse(process.argv, ['add', 'list', 'get', 'update', 'status', 'delete']);

	if (args.h || args.help) {
		console.log(`
			Доступные команды:\n
			-h --help               | вывести список доступных команд
			add <название>          | добавить новую задачу
			list                    | вывести список задач
			get <id>                | вывести информацию о задаче с указанным идентификатором
			update <id> <newTask>   | обновить задачу с указанным идентификатором
			status <id> <newStatus> | обновить статус задачи с указанным идентификатором
			delete <id>             | удалить задачу с указанным идентификатором
		`);
		return;
	}

	if (args.add) {
		addTask(args.add);
		return;
	}

	if (args.list === true) {
		listTodo();
		return;
	}

	if (args.get) {
		getTask(args.get);
		return;
	}

	if (args.update) {
		updateTask(args.update);
		return;
	}

	if (args.status) {
		changeStatus(args.status);
		return;
	}

	if (args.delete) {
		deleteTask(args.delete);
		return;
	}

	console.log('Такая команда не предусмотрена');
	console.log('Используйте -h или --help для вывода списка доступных команд');
};

app();
