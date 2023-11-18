require('dotenv').config()

module.exports = {
    development: {
        url: process.env.POSTGRE_URL,
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        dialect: 'postgres',
        ssl: true,
        logging: false,
    }
}
