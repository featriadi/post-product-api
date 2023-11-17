require('dotenv').config()

const {
    DATABASE_HOST,
    DATABASE_USERNAME,
    DATABASE_PASSWORD,
    DATABASE_NAME
} = process.env

module.exports = {
    development: {
        host: DATABASE_HOST,
        username: DATABASE_USERNAME,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        dialect: "postgres",
        logging: false
    }
}
