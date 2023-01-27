module.exports = (sequelize, DataTypes) => {
  const SalesProductsTable = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    productId: { type: DataTypes.INTEGER, primaryKey: true },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'salesProducts',
    underscored: true,
    timestamps: false
  });

  SalesProductsTable.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      through: SalesProductsTable,
      as: 'sales',
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    models.Product.belongsToMany(models.Sale, {
      through: SalesProductsTable,
      as: 'products',
      foreignKey: 'productId',
      otherKey: 'saleId',
    });

  };
  return SalesProductsTable;
};

