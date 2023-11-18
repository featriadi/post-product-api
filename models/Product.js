module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productName: {
            field: 'product_name',
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
    }, {
        tableName: 'products',
        timestamps: true
    })

    Product.associate = function(models) {
        Product.belongsTo(models.User, { foreignKey: 'user_id' })
    }

    return Product
}