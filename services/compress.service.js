import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import {createReadStream, createWriteStream, existsSync} from 'node:fs';
import {createGzip} from 'node:zlib';
import path from 'node:path';

export const compress = async inputFile => {
	if (!inputFile.length) {
		console.log('Не указано имя файла');
		return;
	}

	if (!existsSync(inputFile)) {
		console.log('Указанного файла не существует!');
		return;
	}

	const __dirname = path.dirname(inputFile);
	const fileName = path.basename(inputFile);
	const hashFileName = path.join(__dirname, fileName.replace('.', '_') + '.sha256');
	const gzipFileName = path.join(__dirname, fileName.replace('.', '_') + '.gz');

	try {
		const data = await readFile(inputFile);
		const hash = crypto.createHash('sha256').update(data).digest('hex');

		createWriteStream(hashFileName).write(hash);
		console.log(`Хеш успешно сохранен в файле: ${hashFileName}`);

		const input = createReadStream(inputFile);
		const output = createWriteStream(gzipFileName);

		input.pipe(createGzip()).pipe(output);
		console.log(`Данные успешно упакованы, архив находится здесь: ${gzipFileName}`);
	} catch (err) {
		console.error(`Ошибка: ${err}`);
	}
}
