import {createReadStream, createWriteStream} from 'node:fs';
import {access, constants, mkdir, readdir} from 'node:fs/promises';
import {pipeline} from 'node:stream/promises';
import sharp from 'sharp';

const resizeImage = async (inputPath, outputPath) => {
	try {
		await pipeline(
			createReadStream(inputPath),
			sharp().resize(400, 400).toFormat('jpeg'),
			createWriteStream(outputPath),
		)
	} catch (err) {
		console.error(err);
	}
};

const greyscaleImage = async (inputPath, outputPath) => {
	try {
		await pipeline(
			createReadStream(inputPath),
			sharp().greyscale().toFormat('jpeg'),
			createWriteStream(outputPath),
		)
	} catch (err) {
		console.error(err);
	}
};

const blurImage = async (inputPath, outputPath, value = 5) => {
	try {
		await pipeline(
			createReadStream(inputPath),
			sharp().blur(value).toFormat('jpeg'),
			createWriteStream(outputPath),
		)
	} catch (err) {
		console.error(err);
	}
};

const getOutputDir = async (outputPath) => {
	try {
		await access(outputPath);
		return;
	} catch (error) {
		mkdir(outputPath);
	}
};

const convertImage = async (inputPath, outputPath) => {
	await getOutputDir(outputPath);

	const images = await readdir(inputPath);

	images.forEach(img => {
		resizeImage(
			`${inputPath}/${img}`,
			`${outputPath}/${img.split('.')[0]}_resize.jpg`
		);

		greyscaleImage(
			`${inputPath}/${img}`,
			`${outputPath}/${img.split('.')[0]}_grey.jpg`
		);

		blurImage(
			`${inputPath}/${img}`,
			`${outputPath}/${img.split('.')[0]}_blur.jpg`,
			10
		);
	});
}

convertImage('./images', './converted_images');
