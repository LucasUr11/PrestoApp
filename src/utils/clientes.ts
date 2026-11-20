
export type Cliente = {
    id: string,
    nombreApellido: string,
    empresa: string,
    mail: string,
    telefono: string,
    notas: string,
}

// El diseñador carga un cliente sin el 'id' aún.-
export type DatosCliente = Omit<Cliente, 'id'>

// Validación del nombre del cliente, para no recibir un cliente con espacios.-
export const nombreValido = (nombre: string): boolean =>
    nombre.trim().length > 0

// Crear un cliente nuevo desde los datos del formulario.-
export const crearCliente = (datos: DatosCliente): Cliente => ({
    id: Date.now().toString(),
    nombreApellido: datos.nombreApellido.trim(),
    empresa: datos.empresa.trim(),
    mail: datos.mail.trim(),
    telefono: datos.telefono.trim(),
    notas: datos.notas.trim(),
});

// Agregar el cliente creado a la lista.-
export const agregarCliente = (clientes: Cliente[], cliente: Cliente): Cliente[] => 
    [...clientes, cliente]; 

// Eliminar clientes.-
export const quitarClientes = (clientes: Cliente[], id: string): Cliente[] =>
    clientes.filter((cliente) => cliente.id !== id);