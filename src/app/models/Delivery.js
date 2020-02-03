import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        value: Sequelize.DECIMAL,
        delivered_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'Delivery',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'client_id', as: 'clients' });
    this.belongsTo(models.User, { foreignKey: 'partner_id', as: 'partners' });
  }
}
export default Delivery;
