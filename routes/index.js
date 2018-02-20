const router = require('express').Router();
const axios = require('axios');

const token = 'PONER TOKEN';

router.get('/', (req, res) => res.send('hola mundo funciona'));

router.get('/actual', (req, res) => {
  axios.get(`http://api.apixu.com/v1/current.json?key=${token}&q=Buenos%20Aires&lang=es`)
    .then((data) => {
      const obj = {
        temperatura: `La temperatura en Buenos Aires es de: ${data.data.current.temp_c}°C`,
        humedad: data.data.current.humidity,
        condicion: data.data.current.condition.text,
      };
      res.send(obj);
    })
    .catch(err => console.log('Error', err));
});

router.get('/minAndMax', (req, res) => {
  const todayDate = new Date();
  const yesterdayDate = (data => new Date(data.setDate(data.getDate()-1)))(new Date);
  const today = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  const yesterday = `${yesterdayDate.getFullYear()}-${yesterdayDate.getMonth() + 1}-${yesterdayDate.getDate()}`;
  let max = 0;
  let min = 0;

  const minAndMaxFunctionYesterday = (array, date) => {
    for (let i = date.getHours(); i < 24; i += 1) {
      const temp = array[i].temp_c;
      console.log('temp ayer: ', temp, 'hora ', i);
      if (!max && !min) max = temp, min = temp;
      if (temp > max) max = temp;
      if (temp < min) min = temp;
    }
    return (min, max);
  };

  const minAndMaxFunctionToday = (array, date) => {
    for (let i = date.getHours(); i >= 0; i -= 1) {
      const temp = array[i].temp_c;
      if (!max && !min) max = temp, min = temp;
      console.log('temp hoy: ', temp, 'hora ', i);
      if (temp > max) max = temp;
      if (temp < min) min = temp;
    }
    return (min, max);
  };

  const promise1 = axios.get(`http://api.apixu.com/v1/history.json?key=${token}&q=Buenos%20Aires&lang=es&dt=${today}`)
    .then((data) => {
      const hours = data.data.forecast.forecastday[0].hour;
      minAndMaxFunctionToday(hours, todayDate);
    });
  const promise2 = axios.get(`http://api.apixu.com/v1/history.json?key=${token}&q=Buenos%20Aires&lang=es&dt=${yesterday}`)
    .then((data) => {
      const hours = data.data.forecast.forecastday[0].hour;
      minAndMaxFunctionYesterday(hours, yesterdayDate);
    })
    .catch(err => console.log('Error', err));

  Promise.all([promise1, promise2]).then(() => {
    const minAndMax = { min, max };
    res.send(minAndMax);
  });
});

module.exports = router;
