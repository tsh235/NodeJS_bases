import {EventEmitter} from 'node:events';

class EE extends EventEmitter {};
const ee = new EE();

ee.on('tick', (x) => {
	console.log('Tick -', x);
});

let n = 0;
setInterval(() => {
	n++;
	if (n <= 10) {
		ee.emit('tick', n);
	}
}, 1000);

const Lesson4_2 = () => {
	class SM extends EventEmitter {};
	const sm = new SM();

	const sendMessage = (username, message) => {
		sm.emit('send', username, message);
	};

	const recieveMessage = () => {
		sm.on('send', (username, message) => {
			console.log(`${username} - ${message}`)
		})
	};
	recieveMessage();
	sendMessage('Tatyana', 'Не поняла второе задание. Откуда (через что) пользователь отправляет сообщения?');
	sendMessage('Alexandr', 'вот я говорил про то, что закончились простые задания :)');
};

setTimeout(() => {
	Lesson4_2();
}, 12000);
