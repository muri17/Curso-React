import { fireEvent, render, screen } from "@testing-library/react"
import { CounterApp } from "../src/CounterApp"

describe('Pruebas en <CounterApp />', () => { 
    const value = 12
    test('Debe de hacer un match con el snapshot', () => {

        // const { container } = render( <CounterApp value={value}/> )

        // expect(container).toMatchSnapshot()
        render( <CounterApp value={value}/> )

        expect(screen).toMatchSnapshot()
    })

    test('Debe  mostrar el valor inicial de 100', () => {
        render( <CounterApp value={100}/> )

        expect(screen.getByText(100)).toBeTruthy()
        // expect(screen.getByRole('heading', {level: 2}).innerHTML).toContain('100')
    })

    test('Debe incrementar con el boton +1', () => {
        render( <CounterApp value={10}/> )

        fireEvent.click( screen.getByText('+1') )
        expect(screen.getByText('11')).toBeTruthy()
    })

    test('Debe decrementar con el boton +1', () => {
        render( <CounterApp value={10}/> )

        fireEvent.click( screen.getByText('-1') )
        expect(screen.getByText('9')).toBeTruthy()
    })

    test('Debe funcionar el boton de reset', () => {
        render( <CounterApp value={10}/> )

        fireEvent.click( screen.getByText('+1') )
        fireEvent.click( screen.getByText('+1') )
        fireEvent.click( screen.getByText('+1') )
        // fireEvent.click( screen.getByText('Reset') )

        fireEvent.click(screen.getByRole('button', { name: 'btn-reset'}))
        expect(screen.getByText('10')).toBeTruthy()
    })
 })