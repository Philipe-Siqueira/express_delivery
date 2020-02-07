import * as Yup from 'yup';
import { startOfHour, parseISO } from 'date-fns';
import Delivery from '../models/Delivery';

class DeliveryController {
  async findAll(req, res) {
    const deliveries = await Delivery.findAll({
      // Remover comentário abaixo se quiser listar removidos logicamente
      // paranoid: false,
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

    await Delivery.update(
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

    await Delivery.update(
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
    const { delivery_id } = req.body;
    const del = await Delivery.destroy({ where: { id: delivery_id } });
    return res.status(202).json({ del, message: 'Entrega removida!' });
  }
}

export default new DeliveryController();
