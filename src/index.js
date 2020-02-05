import app from './app';

const appName = process.env.NODE_APP_NAME || 'Unicad - Delivery Express';
const PORT = process.env.NODE_APP_PORT || 80;
const HOST = process.env.NODE_APP_HOST || '0.0.0.0';
const URL = process.env.NODE_APP_URL || 'http://localhost';
app.listen(PORT, HOST, () => {
  console.log(`Serviço: ${appName} ativo no endereço: ${URL}:${PORT}`);
});
