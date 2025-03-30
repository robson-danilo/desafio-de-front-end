import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';
import Weather from './views/Weather/Weather';

test('Renderizando...', async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Weather/i)).toBeInTheDocument();
  expect(await screen.findByText(/Select a city/i)).toBeInTheDocument();

  render(
    <MemoryRouter initialEntries={['/weather/Recife']}>
        <Route path="/weather/:city" element={<Weather />} />
    </MemoryRouter>
  );

  expect(await screen.findByText(/Recife/i)).toBeInTheDocument();
});
