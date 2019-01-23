# Установка
1. Установить Nodemon: `npm install -g nodemon`
2. Установить sequilize-cli: `npm install -g sequelize-cli`
3. `npm i`
4. Создать .env файл: `cp .env.example .env` и внести настройки подключения к БД Postgres
5. Выполнить миграцию БД `sequelize db:migrate`

# Запуск

`npm run start:dev` - запуск сервера в режиме разработки

