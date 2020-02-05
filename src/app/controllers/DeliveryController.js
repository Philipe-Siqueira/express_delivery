import * as Yup from 'yup';

import Delivery from '../models/Delivery';

class DeliveryController {
  async findAll(req, res) {
    const deliveries = await Delivery.findAll({
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

    const delivery = await Delivery.findByPk(delivery_id, {
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

    const delivery = await Delivery.create({
      client_id,
      partner_id,
      product,
      value,
      delivered_at,
    });

    return res.status(200).json(delivery);
  }

  async update(req, res) {
    return res.json({ message: 'update' });
  }

  async delete(req, res) {
    return res.json({ message: 'delete' });
  }
}

export default new DeliveryController();
