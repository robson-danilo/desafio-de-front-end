import React from 'react';
import { tw } from '@twind/react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();

  const cidades = [
    { nomeCidade: 'Dallol', lat: 14.2417, lon: 40.2996 },
    { nomeCidade: 'Fairbanks', lat: 64.8378, lon: -147.7164 },
    { nomeCidade: 'Londres', lat: 51.5074, lon: -0.1278 },
    { nomeCidade: 'Recife', lat: -8.0539, lon: -34.8811 },
    { nomeCidade: 'Vancouver', lat: 49.2827, lon: -123.1207 },
    { nomeCidade: 'Yakutsk', lat: 62.0272, lon: 129.7321 },
  ];

  return (
    <div className={tw`flex flex-col items-center justify-center min-h-screen w-full bg-gray-900`}>
      <div className={tw`w-full flex-1 flex flex-col items-center justify-center p-4`}>
        <header className={tw`w-full max-w-4xl p-4 text-center`}>
          <h1 className={tw`title text-white mb-2`}>Weather</h1>
          <h2 className={tw`subtitle text-white mb-6`}>Select a city</h2>
          <div className={tw`flex justify-center items-center my-8`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="143" height="143" viewBox="0 0 32 32"><path fill="#fff" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c.338 0 .67.02 1 .05V6h2v-.574a11.03 11.03 0 0 1 6 4.27V13l1 2v1h1q-.001.55-.055 1.086c-.009.096-.029.188-.04.283c-.034.263-.068.524-.12.781c-.019.096-.044.19-.066.286c-.058.254-.12.506-.196.753q-.04.127-.084.252a11 11 0 0 1-.275.752q-.046.107-.094.213q-.166.383-.36.75q-.046.09-.097.174a11 11 0 0 1-1.076 1.592l-.09.111q-.293.349-.611.672l-.092.096a11 11 0 0 1-.678.617c-.033.028-.061.057-.095.084c-.234.192-.48.37-.729.543c-.039.027-.074.058-.113.084c-.24.16-.488.307-.74.45a10.9 10.9 0 0 1-3.871 1.302l4.011-3.024l1.1-1.1L24 20v-1l-2-1h-1l-2-2h-2l-1 1v1l-1 1v2l2 1.6l-1.977 4.351C9.414 26.453 5 21.735 5 16c0-3.408 1.559-6.459 4-8.479V8L8 9v2.2L9 15l5 2h1v-1l-3-1v-2h3l1-2.5L18 9V8l-3-2l-1.438-.719A11 11 0 0 1 16 5m-1 9v1h2v-1z" /></svg>
          </div>
        </header>

        <main className={tw`w-full max-w-2xl p-4 flex-1`}>
          <div className={tw`grid grid-cols-3`}>
            {cidades.map((city, index) => (
              <div
                key={index}
                onClick={() => history.push(`/weather/${city.nomeCidade}`)}
                className={tw`
                  text-white
                  shadow-lg transform transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  cursor-pointer
                  flex items-center justify-center
                  min-h-[50px]
                `}
              >
                <span className={tw`text-xl font-semibold`}>{city.nomeCidade}</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;