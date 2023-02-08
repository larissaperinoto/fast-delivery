module.exports = (sequelize, DataTypes) => {
  const SalesProductsTable = sequelize.define('SalesProduct', {
    saleId: { type: DataTypes.INTEGER, primaryKey: true },
    productId: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false
  });

  SalesProductsTable.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SalesProductsTable,
      as: 'products',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      through: SalesProductsTable,
      as: 'sales',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

  };
  return SalesProductsTable;
};

