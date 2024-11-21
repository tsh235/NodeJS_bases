import {readFile, writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const filePath = path.join(os.homedir(), 'setting.genpass.json');

export const saveSetting = async options => {
	await writeFile(filePath, JSON.stringify(options), 'utf8');
};

export const getSetting = async () => {
	try {
		const data = await readFile(filePath, 'utf8');
		return JSON.parse(data)
	} catch {
		process.stdout.write('Отстутствует или недоступен файл настроек.\n');
		process.stdout.write('Для сохранения настроек используйте команду setting.\n\n');
	}
};
