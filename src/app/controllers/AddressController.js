import * as Yup from 'yup';
import { Op } from 'sequelize';
import Address from '../models/Address';
import User from '../models/User';

class AddressController {
  async findById(req, res) {
    const { user_id } = req.params;

    const addresses = await User.findByPk(user_id, {
      include: {
        association: 'addresses',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
      },
      attributes: {
        exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    if (!addresses) {
      return res.status(400).json({ error: 'Endereço não existe.' });
    }

    return res.status(200).json(addresses);
  }

  async findAll(req, res) {
    const addresses = await User.findAll({
      include: { association: 'addresses' },
      attributes: {
        exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    });

    return res.status(200).json(addresses);
  }

  async create(req, res) {
    const { user_id } = req.params;

    const schema = Yup.object().shape({
      postcode: Yup.string().required(),
      country: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      district: Yup.string().required(),
      address: Yup.string().required(),
      number: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro ao preencher os campos' });
    }

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const {
      postcode,
      country,
      state,
      city,
      district,
      address,
      number,
      complement,
    } = req.body;

    const newAddress = await Address.create({
      postcode,
      country,
      state,
      city,
      district,
      address,
      number,
      complement,
      user_id,
    });
    return res.status(201).json({ newAddress });
  }

  async update(req, res) {
    return res.status(200).json({ message: 'update' });
  }

  async delete(req, res) {
    const { address_id } = req.params;

    const schema = Yup.object().shape({
      address_id: Yup.number().required('ID deve ser fornecido.'),
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

    const del = await Address.destroy({ where: { id: address_id } });
    return res.status(202).json({ del, message: 'Usuário removido!' });
  }
}

export default new AddressController();
