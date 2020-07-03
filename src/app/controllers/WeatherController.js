const axios = require('axios').default;

class WeatherController {
  async getWeather(req, res) {
    res.set('Cache-Control', 'public, max-age=43200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    const { woeid } = req.params;
    console.log(woeid);
    const url = `https://api.hgbrasil.com/weather?woeid=${woeid}`;
    const weatherApi = await axios.get(url);
    if (weatherApi.status === 200) {
      const response = await weatherApi.data;
      return res.status(200).json(response);
    }
    return res.status(401).json({ message: 'Error', weatherApi });
  }
}

export default new WeatherController();
