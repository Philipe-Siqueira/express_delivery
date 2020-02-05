import 'dotenv/config';

export default {
  secret: process.env.NODE_APP_SECRET,
  expiresIn: '1d',
};
