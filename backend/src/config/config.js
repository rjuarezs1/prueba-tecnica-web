export const {
  DB_HOST = process.env.DB_HOST,
  DB_PORT = process.env.DB_PORT,
  DB_USER = process.env.DB_USER,
  DB_PWD = process.env.DB_PWD,
  DB_NAME = process.env.DB_NAME,
} = process.env;

export const { PORT = 4003 } = process.env;

//dominios locales permitidos por el cross-origin resource sharing del api rest
export const urlOrigin = [
  "http://127.0.0.1:4002",
  "http://localhost:4002",
  "http://127.0.0.1:4003",
  "http://localhost:4003",
  "http://127.0.0.1:8080",
  "http://localhost:8080",
];
