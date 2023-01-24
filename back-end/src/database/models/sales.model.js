module.exports = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(9,2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    tableName: 'sales',
    underscored: true,
    timestamps: false
  });

  SaleTable.associate = (models) => {
    SaleTable.belongsTo(models.User,
      { foreignKey: 'userId', as: 'id_user' });

    SaleTable.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'id_seller' });
  };

  return SaleTable;
};