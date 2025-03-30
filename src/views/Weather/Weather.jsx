import homeService from '../../services/Home/Home';
import React, { useEffect, useState } from 'react';
import { tw } from '@twind/react';
import { useHistory, useParams } from 'react-router-dom';
import { BsCloudDrizzle, BsCloudFog2, BsCloudLightning, BsCloudMoon, BsCloudSnow, BsCloudSun, BsMoon, BsSun } from 'react-icons/bs';
import { IoReturnDownBack } from 'react-icons/io5';

const Weather = () => {
  const history = useHistory();
  const { city } = useParams();
  const [weatherData, setWeatherData] = useState(null);
  const [weatherData2, setWeatherData2] = useState(null);
  const [forecastData, setForecastData] = useState({
    Dawn: null,
    Morning: null,
    Afternoon: null,
    Night: null
  });
  const [backGroundClass, setBackGroundClass] = useState('bg-gray-900');

  const cidades = [
    { nomeCidade: 'Dallol', lat: 14.2417, lon: 40.2996 },
    { nomeCidade: 'Fairbanks', lat: 64.8378, lon: -147.7164 },
    { nomeCidade: 'Londres', lat: 51.5074, lon: -0.1278 },
    { nomeCidade: 'Recife', lat: -8.0539, lon: -34.8811 },
    { nomeCidade: 'Vancouver', lat: 49.2827, lon: -123.1207 },
    { nomeCidade: 'Yakutsk', lat: 62.0272, lon: 129.7321 },
  ];

  const PeriodosOfDay = ['Dawn', 'Morning', 'Afternoon', 'Night'];

  const Othersinfo = [
    { label: 'Wind speed', value: weatherData2?.wind?.speed ? `${weatherData2.wind.speed} m/s` : '--' },
    { label: 'Sunrise', value: weatherData?.forecast?.forecastday[0]?.astro?.sunrise || '--:--' },
    { label: 'Sunset', value: weatherData?.forecast?.forecastday[0]?.astro?.sunset || '--:--' },
    { label: 'Humidity', value: weatherData?.current?.humidity ? `${weatherData.current.humidity}%` : '--' }
  ];

  useEffect(() => {
    if (city) {
      const foundCity = cidades.find(c => c.nomeCidade.toLowerCase() === city.toLowerCase());
      if (foundCity) {
        getWeather(foundCity.lat, foundCity.lon);
      }
    }
  }, [city]);

  const getWeather = async (lat, lon) => {
    try {
      const response1 = await homeService.getOpenWeather(lat.toString(), lon.toString());
      setWeatherData2(response1);

      const response2 = await homeService.getWeather(lat.toString(), lon.toString());
      setWeatherData(response2);

      if (response2.forecast) {
        setForecastData({
          Dawn: response2.forecast.forecastday[0].hour.find(f => f.time.endsWith('03:00')),
          Morning: response2.forecast.forecastday[0].hour.find(f => f.time.endsWith('09:00')),
          Afternoon: response2.forecast.forecastday[0].hour.find(f => f.time.endsWith('15:00')),
          Night: response2.forecast.forecastday[0].hour.find(f => f.time.endsWith('21:00'))
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  const exibirIcons = (dados, tamanho) => {
    const isNight = !dados.is_day;
    switch (dados.condition.code) {
      case 1063:
      case 1180:
      case 1183:
        return isNight
          ? <BsCloudDrizzle size={tamanho} color='white' className="text-blue-400" />
          : <BsCloudDrizzle size={tamanho} color='white' className="text-blue-500" />;
      case 1087:
      case 1273:
      case 1276:
        return <BsCloudLightning size={tamanho} color='white' className="text-purple-500" />;
      case 1066:
      case 1215:
        return <BsCloudSnow size={tamanho} color='white' className="text-blue-200" />;
      case 1006:
      case 1009:
        return isNight
          ? <BsCloudMoon size={tamanho} color='white' className="text-gray-400" />
          : <BsCloudSun size={tamanho} color='white' className="text-gray-500" />;
      case 1030:
      case 1135:
        return <BsCloudFog2 size={tamanho} color='white' className="text-gray-300" />;
      case 1000:
        return isNight
          ? <BsMoon size={tamanho} color='white' className="text-blue-100" />
          : <BsSun size={tamanho} color='white' className="text-yellow-400" />;
      default:
        return isNight
          ? <BsCloudMoon size={tamanho} color='white' className="text-gray-400" />
          : <BsCloudSun size={tamanho} color='white' className="text-gray-500" />;
    }
  };



  const getBackgroundClass = (dados) => {
    switch (dados.current.condition.code) {
      case 1000:
        return dados.current.is_day ? 'bg-gradient-to-b from-blue-400 to-blue-600' : 'bg-gradient-to-b from-blue-900 to-gray-900';
      case 1003:
        return dados.current.is_day ? 'bg-gradient-to-b from-blue-300 to-gray-300' : 'bg-gradient-to-b from-blue-800 to-gray-700';
      case 1006:
      case 1009:
        return 'bg-gradient-to-b from-gray-400 to-gray-600';
      case 1063:
      case 1180:
      case 1183:
      case 1186:
      case 1189:
        return 'bg-gradient-to-b from-gray-500 to-blue-800';
      case 1087:
      case 1273:
      case 1276:
        return 'bg-gradient-to-b from-gray-700 to-purple-900';
      case 1066:
      case 1215:
        return 'bg-gradient-to-b from-blue-100 to-blue-300';
      case 1030:
      case 1135:
        return 'bg-gradient-to-b from-gray-300 to-gray-500';
      default:
        return 'bg-gradient-to-b from-gray-700 to-gray-900';
    }
  };

  useEffect(() => {
    if (weatherData?.current) {
      const bg = getBackgroundClass(weatherData);
      setBackGroundClass(bg);
    }
  }, [weatherData]);

  return (
    <div className={tw`flex flex-col items-center justify-center min-h-screen w-full ${backGroundClass} transition-colors duration-500`}>
      {weatherData2 && weatherData ? (
        <div className={tw`w-full flex-1 flex flex-col items-center justify-center p-4`}>
          <header className={tw`w-full max-w-4xl p-4 text-center`}>
            <div className='click' onClick={() => history.push('/')}>
              <IoReturnDownBack size={40} color='white' className="text-blue-400" />
            </div>
            <h1 className={tw`title mb-2`}>{city}</h1>
            <h2 className={tw`subTitle`}>
              {weatherData2?.weather?.[0]?.main}
            </h2>
            <div className={tw`flex justify-center items-center my-4`}>
              <span className={tw`h1`}>
                {weatherData?.current?.temp_c ? Math.round(weatherData.current?.temp_c) : '--'}<span className='celsius celsiusTop'>°C</span>
              </span>
            </div>
            <div className={tw`my-4 flex justify-center items-center`}>
              {exibirIcons(weatherData.current, 176)}
            </div>
          </header>

          <main className={tw`w-full max-w-3xl p-4 flex-1`}>
            <div className={tw`p-6`}>
              <div className={tw`grid grid-cols-3 md:grid-cols-4 gap-3 mb-8`}>
                {PeriodosOfDay.map((time, index) => (
                  <React.Fragment key={time}>
                    <div className={tw`flex flex-col items-center ${index === 3 ? 'md:col-span-1 col-span-3 justify-self-center' : ''}`}>
                      <span className={tw`periodosOfDay`}>{time}</span>
                      {forecastData[time] ? (
                        <>
                          {exibirIcons(forecastData[time], 48)}
                          <span className={tw`periodosOfDay`}>
                            {forecastData[time]?.temp_c ? Math.round(forecastData[time].temp_c) : '--'}°C
                          </span>
                        </>
                      ) : (
                        <>
                          <div className={tw`h-[42px] flex items-center`}>-</div>
                          <span className={tw`periodosOfDay`}>--°</span>
                        </>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>

              <div className={tw`relative`}>
                <div className={tw`grid grid-cols-2 md:grid-cols-4 gap-0 md:gap-4 mt-6`}>
                  {Othersinfo.map((item, index) => (
                    <React.Fragment key={item.label}>
                      <div className={tw`relative px-2 md:px-0`}>
                        <div className={tw`flex flex-col items-center`}>
                          <div className={tw`periodosOfDay`}>
                            <span>{item.label}</span>
                          </div>
                          <span className={tw`periodosOfDay`}>
                            {item.value}
                          </span>
                        </div>

                        {index < 3 && (
                          <>
                            <div className={tw`hidden md:block absolute right-0 top-0 h-[40px] w-px bg-white transform translate-x-2`} style={{ transform: 'translateY(20%)' }}></div>
                            {index % 2 === 0 && (
                              <div className={tw`md:hidden absolute right-0 top-0 h-[40px] w-px bg-white transform translate-x-1`} style={{ transform: 'translateY(20%)' }}></div>
                            )}
                          </>
                        )}<br />
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : null}

    </div>
  )
};

export default Weather;