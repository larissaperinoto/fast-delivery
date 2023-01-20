const UserSchema = (sequelize, DataTypes) => {
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
    UserTable.hasMany(models.BlogPost, {
      as: 'costumer_sale',
      foreignKey: 'userId'
    })
  };

  UserTable.associate = (models) => {
    UserTable.hasMany(models.BlogPost, {
      as: 'seller_sale',
      foreignKey: 'sellerId'
    })
  };


  return UserTable;
};

module.exports = UserSchema;
