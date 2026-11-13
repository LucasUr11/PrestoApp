import { aNumero } from "./aNumber";

export const calculoPorHoras = (
    tarifa: string,
    tiempoEstimado: string,
    costosExtras: string
): number => {
    return aNumero(tarifa) * aNumero(tiempoEstimado) + aNumero(costosExtras);
};
