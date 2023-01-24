module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: false
  });

  UserTable.associate = (models) => {
    UserTable.hasMany(models.Sale, {
      as: 'costumer_sale',
      foreignKey: 'userId',
    });

    UserTable.hasMany(models.Sale, {
      as: 'seller_sale',
      foreignKey: 'sellerId'
    });
  };


  return UserTable;
};

