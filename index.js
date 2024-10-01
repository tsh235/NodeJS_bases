import { read } from './modules/read.js';
import { write } from './modules/write.js';

// const app = async () => {
// 	try {
// 		const data = await read('./files/text.txt');
// 		// const data = await read('./files/seltos.jpg');
// 		// const data = await read('./files/lonely.mp3');
// 		console.log('text: ', data);

// 		await write('./files/resultTxt.txt', data);
// 		// await write('./files/resultJpg.jpg', data);
// 		// await write('./files/resultMp3.mp3', data);

// 		console.log('Done');
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// const app = async () => {
// 	try {
// 		// создаем небезопасный буфер, резервируем место под буфер и указываем сколько памяти хотим выделить
// 		const bufferUnsafe = Buffer.allocUnsafe(1024);
// 		console.log('bufferUnsafe: ', bufferUnsafe);

// 		// создаем безопасный буфер, резервируем место под буфер и указываем сколько памяти хотим выделить
// 		// здесь вторым параметром можно передать какие-либо данные
// 		const bufferSafe = Buffer.alloc(1024, 'Изучаем Node.js');
// 		console.log('bufferSafe: ', bufferSafe);

// 		await write('./files/result.txt', data);

// 		console.log('Done');
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// const app = async () => {
// 	try {
// 		const bufferAllocUnsafe = Buffer.allocUnsafe(3);
// 		bufferAllocUnsafe.write('!!!')
// 		console.log('bufferAllocUnsafe: ', bufferAllocUnsafe);
// 		await write('./files/resultAU.txt', bufferAllocUnsafe);

// 		const bufferAlloc = Buffer.alloc(3, '!');
// 		console.log('bufferAlloc: ', bufferAlloc);
// 		await write('./files/resultA.txt', bufferAlloc);

// 		console.log('Done');
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// const app = async () => {
// 		try {
// 			// в данном случае буфер будет занимать столько памяти, сколько занимает переданный текст
// 			// т.е. мы не говорим сколько памяти выделить, просто создаем и записываем данные
// 			const bufferArr = Buffer.from('Изучаем Node.js');
// 			console.log('bufferArr: ', bufferArr.toString('utf8'));
// 			await write('./files/resultArray.txt', bufferArr);

// 			const bufferArr1 = Buffer.from([10, 15, 20, 5]); // это десятиричные символы в системе
// 			console.log('bufferArr1: ', bufferArr1);

// 			const bufferArr2 = Buffer.from([78, 111, 100, 101]); // чтобы получить 16ричные надо отстчитать по таблице символ
// 			console.log('bufferArr2: ', bufferArr2);

// 			const bufferArr3 = Buffer.concat([bufferArr1, bufferArr2]);
// 			console.log('bufferArr3: ', bufferArr3);
// 			console.log('bufferArr3: ', bufferArr3.toString('utf8'));

// 			console.log('Done');
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	}

const app = async () => {
	try {
		// сравнение буферов
		const bufferStr1 = Buffer.from('Изучаем Node.js');
		const bufferStr2 = Buffer.from('Изучаем Node.js');
		const bufferStr3 = Buffer.from('Изучаем Nodejs');

		console.log('bufferStr1.equals(bufferStr2): ', bufferStr1.equals(bufferStr2));
		console.log('bufferStr1.equals(bufferStr3): ', bufferStr1.equals(bufferStr3));

		// ------------------------------
		const bufferStr = Buffer.from('Изучаем Buffer в Node.js');
		console.log('bufferStr: ', bufferStr.toString('utf8', 15, 19)); // вырезка буфера с 15 по 19 байт (не символ!)
		console.log('bufferStr: ', bufferStr.indexOf('Node')); // определенеи позиции символов
		console.log('bufferStr: ', bufferStr.toString('utf8', bufferStr.indexOf('Node'))); // вырезка буфера начиная с Node и до конца

		// вырезка буфера начиная с определенного символа + количество символов после
		const n = bufferStr.indexOf('Node');
		console.log('bufferStr: ', bufferStr.toString('utf8', n, n + 5));

		// проверяем содержится ли строчка или нет
		console.log('bufferStr: ', bufferStr.includes('uff'));

		// также вырезка начиная с 25 байта и до конца
		console.log('bufferStr: ', bufferStr.subarray(25).toString());

		// приведение в json. Содержит тип и данные, где содержаться все символы буфера в 10ричном виде
		console.log('bufferStr: ', bufferStr.toJSON());

		// проверка является ли буфер буфером
		console.log('bufferStr: ', Buffer.isBuffer(bufferStr));


		console.log('Done');
	} catch (err) {
		console.error(err);
	}
}

app();
