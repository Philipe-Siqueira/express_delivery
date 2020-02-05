import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import User from '../models/User';

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

    const userExists = await User.findOne({
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
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
