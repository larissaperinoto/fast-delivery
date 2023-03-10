module.exports = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
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
      { foreignKey: 'userId', as: 'customerInfos' });

    SaleTable.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'sellerInfos' });
  };

  return SaleTable;
};
