require('dotenv').config()

const {
    POSTGRE_URL,
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME
} = process.env

module.exports = {
    development: {
        use_env_variable: false,
        url: POSTGRE_URL,
        host: DATABASE_HOST,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        dialect: 'postgres',
        ssl: true,
        logging: false,
    }
}
