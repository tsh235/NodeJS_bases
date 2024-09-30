import { EventEmitter } from 'node:events';
import fs from 'node:fs/promises';

class Logger extends EventEmitter {
  constructor(filename, maxSize) {
    super();
    this.filename = filename;
    this.maxSize = maxSize;
    this.logQueue = [];
    this.writing = false;
  }

  log(message) {
    this.logQueue.unshift(message);
    if (!this.writing) {
			this.writeLog();
      this.writing = true;
    }
  }

	async writeLog() {
    this.emit('messageLogged', this.logQueue);
		const logs = this.logQueue.join('\n');
		this.logQueue = [];

    try {
			const oldLogs = `${await fs.readFile(this.filename)}\n`;
      await fs.writeFile(this.filename, `${logs}\n${oldLogs}`);
    } catch (err) {
			console.error('Ошибка при записи в файл', err);
    }

    await this.checkFileSize();

    if (this.logQueue.length > 0) {
      this.writeLog();
			this.writing = true;
    } else {
      this.writing = false;
    }
  }

	async getFileSize() {
		try {
			const stats = await fs.stat(this.filename);
			return stats.size;
		} catch (err) {
			console.log(`Ошибка получения информации о сайте: ${err.message}`);
			return 0;
		}
	}

  async checkFileSize() {
    if ((await this.getFileSize()) > this.maxSize) {
      this.rotateLog();
    }
  }

	async rotateLog() {
		try {
			await fs.copyFile(this.filename, `${this.filename}.bak`);
			await fs.truncate(this.filename, this.maxSize);
		} catch (err) {
			console.error(err.message);
		}
	}
}

const logger = new Logger('log.txt', 1024);

logger.on('messageLogged', message => {
  console.log('Записано сообщение:', message);
});

for (let i = 1; i <= 70; i++) {
	logger.log(`Сообщение #${i}`);
}
