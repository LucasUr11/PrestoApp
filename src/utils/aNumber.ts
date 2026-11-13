

export const aNumero = (texto: string) => {
    const limpio = texto.replace(',', '.');
    const valor = parseFloat(limpio);
    return Number.isNaN(valor) ? 0 : valor;
}