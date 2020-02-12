"use strict";Object.defineProperty(exports, "__esModule", {value: true});require('dotenv/config');

exports. default = {
  secret: process.env.NODE_APP_SECRET,
  expiresIn: '1d',
};
