"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Address extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        postcode: _sequelize2.default.STRING,
        country: _sequelize2.default.STRING,
        state: _sequelize2.default.STRING,
        city: _sequelize2.default.STRING,
        district: _sequelize2.default.STRING,
        address: _sequelize2.default.STRING,
        number: _sequelize2.default.INTEGER,
        complement: _sequelize2.default.STRING,
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
exports. default = Address;
