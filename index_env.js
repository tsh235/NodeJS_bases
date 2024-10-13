// Переменные окружения ENV
// все пишутся кемелкейс, между словами нижнее подчеркивание - т.е. это константы, менять мы их не можем

// import dotenv from 'dotenv';
// dotenv.config();

// можно импортировать таким образом, где конфиг самовызовится
import 'dotenv/config';

// console.log(process.env.PORT);

const port = process.env.PORT || 3000;

const dbUrl = process.env.DB_URL;
// connectToDataBase(dbUrl) // для БД mongoDB


