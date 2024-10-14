import 'dotenv/config';
import https from 'node:https';
import {showNews} from './showNes.js';
import {red} from 'colorette';

const API_KEY = process.env.API_KEY;

const encodeQuery = obj => {
	let queryStr = '';
	for (let key in obj) {
		if (obj[key] === '') continue;
		queryStr += `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}&`;
	}
	return queryStr.slice(0, -1);
}

export const getNews = query => {
	const queryString = encodeQuery(query);

	const options = {
		method: 'GET',
    hostname: 'newsapi.org',
    path: `/v2/top-headlines?${queryString}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
			'X-Api-Key': API_KEY || '',
      'User-Agent': 'NewsApp/1.0',
    },
  };

	const req = https.request(options, res => {
    let data = '';

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
			if (JSON.parse(data).totalResults === 0) {
				console.log(red('\nПо вашему запросу новостей не найдено\n'));
				process.exit();
			}
			showNews(JSON.parse(data).articles, query.pageSize);
    });

    res.on('error', err => {
      console.log(err);
    });
  });
  req.end();
};
