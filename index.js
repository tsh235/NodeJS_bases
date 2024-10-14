#!/usr/bin/env node

import process from 'node:process';
import {argsParse} from './utils/argsParse.js';
import {compress} from './services/compress.service.js';
import {decompress} from './services/decompress.service.js';

const app = () => {
  const args = argsParse(process.argv);

  if (args.compress) {
    compress(args.compress);
		return;
  }

  if (args.decompress) {
    decompress(args.decompress);
		return;
  }

  console.log(`
  -compress <имя файла>    | Создание хеш файла, а также сэатие исходного файла
  -decompress <имя файла>  | Распаковка файла и проверка целостности файла
  `);
};

app();
