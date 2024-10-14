import crypto from 'node:crypto';
// import { readFile } from 'node:fs/promises';

// const data = 'Hello world!';
// const hashData = crypto.createHash('sha256').update(data).digest('hex');
// const fileImg = await readFile('./public/img/likemen.png');
// const hashFileImg = crypto.createHash('sha256').update(fileImg).digest('hex');

// const fileJs = await readFile('./public/js/script.js');
// const hashFileJs = crypto.createHash('sha256').update(fileJs).digest('hex');

// console.log('data: ', data);
// console.log('hash: ', hashData);
// console.log('file: ', fileImg);
// console.log('hashFileImg: ', hashFileImg);

// console.log('fileJs: ', fileJs);
// console.log('hashFileJs: ', hashFileJs);

// Получение случайных данных
// const randomBytes = crypto.randomBytes(16);
// console.log('randomBytes: ', randomBytes);
// console.log('randomBytes(string): ', randomBytes.toString());
// console.log('randomBytes(hex): ', randomBytes.toString('hex'));
// console.log('randomBytes(base64): ', randomBytes.toString('base64'));
// console.log('randomBytes(binary): ', randomBytes.toString('binary')); // можно написать toString('latin1') это тоже самое что binary

// Шифровка и дешифровка данных
const key = crypto.randomBytes(32);
const iv  = crypto.randomBytes(16);
const algoritm = 'aes-256-cbc';

const text = 'Hello, NodeJS Crypto!';

const cipher = crypto.createCipheriv(algoritm, key, iv);
let encrypted = cipher.update(text, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('encrypted: ', encrypted);

const decipher = crypto.createDecipheriv(algoritm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('decrypted: ', decrypted);
