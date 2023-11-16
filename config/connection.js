const sequelize = require('../config/database')

async function connection() {
    try {
        await sequelize.authenticate().then(() => console.log('Connected to database.'))
    } catch (error) {
        console.log("Could not connect to database.", error)
    }
}

module.exports = { connection }