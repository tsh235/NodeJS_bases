import http from 'node:http';

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	// res.setHeader('Content-Type', 'text/plain; charset=utf8'); // отправка текста

	// res.setHeader('Content-Length', 23); // количество байт, если указать больше чем отправлено то будет ошибка, если меньше, то данные обрежутся
	// res.setHeader('Content-Lengt', 50); // количество байт, если указать больше чем отправлено то будет ошибка, если меньше, то данные обрежутся
	// res.setHeader('Content-Lengt', 10); // количество байт, если указать больше чем отправлено то будет ошибка, если меньше, то данные обрежутся
	// res.setHeader('Content-Lengt', Buffer.byteLength(data)); // так можно сообщить клиенты сколько данных ожидать

	// CACHE
	// res.setHeader('Cache-Control', 'no-cache'); // если хотим чтобы данные не кешировались на стороне клиента, и получались с сервера каждый раз
	// res.setHeader('Cache-Control', 'no-store'); // полный запрет кеширования реcурса
	// res.setHeader('Cache-Control', 'public'); // разрешаем кеширования реcурса и на серверах и в браузерах
	// res.setHeader('Cache-Control', 'private'); // разрешаем кеширования реcурса в браузерах, но запрещаем на прокси-серверах
	// res.setHeader('Cache-Control', 'max-age=60'); // кешируется на 60 секунд, через это время данные будут запрашиваться снова, без кеширования
	// res.setHeader('Cache-Control', 's-maxage=60'); // разрешаем кеширование в браузерах, но на прокси-серверах будет ограничение по времени

	// res.setHeader('Authorization', API_KEY); // использется клиентом при авторизации

	// res.setHeader('User-Agent', 'MethedApp/1.0'); // я браузер такой-то отправляю тебе запрос, а отвечает мне приложение MethedApp

	// если ресурса (страницы, ручки), который раньше существовал, больше нет, то перенаправляем на другой ресурс, нужно передать еще 302 statusCod
	// res.statusCode = 302;
	// res.setHeader('Location', 'https://yandex.ru');

	// CORS
	// res.setHeader('Access-Control-Allow-Origin', '*'); // разрешаем запросы к серверу кому угодно
	// res.setHeader('Access-Control-Allow-Origin', 'my-site.com'); // разрешаем запросы к серверу только с сайта my-site.com
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE'); // можно указать какие виды запросов принимаем
	// res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // можно указать какие заголовки принимаем

	// COOKIES
	// res.setHeader('Set-Cookie', 'sessionId=123456; Max-Age=3600; Secure; SameSite=None');
	// sessionId=123456 - выделяем клиенту сессию чтобы хранить его временные данные на сервере
	// SameSite=None - куки доступные только через https
	// Max-Age=3600 - время жизни куки
	// Secure - защищенная кука
	// можно передавать несколько куки (например это актуально для корзины товаров в ИМ)
	// res.setHeader('Set-Cookie', [
	// 	'sessionId=123456; Max-Age=3600; Secure; SameSite=None',
	// 	'userId=789',
	// ]);
	// можем считывать куки:
	// const cookies = req.headers.cookie;
	// console.log('cookies: ', cookies);

	res.end('Hello! This HTTP server'); // это те байты!
});

server.listen(3000, () => {
	console.log('Сервер слушает порт 3000');
});
