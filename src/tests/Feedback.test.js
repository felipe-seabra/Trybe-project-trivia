import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

describe('Testando o componente Feedback', () => {
  it('Verificando se a pagina Feedback tem o comportamento desejado', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const playerScore = screen.getByTestId('header-score');
    const feedbackText = screen.getByTestId('feedback-text');
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(profilePicture).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(playerScore).toBeInTheDocument();
    expect(feedbackText).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(playAgainButton).toBeInTheDocument();
    expect(playAgainButton).toBeEnabled();
    userEvent.click(playAgainButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('testando o botão do ranking', () => {
    const { history } = renderWithRouterAndRedux(<Feedback />);
    const rankingButton = screen.getByTestId('btn-ranking');
    expect(rankingButton).toBeInTheDocument();
    expect(rankingButton).toBeEnabled();
    userEvent.click(rankingButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');
  });
});