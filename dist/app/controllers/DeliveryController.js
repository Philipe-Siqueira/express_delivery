"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _sequelize = require('sequelize');
var _Delivery = require('../models/Delivery'); var _Delivery2 = _interopRequireDefault(_Delivery);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class DeliveryController {
  async findAll(req, res) {
    const { page = 1 } = req.query;
    const deliveries = await _Delivery2.default.findAll({
      // Remover comentário abaixo se quiser listar removidos logicamente
      // paranoid: false,
      order: [
        ['id', 'ASC'],
        // ['name', 'DESC'],
      ],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          association: 'clients',
          attributes: {
            exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
          },
          include: {
            association: 'addresses',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
        },
        {
          association: 'partners',
          attributes: {
            exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
          },
          include: {
            association: 'addresses',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
        },
      ],
    });

    return res.status(200).json({ deliveries });
  }

  async findById(req, res) {
    const { delivery_id } = req.params;

    const delivery = await _Delivery2.default.findByPk(delivery_id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
      include: [
        {
          association: 'clients',
          attributes: {
            exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
          },
          include: {
            association: 'addresses',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
        },
        {
          association: 'partners',
          attributes: {
            exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
          },
          include: {
            association: 'addresses',
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'deletedAt'],
            },
          },
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Entrega não existe.' });
    }

    return res.status(200).json({ delivery });
  }

  async create(req, res) {
    const schema = Yup.object().shape({
      client_id: Yup.number().required(),
      partner_id: Yup.number().required(),
      product: Yup.string().required(),
      value: Yup.string().required(),
      delivered_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro no preenchimento dos dados' });
    }

    const { client_id, partner_id, product, value, delivered_at } = req.body;

    const delivery = await _Delivery2.default.create({
      client_id,
      partner_id,
      product,
      value,
      delivered_at,
    });

    return res.status(200).json(delivery);
  }

  // const hourStart

  async update(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      partner_id: Yup.number().required(),
      product: Yup.string().required(),
      value: Yup.string().required(),
      delivered_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro ao preencher os campos' });
    }
    const { delivery_id, partner_id, delivered_at, product, value } = req.body;

    await _Delivery2.default.update(
      { partner_id, delivered_at, product, value },
      {
        where: {
          id: delivery_id,
        },
      }
    );

    return res.json({ partner_id, delivered_at, product, value });
  }

  async updateDone(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.date().required(),
      delivered_at: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Erro ao preencher os campos' });
    }
    const { delivery_id, delivered_at } = req.body;

    await _Delivery2.default.update(
      { delivered_at },
      {
        where: {
          id: delivery_id,
        },
      }
    );
    return res.status(200).json({ delivery_id, delivered_at });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required('ID deve ser fornecido.'),
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

    const { delivery_id } = req.body;
    const del = await _Delivery2.default.destroy({ where: { id: delivery_id } });
    return res.status(202).json({ del, message: 'Entrega removida!' });
  }
}

exports. default = new DeliveryController();
