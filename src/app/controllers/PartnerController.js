import User from '../models/User';
import Address from '../models/Address';

class PartnerController {
  async index(req, res) {
    const partners = await User.findAll({
      where: { partner: true },
      attributes: ['id', 'name', 'surname', 'email', 'cellphone', 'partner'],
      include: [
        {
          model: Address,
          as: 'user_address',
          attributes: [
            'id',
            'postcode',
            'country',
            'state',
            'city',
            'district',
            'address',
            'number',
            'complement',
          ],
        },
      ],
    });

    return res.json(partners);
  }
}

export default new PartnerController();
