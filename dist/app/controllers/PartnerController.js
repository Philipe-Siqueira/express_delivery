"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);

class PartnerController {
  async findAll(req, res) {
    const partners = await _User2.default.findAll({
      where: { partner: true },
      attributes: ['id', 'name', 'surname', 'email', 'cellphone', 'partner'],
      include: [
        {
          model: _Address2.default,
          as: 'addresses',
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

    return res.status(200).json(partners);
  }
}

exports. default = new PartnerController();
