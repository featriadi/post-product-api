const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        allowNull: false
    },
    deletedAt: {
        field: 'deleted_at',
        type: DataTypes.DATE,
        allowNull: true
    },
})
