"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _auth = require('../../config/auth'); var _auth2 = _interopRequireDefault(_auth);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation Fails?.' });
    }

    const { email, password } = req.body;

    const userExists = await _User2.default.findOne({
      where: { email },
    });

    if (!userExists) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await userExists.checkPassword(password))) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    const { id, name } = userExists;

    return res.status(201).json({
      user: { id, name, email },
      token: _jsonwebtoken2.default.sign({ id }, _auth2.default.secret, {
        expiresIn: _auth2.default.expiresIn,
      }),
    });
  }
}

exports. default = new SessionController();
