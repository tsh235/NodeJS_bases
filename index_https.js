import {readFileSync} from 'node:fs';
import https from 'node:https';

const options = { // самоподписанный сертификат, он не будет доверенным в браузерах
	// и для реальных проектов нужно использовать ssl сертификаты от надежных удостоверяющих центров
	key: readFileSync('server-key.pem'),
	cert: readFileSync('server-cert.pem'),
}

const server = https.createServer(options, (req, res) => {
	res.statusCode = 200;
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf8'});

	res.end('Hello! This HTTP server');
});

server.listen(443, () => { // стандартно https сервер запускается на 443 порту, а http на 3000
	console.log('Сервер слушает порт 443');
})
