import crypto from 'node:crypto';
import {createReadStream, createWriteStream} from 'node:fs';
import {createGunzip} from 'node:zlib';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {readFile} from 'node:fs/promises';
import {pipeline} from 'node:stream/promises';

export const decompress = async inputFile => {
	if (!inputFile.length || path.extname(inputFile) !== '.gz') {
		console.log('Не указано имя файла или файл указан неверно');
		return;
	}

	if (!existsSync(inputFile)) {
		console.log('Указанного файла не существует!');
		return;
	}

	const __dirname = path.dirname(inputFile);
	const baseName = path.basename(inputFile).split('.')[0];
	const outputPath = path.join(__dirname, `${baseName.split('_')[0]}_new.${baseName.split('_')[1]}`);
	const hashOld = (await readFile(`${baseName}.sha256`)).toString();

	try {
		await pipeline(createReadStream(inputFile), createGunzip(), createWriteStream(outputPath));

		const data = await readFile(outputPath);
		const hash = crypto.createHash('sha256').update(data).digest('hex');

		hash === hashOld ?
			console.log(`Данные успешно распакованы в файл ${outputPath}. Хеши совпадают`) :
			console.log(`Ошибка распаковки ${outputPath}. Хеши не совпадают`);
	} catch (err) {
		console.error(`Ошибка: ${err}`);
	}
}
