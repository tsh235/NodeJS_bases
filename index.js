#!/usr/bin/env node
// выше - указание того, что данный код должен выполняться в node.js
// далее нужно установить права на выполнение файла
// в терминале написать команду chmod +x index.js
// теперь для запуска приложения в терминале надо ввести команду ./index.js и нажать Enter

// const args = process.argv;
// console.log('args: ', args); // выведет массив из путей где нода установлена и путь до запуска

// args:  [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\NDKL-8\\Desktop\\LEARNING\\NodeJS\\NodeJS\\index.js'
// ]

// если теперть написать в терминале "./index.js привет мир", то в массив добавятся еще 2 элемента "привет" и "мир"

// args:  [
//   'C:\\Program Files\\nodejs\\node.exe',
//   'C:\\Users\\NDKL-8\\Desktop\\LEARNING\\NodeJS\\NodeJS\\index.js',
//   'привет',
//   'мир'
// ]


// если не нужны путь для ноды и до файла, то пишем:
const args = process.argv.slice(2);
console.log('args: ', args);
// ./index.js привет мир
// args:  [ 'привет', 'мир' ]

// ./index.js Maks
console.log('Привет, ', args[0]);
// Привет, Maks
