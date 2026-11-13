import { aNumero } from "./aNumber";

export type Complejidad = 'simple' | 'media' | 'compleja';

const multiplicadores: Record<Complejidad, number> = {
    simple: 1,
    media: 1.5,
    compleja: 2
}

export const calculoPorTrabajo = (
    precioBase: string,
    complejidad: Complejidad,
    costosExtras: string
): number => {
    return aNumero(precioBase) * multiplicadores[complejidad] + aNumero(costosExtras);
};

