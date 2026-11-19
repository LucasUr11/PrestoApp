import { aNumero } from "./aNumber";

export type ItemExtra = {
    id: string,
    nombre: string,
    valor: string,
    activo: boolean,
    personalizado: boolean,
} // Cuando use porcentaje, agrego un campo 'tipo'.-



/* -------------- FUNCIONES --------------*/

// Obtiene una lista con los itemns, verifica cual está 'activo' y, en caso de estarlo, lo suma.- 
export const calculoItemsExtra = (items: ItemExtra[]): number => {
    let suma = 0;
    for (const item of items) {
        if (item.activo) {
            suma += aNumero(item.valor);
        }
    };
    return suma;
};


// Activar o desactivar un item.-
/*  
    Si el 'id' coincide, el ítem se reemplaza por una copia con el
    'activo' contrario: (true -> false) o (false -> true).-
*/
export const alternarItem = (items: ItemExtra[], id: string): ItemExtra[] => 
    items.map((item) =>
        item.id === id ? { ...item, activo: !item.activo } : item
    );


// Cambiar el valor de un ítem.-
/* 
    Si el 'id' coincide con el boton que toque, en vez de invertir 'activo', 
    pisa 'valor'.-
*/
export const cambiarValor = (items: ItemExtra[], id: string, texto: string):ItemExtra[] => 
    items.map((item) =>
        item.id === id ? { ...item, valor: texto } : item
    );


// Agregar un ítem.-
export const agregarItem = (items: ItemExtra[]): ItemExtra[] => {
    const nuevoItem: ItemExtra = { 
        id: Date.now().toString(), 
        nombre: 'Nuevo ítem', 
        valor: '', 
        activo: true,
        personalizado: true
    };
    return [...items, nuevoItem];
};


// Cambiar el nombre del nuevo ítem.-
export const cambiarNombre = (items: ItemExtra[], id: string, texto: string):ItemExtra[] => 
    items.map((item) =>
        item.id === id ? { ...item, nombre: texto } : item
    );


// Quitar un ítem.-
export const quitarItem = (items: ItemExtra[], id: string): ItemExtra[] =>
    items.filter((item) => item.id !== id);