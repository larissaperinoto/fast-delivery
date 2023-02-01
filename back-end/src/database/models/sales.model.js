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
    saleDate: { 
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(3) AT TIME ZONE \'America/Sao_Paulo\''),
    },
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
