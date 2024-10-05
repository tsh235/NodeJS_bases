console.log('Hello, Node.js');
import readline from 'node:readline/promises';
import process from 'node:process';
import {readFile} from 'node:fs/promises';
import { blue, red, green, yellow, magenta, bgRed, bgGreen } from "colorette";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const questions = JSON.parse((await readFile('./question.json')).toString('utf8'));

const declOfNum = (num, words) =>
  num + ' ' + words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? Math.abs(num) % 10 : 5]];

const write = str => rl.output.write(str);
const clear = () => write('\x1bc');

const pos = (row, col) => write(`\x1b[${row};${col}H`);

const border = [
	magenta('┌'),
	magenta('─'),
	magenta('┐'),
	magenta('│'),
	magenta('└'),
	magenta('┘'),
	green('█'),
	red('█')
];

const box = (row, col, height, width) => {
  const w = width - 2;
  const h = height - 2;
  pos(row, col);

  write(border[0] + border[1].repeat(w) + border[2]);

  for (let i = 1; i < h; i++) {
    pos(row + i, col);
    write(border[3] + ' '.repeat(w) + border[3]);
  }

  pos(row + h, col);

  write(border[4] + border[1].repeat(w) + border[5]);
};

const startQuiz = async () => {
	let currentQuestion = 0;
	let correctAnswersCount = 0;
	let questionResult = '';
	let answerIndex = [];
	let showError = false;

	const showProgress = (currentQuestion) => {
		clear();
		box(1, 0, 7, 26);
  	pos(2, 3);
		write(blue(`Вопросов: ${currentQuestion} из ${questions.length}`));
		box(3, 3, 4, 22);
		let i = 0;
		for (i; i < currentQuestion; i++) {
			if (answerIndex.includes(i)) {
				pos(4, 5 + i);
				write(bgGreen(' '));
			} else {
				pos(4, 5 + i);
				write(bgRed(' '));
			}
		}

		for (let j = i + 1; j <= questions.length; j++) {
			pos(4, 5 + j);
			write(' ');
		}

		if (showError) {
			pos(7, 0);
			write(red('Такого варианта нет, попробуйте еще раз'));
			return;
		} else {
			pos(7, 0);
			write(questionResult);
		}
		pos(7, 0);
	};

	const exitQuiz = async (correctAnswersCount) => {
		showProgress(questions.length);
		pos(7, 0);
		write('---------------------- \n');
		write('Квиз завершен!\n');
		if (correctAnswersCount === questions.length) {
			write(green('Вы правильно ответили на все вопросы и заработали приз - скидка 99% на любой курс школы MethEd!\n'));
			write('\nДо новых встреч!\n')
			rl.close();
		} else {
			write(blue(`Вы верно ответили на ${declOfNum(correctAnswersCount, ['вопрос', 'вопроса', 'вопросов'])} из ${questions.length}.\n`));
			write(blue('и, к сожалению, не получаете приз...\n'));
			const repeatAnswer = await rl.question('\nХотите попробовать еще раз? (да/нет):');

			repeatAnswer === 'да' || repeatAnswer === 'Да' ?
				startQuiz() :
				(
					write('\nДо новых встреч!\n'),
					rl.close()
				);
		}
	}

	clear();

	write('Привет! Это квиз на проверку знаний по Node.js и JavaScript.\n');
	write(`Ответьте правильно на ${declOfNum(questions.length, ['вопрос', 'вопроса', 'вопросов'])} и получите приз :)\n`);
	write('Для выбора варианта ответа введите его номер.\n');

	await rl.question('\nЕсли все понятно, нажмите Enter для запуска квиза:');

	clear();

	const quiz = async (currentQuestion) => {
		showProgress(currentQuestion);
		const {question, options, correctIndex} = questions[currentQuestion];

		write(yellow(`\nВопрос ${currentQuestion + 1}. ${question}\n`));
		write('Варианты ответов:\n');

		options.forEach((item, i) => write(`${i + 1}. ${item}\n`));

		const answer = await rl.question(blue('\nВведите ваш ответ: '));
		console.log('answer: ', answer);

		if (isNaN(answer) || +answer < 1 || +answer > options.length) {
			showError = true;
			quiz(currentQuestion);
		} else {
			currentQuestion++;
			showError = false;
			if (+answer - 1 === correctIndex) {
				questionResult = green('Ответ верный\n');
				correctAnswersCount++;
				answerIndex.push(currentQuestion - 1);
			} else {
				questionResult = red('Ответ неправильный\n');
			}
			currentQuestion < questions.length ? quiz(currentQuestion) : exitQuiz(correctAnswersCount);
		}
	}

	quiz(currentQuestion);
}

clear();
startQuiz();
