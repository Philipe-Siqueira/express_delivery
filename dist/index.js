"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

const appName = process.env.NODE_APP_NAME || 'Unicad - Delivery Express';
const PORT = process.env.NODE_APP_PORT || process.env.PORT;
// const HOST = process.env.NODE_APP_HOST || process.env.HOST;
const URL = process.env.NODE_APP_URL || 'http://localhost';
_app2.default.listen(PORT, () => {
  console.log(`Serviço: ${appName} ativo no endereço: ${URL}:${PORT}`);
});
