import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders learn react link', () => {
  window.scrollTo = jest.fn()
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
