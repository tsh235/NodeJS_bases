import { Buffer } from 'node:buffer';

const textToBuffer = (text, encoding) => Buffer.from(text, encoding);

const bufferToText = (buffer, encoding) => Buffer.from(buffer, encoding).toString(encoding);

// Проверка решения
const text = 'Привет, мир!';
const utf8Buffer = textToBuffer(text, 'utf8');
console.log('utf8Buffer: ', utf8Buffer);

const decodedText = bufferToText(utf8Buffer, 'utf8');
console.log('decodedText: ', decodedText);

// Проверка решения: текст из UTF-8 в Base64 и обратно
const buff = textToBuffer(text, 'utf8');
const base64Buffer = bufferToText(buff, 'base64');
console.log('base64Buffer: ', base64Buffer);

const decodedTextBase64 = textToBuffer(base64Buffer, 'base64');
const decodedTextUtf8 = bufferToText(decodedTextBase64, 'utf8');
console.log('decodedTextUtf8: ', decodedTextUtf8);
