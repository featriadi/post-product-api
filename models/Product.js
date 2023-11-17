const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productName: {
        field: 'product_name',
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.NUMBER,
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