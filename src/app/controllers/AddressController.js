import * as Yup from 'yup';
import Address from '../models/Address';
import User from '../models/User';

class AddressController {
  async findById(req, res) {
    const { user_id } = req.params;

    const addresses = await User.findByPk(user_id, {
      include: { association: 'addresses' },
    });

    if (!addresses) {
      return res.status(400).json({ error: 'Endereço não existe.' });
    }

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
    return res.status(204).json({ message: 'delete' });
  }
}

export default new AddressController();
