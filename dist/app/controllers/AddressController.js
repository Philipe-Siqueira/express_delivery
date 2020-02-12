"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class AddressController {
  async findById(req, res) {
    const { user_id } = req.params;

    const addresses = await _User2.default.findByPk(user_id, {
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
    const addresses = await _User2.default.findAll({
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

    const user = await _User2.default.findByPk(user_id);
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

    const newAddress = await _Address2.default.create({
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

    const isPartner = await _User2.default.findOne({
      where: {
        id: req.userId,
        partner: true,
        email: {
          [_sequelize.Op.iLike]: '%@expressdelivery.com',
        },
      },
    });

    if (!isPartner) {
      return res
        .status(401)
        .json({ error: 'Apenas Parceiros podem remover registros.' });
    }

    const del = await _Address2.default.destroy({ where: { id: address_id } });
    return res.status(202).json({ del, message: 'Usuário removido!' });
  }
}

exports. default = new AddressController();
