import {access, stat} from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createReadStream} from 'node:fs';
import {createGzip} from 'node:zlib';

const PORT = 3000;
const dirPublic = './public';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getContentType = filePath => {
	const extname = path.extname(filePath);

	switch (extname) {
		case '.html':
			return 'text/html';
		case '.css':
			return 'text/css';
		case '.js':
			return 'application/javascript';
		case '.png':
			return 'image/png';
		case '.ico':
			return 'image/x-icon';
		case '.svg':
			return 'image/svg+xml';
		case '.woff2':
			return 'font/woff2';
		default:
			return 'application/octet-stream';
	}
}

http.createServer(async (req, res) => {
	const filePath = path.join(__dirname, dirPublic, req.url);
	console.log('filePath: ', filePath);

	try {
		await access(filePath);
		const fileStat = await stat(filePath);

		const fileStream = createReadStream(filePath);

		const acceptEncoding = req.headers['accept-encoding'];
		const contentType = getContentType(filePath);

		if (acceptEncoding && acceptEncoding.includes('gzip')) {
			res.writeHead(200, {
				'Content-Type': contentType,
				'Content-Encoding': 'gzip',
			});

			fileStream.pipe(createGzip()).pipe(res);
		} else {
			res.writeHead(200, {
				'Content-Type': contentType,
				'Content-Length': fileStat.size,
			});

			fileStream.pipe(res);
		}

	} catch (err) {
		console.error(err);
		res.writeHead(500, {'Content-Type': 'text/plain; charset=utf8'});
		res.end('Internal Server Error');
	}
})
.listen(PORT, () => {
	console.log('Server is run on port ' + PORT);
});
