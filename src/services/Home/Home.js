import axios from 'axios';
export default class Account {

  static async getOpenWeather(lat, lon) {
    try {

      let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9d086ee21c63c5f8f4851181bc02e82b&units=metric&lang=pt_br`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getWeather(lat, lon) {
    try {

      let response = await axios.get(` https://api.weatherapi.com/v1/forecast.json?q=${lat},${lon}&days=1&key=a85ea80cd37a47db8fe192255252903&lang=pt`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


}
