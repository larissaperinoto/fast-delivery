const ProductsSchema = (sequelize, DataTypes) => {
  const ProductsTable = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    urlImage: DataTypes.STRING,
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false
  });
  return ProductsTable;
};

module.exports = ProductsSchema;
