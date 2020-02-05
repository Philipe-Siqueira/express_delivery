import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async findAll(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'surname', 'email', 'cellphone'],
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

  async update(req, res) {
    return res.json({ message: 'update' });
  }

  async delete(req, res) {
    return res.status(204).json({ message: 'delete' });
  }
}

export default new UserController();
