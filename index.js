// ?Stream

// !Writable

import { createWriteStream } from 'node:fs';

const wStream = createWriteStream('./write.txt');

wStream.on('pipe', () => {
	console.log('PIPE - подключение к readable стриму');
});

wStream.on('unpipe', () => {
	console.log('UNPIPE - отключение от readable стрима');
});

wStream.on('finish', () => {
	console.log('FINISH - запись завершилась');
});

wStream.on('drain', () => {
	console.log('DRAIN - освободился буфер у writable');
});

wStream.on('error', (err) => {
	console.log('ERROR - ' + err);
});

wStream.on('close', () => {
	console.log('CLOSE - стрим закрыт');
});

wStream.write('Записываем данные\n');

const buffer = Buffer.from('Буфер\n');

// wStream.write(buffer);

// write принимает 3 всего параметра - буфер, кодировка и колбэк
wStream.write(buffer, 'utf8', () => {
	// колбек срабатывает тогда, когда данные записываются
	console.log('Данные записываются');
});

// данные можем закупорить и не записывать
wStream.cork(); // программа не завершилась, но и запись не произошла

// чтобы программа завершилась надо раскупорить данные
// wStream.uncork();

// можно это сделать через какое-то время
// это может пригодиться если большое кол-во маленьких кусочков данных
setTimeout(() => {
	wStream.uncork();
}, 2000);

// wStream.end('Закрываем стрим');

// wStream.write('Записываем данные\n'); // эти данные не запишутся, т.к. стрим закрыт

// грубое закрытие, событие finish не срабатывает и данные не успевают записаться
// wStream.destroy();

// если передать строку, то сработает событие error перед закрытием стрима
// wStream.destroy('Наша ошибка');


// !Readable

// !Duplex

// !Transform
