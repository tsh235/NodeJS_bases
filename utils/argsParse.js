export const argsParse = ([, , ...argv], words = []) => {

  const args = {};

  for (const key of words) {
    args[key] = key === argv[0];
  }

  if (words.includes(argv[0])) {
    args[args[0]] = true;
  }

  for (let i = 0; i < argv.length; i++) {
    if (argv[i][0] !== '-')
      continue;

    if (argv[i + 1] && argv[i + 1][0] !== '-') {
      if (argv[i].startsWith('--'))
        args[argv[i].substring(2)] = argv[i + 1];
      else
        args[argv[i].substring(1)] = argv[i + 1];

      continue;
    }

    if (argv[i].startsWith('--')) {
      if (argv[i].includes('=')) {
        const [key, value] = argv[i].split('=');
        args[key.substring(2)] = value;
      } else {
        args[argv[i].substring(2)] = true;
      }

      continue;
    }

    if (argv[i].startsWith('-no-')) {
      args[argv[i].substring(4)] = false;
      continue;
    }

    args[argv[i].substring(1)] = true;
  }
  return args;
};
