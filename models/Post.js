module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
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
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
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
        tableName: 'posts',
        timestamps: true
    })

    Post.associate = function(models) {
        Post.belongsTo(models.User, { foreignKey: 'user_id' })
    }

    return Post
}