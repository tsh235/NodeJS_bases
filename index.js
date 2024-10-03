import { createReadStream, createWriteStream } from 'node:fs';
import { readdir } from 'node:fs/promises';

const mergingTxtFiles = async (sourceDir, outputFile) => {
	const wStream = createWriteStream(outputFile);

	try {
		const files = await readdir(sourceDir);

		files.forEach(file => {
			const ext = file.split('.').pop();

			if (ext === 'txt') {
				const rStream = createReadStream(`${sourceDir}/${file}`);

        rStream.on('data', chunk => {
          wStream.write(`[${file.split('.')[0]}]\n${chunk}\n`);
        });
			}
		});

		console.log(`Файл ${outputFile} успешно записан!`);
	} catch (err) {
		console.log(`Ошибка: ${err}`);
	}
};

mergingTxtFiles('./files', 'result.txt');
