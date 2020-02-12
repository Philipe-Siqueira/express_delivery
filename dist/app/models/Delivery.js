"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Delivery extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        product: _sequelize2.default.STRING,
        value: _sequelize2.default.DECIMAL,
        delivered_at: _sequelize2.default.DATE,
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
exports. default = Delivery;
