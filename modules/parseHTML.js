import { green } from 'colorette';

const getTags = (data, arr) => {
	arr.forEach(item => {
		let startTag = -1;
		let endTag = -1;
		let count = 0;
		while (
			(startTag = data.indexOf(item, startTag + 1)) !== -1 &&
			(endTag = data.indexOf(`</${item.slice(1)}>`, endTag + 1)) !== -1
		) {
			count++;
			console.log(`${count}. ${data.substring(startTag, endTag + (item.length + 2))}`);
		}
	});
};

export const parseHTML = data => {
	const headers = ['<h1', '<h2', '<h3', '<h4', '<h5', '<h6'];
	const links = ['<a'];
	console.log(green('Заголовки, которые есть на этой html странице:'));
	getTags(data, headers);

	console.log();

	console.log(green('Ссылки, которые есть на этой html странице:'));
	getTags(data, links);
};
