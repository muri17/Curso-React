import { getImagen } from "../../src/base-pruebas/11-async-await"

describe('Pruebas en 09-promesas', () => {
    test('getImagen debe retornar un url de la imagen', async () => {
        const url = await getImagen()

        expect(typeof url).toBe('string')
    })

    // test('getImagen debe retornar un error si no se encontro APIKey', async () => {
    //     const resp = await getImagen()

    //     expect(resp).toBe('No se encontro la imagen')
    // })
})