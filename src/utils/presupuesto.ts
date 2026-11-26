import { ItemExtra } from "./calculoItemsExtra";
import { Cliente } from "./clientes";

export type Modo = 'horas' | 'trabajo';

export type Presupuesto = {
    id: string,
    fecha: string,
    cliente: Cliente | null,
    modo: Modo,
    descripcion: string,
    itemExtra: ItemExtra[],
    total: number,
    notaPrivada: string,
};

export type DatosPresupuesto = Omit<Presupuesto, 'id' | 'fecha'>;

// Función para armar el presupuesto con los datos del diseñador.-
export const armarPresupuesto = (datos: DatosPresupuesto): Presupuesto => ({
    ...datos,
    id: Date.now().toString(),
    fecha: new Date().toISOString(),
    itemExtra: datos.itemExtra.filter((item) => item.activo),
    notaPrivada: datos.notaPrivada.trim(),
});

// Función para agregar el presupuesto al historial.-
export const agregarPresupuesto = (lista: Presupuesto[], nuevo: Presupuesto): Presupuesto[] => 
[nuevo, ...lista]; // Del más actual al más antiguo.-