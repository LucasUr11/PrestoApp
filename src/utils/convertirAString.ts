
export const convertirAString = (numero: number): string => {
    return numero.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    })
}