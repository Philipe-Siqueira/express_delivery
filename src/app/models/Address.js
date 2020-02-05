import Sequelize, { Model } from 'sequelize';

class Address extends Model {
  static init(sequelize) {
    super.init(
      {
        postcode: Sequelize.STRING,
        country: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        district: Sequelize.STRING,
        address: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'Address',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'addresses' });
  }
}
export default Address;
