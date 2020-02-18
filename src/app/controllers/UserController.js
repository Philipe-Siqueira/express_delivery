import * as Yup from 'yup';
import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async findAll(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'cellphone', 'partner'],
      include: {
        association: 'addresses',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
      },
    });

    return res.status(200).json(users);
  }

  async findById(req, res) {
    const { user_id } = req.params;
    const users = await User.findByPk(user_id, {
      attributes: ['id', 'name', 'surname', 'email', 'cellphone'],
      include: {
        association: 'addresses',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
      },
    });

    if (!users) {
      return res.status(400).json({ error: 'Usuário não existe.' });
    }

    return res.status(200).json(users);
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      surname: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(8),
      cellphone: Yup.string()
        .required()
        .min(10),
      partner: Yup.boolean().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation user fail' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, surname, email, cellphone, partner } = await User.create(
      req.body
    );

    return res
      .status(201)
      .json({ id, name, surname, email, cellphone, partner });
  }

  async updateById(req, res) {
    const { user_id } = req.params;
    const schema = Yup.object().shape({
      user_id: Yup.number().required(),
      name: Yup.string(),
      surname: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      cellphone: Yup.string().min(10),
      partner: Yup.boolean(),
    });

    await schema
      .isValid(req.body)
      .then()
      .catch(err => res.status(400).json({ error: err.errors }));

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(user_id);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'E-mail já esta em uso.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password incorreto.' });
    }

    const { id, name, surname, cellphone, partner } = await user.update(
      req.body
    );
    return res.json({
      message: 'update',
      id,
      name,
      surname,
      email,
      cellphone,
      partner,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      surname: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string().when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      cellphone: Yup.string().min(10),
      partner: Yup.boolean(),
    });

    await schema
      .isValid(req.body)
      .then()
      .catch(err => res.status(400).json({ error: err.errors }));

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password incorreto.' });
    }

    const { id, name, surname, cellphone, partner } = await user.update(
      req.body
    );
    return res.json({
      message: 'update',
      id,
      name,
      surname,
      cellphone,
      partner,
    });
  }

  async delete(req, res) {
    const { user_id } = req.params;
    const schema = Yup.object().shape({
      user_id: Yup.number().required('ID deve ser fornecido.'),
    });

    await schema
      .isValid(req.body)
      .then()
      .catch(err => res.status(400).json({ error: err.errors }));

    const isPartner = await User.findOne({
      where: {
        id: req.userId,
        partner: true,
        email: {
          [Op.iLike]: '%@expressdelivery.com',
        },
      },
    });

    if (!isPartner) {
      return res
        .status(401)
        .json({ error: 'Apenas Parceiros podem remover registros.' });
    }

    const del = await User.destroy({ where: { id: user_id } });
    return res.status(202).json({ del, message: 'Usuário removido!' });
  }
}

export default new UserController();
