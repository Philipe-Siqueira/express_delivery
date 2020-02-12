import app from './app';

const appName = process.env.NODE_APP_NAME || 'Unicad - Delivery Express';
const PORT = process.env.NODE_APP_PORT || process.env.PORT;
const HOST = process.env.NODE_APP_HOST || process.env.HOST;
const URL = process.env.NODE_APP_URL || 'http://localhost';
app.listen(PORT, HOST, () => {
  console.log(`Serviço: ${appName} ativo no endereço: ${URL}:${PORT}`);
});
