import React from "react";
import { findByText, screen, waitFor } from "@testing-library/react";
import Login from '../pages/Login'
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from '../App'
import fetchToken from "../services/fetchToken";
import { act } from "react-dom/test-utils";


describe('Testando o componente Login', () => {
    it('Verificando se a pagina login tem o comportamento desejado' , async () => {
        jest.spyOn(Storage.prototype, 'setItem');
        Storage.prototype.setItem = jest.fn();
        const {history} = renderWithRouterAndRedux(<App/>)
        expect(history.location.pathname).toBe('/')
        const nameInput = screen.getByTestId('input-player-name')
        const emailInput = screen.getByTestId('input-gravatar-email')
        const playButton = screen.getByTestId('btn-play')
        const settingsButton = screen.getByTestId('btn-settings')
        expect(nameInput).toBeInTheDocument()
        expect(emailInput).toBeInTheDocument()
        expect(playButton).toBeInTheDocument()
        expect(settingsButton).toBeInTheDocument()
    
        userEvent.type(nameInput, 'abc')
        userEvent.type(emailInput, 'abc@hotmail.com')
        expect(nameInput.value).toBe('abc')
        expect(emailInput.value).toBe('abc@hotmail.com')
        expect(playButton).toBeEnabled()
        userEvent.click(playButton)
        await waitFor(() => {
            expect(history.location.pathname).toBe('/game')
          });     

        userEvent.click(settingsButton)
         expect(history.location.pathname).toBe('/settings')

    })
})