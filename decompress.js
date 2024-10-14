import {createReadStream, createWriteStream} from 'node:fs';
import {createGunzip} from 'node:zlib';
import zlib from 'node:zlib';
console.log('zlib: ', zlib);

// восстановление данных из сжатого формата
const inputFilePath = './lorem.gz';
const outputFilePath = './lorem_new.txt';

const input = createReadStream(inputFilePath);
const output = createWriteStream(outputFilePath);

input.pipe(createGunzip()).pipe(output);
console.log('Данные успешно распакованы');

