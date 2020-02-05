import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        cellphone: Sequelize.STRING,
        partner: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'User',
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        // eslint-disable-next-line no-param-reassign
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    this.hasMany(models.Delivery, {
      foreignKey: 'client_id',
      as: 'clients',
    });

    this.hasMany(models.Delivery, {
      foreignKey: 'partner_id',
      as: 'partners',
    });
  }
}
export default User;
