import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {createReadStream, createWriteStream, existsSync} from 'node:fs';
import {createGzip} from 'node:zlib';
import {parse} from 'node:path';

export const compress = async inputFile => {
	console.log('inputFile: ', inputFile);
	if (!inputFile.length) {
		console.log('Не указано имя файла');
		return;
	}

	if (!existsSync(inputFile)) {
		console.log('Указанного файла не существует!');
		return;
	}

	try {
		const data = await readFile(inputFile);
		const hash = crypto.createHash('sha256').update(data).digest('hex');

		const extname = parse(inputFile).ext.slice(1);
		const fileName = parse(inputFile).name;
		const dirPath = parse(inputFile).dir;

		const dirName = dirPath === '' ? './' : `${dirPath}/`;

		const outputHashFilePath = `${dirName}${fileName}_${extname}.sha256`;
		createWriteStream(outputHashFilePath).write(hash);
		console.log(`Хеш успешно сохранен в файле: ${outputHashFilePath}`);

		const outputGzipFilePath = `${dirName}${fileName}_${extname}.gz`;
		const input = createReadStream(inputFile);
		const output = createWriteStream(outputGzipFilePath);

		input.pipe(createGzip()).pipe(output);
		console.log(`Данные успешно упакованы, архив находится здесь: ${outputGzipFilePath}`);
	} catch (err) {
		console.error(`Ошибка: ${err}`);
	}
}
