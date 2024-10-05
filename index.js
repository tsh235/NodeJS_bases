import readline from 'node:readline/promises';
import process from 'node:process';
import {readFile} from 'node:fs/promises';

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const questions = JSON.parse((await readFile('./question.json')).toString('utf8'));

const declOfNum = (num, words) =>
  num + ' ' + words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? Math.abs(num) % 10 : 5]];

const write = str => rl.output.write(str);
const clear = () => write('\x1bc');

const exitQuiz = async (correctAnswersCount) => {
	clear();
	write('Квиз завершен.\n');
	if (correctAnswersCount === questions.length) {
		write('Вы правильно ответили на все вопросы и заработали приз - скидка 99% на любой курс школы MethEd!\n');
	} else {
		write(`Вы верно ответили на ${declOfNum(correctAnswersCount, ['вопрос', 'вопроса', 'вопросов'])} из ${questions.length}.\n`);
		write('Приз остается у нас!\n');
	}

	const repeatAnswer = await rl.question('\nХотите попробовать еще раз? (да/нет):');

	repeatAnswer === 'да' || repeatAnswer === 'Да' ?
		startQuiz() :
		(
			write('\nДо новых встреч!\n'),
			rl.close()
		);
}

const startQuiz = async () => {
	let currentQuestion = 0;
	let correctAnswersCount = 0;

	clear();

	write('Привет! Это квиз на проверку знаний по Node.js и JavaScript.\n');
	write(`Ответьте правильно на ${declOfNum(questions.length, ['вопрос', 'вопроса', 'вопросов'])} и получите приз :)\n`);
	write('Для выбора варианта ответа введите его номер.\n');

	await rl.question('\nЕсли все понятно, нажмите Enter для запуска квиза:');

	const quiz = async (currentQuestion) => {
		const {question, options, correctIndex} = questions[currentQuestion];
		write(`\nВопрос ${currentQuestion + 1}. ${question}\n`);
		write('Варианты ответов:\n');

		options.forEach((item, i) => {
			write(`${i + 1}. ${item}\n`);
		});

		const answer = await rl.question('\nВведите ваш ответ: ');

		if (isNaN(answer) || +answer < 1 || +answer > options.length) {
			write('Такого варианта нет, попробуйте еще раз\n');
			quiz(currentQuestion);
		} else {
			currentQuestion++;

			if (+answer - 1 === correctIndex) {
				write('Ответ верный\n');
				correctAnswersCount++;
			} else {
				write('Ответ неправильный\n');
			}

			currentQuestion < questions.length ? quiz(currentQuestion) : exitQuiz(correctAnswersCount);
		}
	}

	quiz(currentQuestion);
}

startQuiz();
