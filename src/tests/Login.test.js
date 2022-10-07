import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testando o componente Login', () => {
  it('Verificando se a pagina login tem o comportamento desejado', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/');
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const playButton = screen.getByTestId('btn-play');
    const settingsButton = screen.getByTestId('btn-settings');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();

    userEvent.type(nameInput, 'abc');
    userEvent.type(emailInput, 'abc@hotmail.com');
    expect(nameInput.value).toBe('abc');
    expect(emailInput.value).toBe('abc@hotmail.com');
    expect(playButton).toBeEnabled();
    userEvent.click(playButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game');
    }, {timeout: 5000});
  });

  it('testando o botão de "settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsButton = screen.getByTestId('btn-settings');
    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/settings');
  });
});
