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
        },
        {
          association: 'partners',
          attributes: {
            exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
    });

    return res.json({ deliveries });
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
        },
        {
          association: 'partners',
          attributes: {
            exclude: ['password_hash', 'createdAt', 'updatedAt', 'deletedAt'],
          },
        },
      ],
    });

    return res.json({ delivery });
  }

  async store(req, res) {
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

    /*
    const isPartiner = await User.findOne({
      where: { id: partner_id, partiner: true },
    });

    if (!isPartiner) {
      return res
        .json(401)
        .json({ error: 'Apenas prestadores de serviço podem gerar entregas.' });
    }
    */

    const { client_id, partner_id, product, value, delivered_at } = req.body;

    const delivery = await Delivery.create({
      client_id,
      partner_id,
      product,
      value,
      delivered_at,
    });

    return res.json(delivery);
  }
}

export default new DeliveryController();
