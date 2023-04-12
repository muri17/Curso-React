import { getSaludo } from "../../src/base-pruebas/02-template-string"

describe('Pruebas em 02-template-string', () => {
    test('getSaludo debe retornar "Hola Mauricio"', () => {
        const nombre = 'Mauricio'
        const message = getSaludo( nombre )

        expect(message).toBe(`Hola ${ nombre }`)
    })
})