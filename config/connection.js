const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.POSTGRE_URL, {
    // host: process.env.DATABASE_HOST,
    dialect: "postgres",
    logging: false
})

module.exports = sequelize