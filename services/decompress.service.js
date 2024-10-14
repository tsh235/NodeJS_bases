import crypto from 'node:crypto';
import {createReadStream, createWriteStream} from 'node:fs';
import {createGunzip} from 'node:zlib';
import {existsSync} from 'node:fs';
import {parse} from 'node:path';
import {readFile} from 'node:fs/promises';
import {pipeline} from 'node:stream/promises';

export const decompress = async inputFile => {
	if (!inputFile.length || parse(inputFile).ext.slice(1) !== 'gz') {
		console.log('Не указано имя файла или файл указан неверно');
		return;
	}

	if (!existsSync(inputFile)) {
		console.log('Указанного файла не существует!');
		return;
	}

	try {
		const inputFileName = parse(inputFile).name;
		const extName = inputFileName.split('_').pop();
		const fileName = inputFileName.split('_')[0];
		const dirPath = parse(inputFile).dir;

		const dirName = dirPath === '' ? './' : `${dirPath}/`;
		const outputPath = `${dirName}${fileName}_new.${extName}`;

		await pipeline(createReadStream(inputFile), createGunzip(), createWriteStream(outputPath));

		const data = await readFile(outputPath);
		const hash = crypto.createHash('sha256').update(data).digest('hex');

		const hashOld = (await readFile(`${dirName}${inputFileName}.sha256`)).toString();

		hash === hashOld ?
			console.log(`Данные успешно распакованы в файл ${outputPath}. Хеши совпадают`) :
			console.log(`Ошибка распаковки ${outputPath}. Хеши не совпадают`);
	} catch (err) {
		console.error(`Ошибка: ${err}`);
	}
}
