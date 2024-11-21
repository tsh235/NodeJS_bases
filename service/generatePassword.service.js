import {shuffle} from '../util/shuffle.util.js';

export const generatePassword = options => {
	let charset = 'abcdefghijklmnopqrstuvwxyz';

	if (options.uppercase) {
		charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}

	if (options.number) {
		charset += '1234567890';
	}

	if (options.special) {
		charset += '!@#$%^&*()_+';
	}

	const arr = shuffle(charset.split(''));

	arr.length = options.length;
	const password = arr.join('');
	return password;

};

