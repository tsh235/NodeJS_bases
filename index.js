import fs from 'node:fs/promises';

const getTargetDir = async (targetDir) => {
	try {
		await fs.access(targetDir);
		return true;
	} catch (error) {
		return false;
	}
};

const copied = async (sourceDir, targetDir) => {
	const isTargetDirExist = await getTargetDir(targetDir); // получаем целевую директорию

	if (!isTargetDirExist) { // если она не существует, создаем
		await fs.mkdir(targetDir);
	}

	try {
		await fs.cp(sourceDir, targetDir, {recursive: true}); // копируем содержимое исходной папки в целевую папку
		return null;
	} catch (err) {
		console.error(`Не удалось произвести копирование: `, err);
		return err;
	}
};

const isSuccess = (result) => {
	if (result === null) {
		console.log('Копирование успешно произведено!');
	} else {
		console.error(`Не получилось: `, result);
	}
};

const copyDir = async (sourceDir, targetDir, cb) => {
	const result = await copied(sourceDir, targetDir);
	cb(result);
};

copyDir('./files', './newFolder', isSuccess);
