import { aNumero } from "./aNumber";

export type Complejidad = 'simple' | 'media' | 'compleja';

const multiplicadores: Record<Complejidad, number> = {
    simple: 1,
    media: 1.5,
    compleja: 2
}

export type DatosPorTrabajo = {
    precioBase: string,
    complejidad: Complejidad,
    costosExtras: string,
}

export const calculoPorTrabajo = (
    precioBase: string,
    complejidad: Complejidad,
    costosExtras: string
): number => {
    return aNumero(precioBase) * multiplicadores[complejidad] + aNumero(costosExtras);
};

export type CampoTexto = Exclude<keyof DatosPorTrabajo, 'complejidad'>

export const TIPOS_TRABAJO_INICIALES: TipoTrabajo[] = [
    { id: '1', nombre: 'Logo', precio: '300' },
    { id: '2', nombre: 'Packaging', precio: '450' },
    { id: '3', nombre: 'Redes sociales', precio: '200' },
    { id: '4', nombre: 'Identidad de marca', precio: '800' },
];

// Formulario.-
export type TipoTrabajo = {
    id: string,
    nombre: string,
    precio: string,
}

export type DatosTrabajo = Omit<TipoTrabajo, 'id'>;

// Validación del nombre del tipo de trabajo (Logo, Redes Sociales), para no recibir un tipo de trabajo con espacios.-
export const nombreValido = (nombre: string): boolean =>
    nombre.trim().length > 0;

// Crear un nuevo tipo de trabajo desde los datos del formulario.-
export const crearTrabajo = (datos: DatosTrabajo): TipoTrabajo => ({
    id: Date.now().toString(),
    nombre: datos.nombre.trim(),
    precio: datos.precio.trim(),
});

// Agregar el tipo de trabajo a la lista.-
export const agregarTipoTrabajo = (trabajos: TipoTrabajo[], trabajo: TipoTrabajo): TipoTrabajo[] =>
    [...trabajos, trabajo]

// Eliminar el tipo de trabajo de la lista.-
export const eliminarTrabajo = (trabajos: TipoTrabajo[], id: string): TipoTrabajo[] =>
    trabajos.filter((trabajo) => trabajo.id !== id);

