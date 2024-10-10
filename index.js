import readline from 'node:readline/promises';
import process from 'node:process';
import {readdir, readFile, writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const questions = async () => {
	const findFolder = await rl.question('Введите путь к директории: ');
	const searchStr = await rl.question('Введите строку для поиска: ');
	const replaceStr = await rl.question('Введите строку для замены: ');
	return {findFolder, searchStr, replaceStr};
};

const getFileContent = async (path) => {
	try {
		return await readFile(path, 'utf8');
	} catch (err) {
		console.error(`Ошибка чтения файла ${path}: ${err.message}`);
	}
};

const replaceFileContent = (data, searchStr, replaceStr) => {
	let newData = data;

	do {
		newData = newData.replace(searchStr, replaceStr);
	} while (newData.indexOf(searchStr) !== -1);

	return newData;
};

const writeNewContent = async (data, filePath) => {
	try {
		await writeFile(filePath, data, 'utf8');
		console.log('Замена успешно произведена');
		process.exit();
	} catch (err) {
		console.error(`Ошибка записи: ${err.message}`);
	}
};

const searchAndReplace = async () => {
	const {findFolder, searchStr, replaceStr} = await questions();

	const folder = findFolder.trim();
	const search = searchStr.trim();
	const replace = replaceStr.trim();

	if (!folder) {
    console.log('Не указана директория поиска');
    process.exit();
  } else {
		if (!existsSync(folder)) {
			console.log(`Директории: ${folder} не существует`);
			process.exit();
		}
	}

	if (!search) {
    console.log('Не указана строка для поиска');
    process.exit();
  }

	if (!replace) {
    console.log('Не указана строка для замены');
    process.exit();
  }

	const files = await readdir(folder);

	files.forEach(async file => {
		const filePath = path.join(folder, file);

		if (path.extname(filePath) === '.txt') {
			const content = await getFileContent(filePath);
			const newContent = await replaceFileContent(content, search, replace);
			writeNewContent(newContent, filePath);
		}
	});
}

searchAndReplace();
