import readline from 'node:readline/promises';
import process from 'node:process';

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// const answer = await rl.question('Hello, your name: ');
// console.log(`Hello, ${answer}`);

// rl.close();

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// 	prompt: '> ',
// });

// console.log('Hello, your name: ');
// rl.prompt();

// rl.on('line', answer => {
// 	console.log(`Hello, ${answer}`);
// 	// rl.prompt(); // будет снова спрашивать
// 	rl.close(); // закроет ридлайн, все зависит от точго что нужно от программы
// });

// console.dir({process});


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '> ',
});

console.log('Write command');
console.log('or help: ');
rl.prompt();

const commands = {
	help() {
		console.log('help', 'time', 'date', 'exit');
	},
	time() {
		const currentTime = new Date();
		console.log(currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds());
	},
	date() {
		const currentDate = new Date();
		const dateString = currentDate.toISOString().split('T')[0];
		console.log(dateString);
	},
	exit() {
		rl.close();
	},
};

rl.on('line', line => {
	const command = commands[line];
	if (command) {
		command();
	} else {
		console.log('No command!');
	}
	rl.prompt();
});

rl.on('close', () => {
	console.log('Good buy!');
	process.exit();
});
