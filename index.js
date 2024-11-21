#!/usr/bin/env node

import {getNews} from './modules/getNews.js';
import { argsParse } from './utils/argsParse.js';

const app = () => {
	const langs = ['ar', 'de', 'en', 'es', 'fr', 'he', 'it', 'nl', 'no', 'pt', 'ru', 'sv', 'ud', 'zh'];
	const cats = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

	const args = argsParse(process.argv);

	const options = {
    pageSize: 10,
  };

	if (args.h || args.help) {
    console.log(`
    -h --help | список команд (игнор других команд)
    -q        | поиск новостей по ключевым словам
    -l        | выбор языка новостей
    -с        | выбор категории новостей (опционально)
    -s        | количество новостей на странице (опционально)
    `);
    return;
  }

	if (Object.keys(args) === 0) {
		options.country = 'ru';
		getNews(options);
		process.exit();
	}

	if (args.q) {
		options.q = args.q;
	}

	if (args.l) {
		if (langs.includes(args.l)) {
			options.language = args.l;
		} else {
			console.log(`Язык не известен. Доступные языки: ${langs.join(', ')}`);
			process.exit();
		}
	}

	if (args.c) {
		if (!args.l && !args.q) {
			console.log('Укажите хотя бы один из обязательных запросов: язык или поисковую строку');
			process.exit();
		}

		if (cats.includes(args.c)) {
			options.category = args.c;
		} else {
			console.log(`Неверный запрос. Доступные категории: ${cats.join(', ')}`);
			process.exit();
		}
	}

	if (args.s) {
		if (!args.l && !args.q) {
			console.log('Укажите хотя бы один из обязательных запросов: язык или поисковую строку');
			process.exit();
		}

		if (!isNaN(args.s) || +args.s <= 100) {
      options.pageSize = args.s;
    } else {
      console.log('Количество новостей должно быть числом и не больше 100');
      return;
    }
	}

	getNews(options);
};

app();
