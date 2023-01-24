module.exports = (sequelize, DataTypes) => {
  const ProductsTable = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
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
