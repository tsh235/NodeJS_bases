import readline from 'node:readline/promises';
import process, {stdout} from 'node:process';

const rl = readline.createInterface({
	input: process.stdin,
	output: stdout,
});

export const getPasswordOptions = async () => {
	const length = parseInt(await rl.question('Длина пароля [8]: ')) || 8;
	const uppercase = ((await rl.question('Включаем ли заглавные буквы? (y/n) [y]: ')).toLowerCase() || 'y') === 'y';
	const number = ((await rl.question('Включаем ли цифры? (y/n) [y]: ')).toLowerCase() || 'y') === 'y';
	const special = ((await rl.question('Включаем ли спецсимволы? (y/n) [y]: ')).toLowerCase() || 'y') === 'y';

	return {length, uppercase, number, special};
}
