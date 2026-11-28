import { guardarDatos, leerDatos } from "@/utils/almacenamiento";
import { Cliente } from "@/utils/clientes";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type ClienteContextType = {
    clientes: Cliente[],
    setClientes: Dispatch<SetStateAction<Cliente[]>>,
};

// Nombre bajo el cual se guarda la info.-
const CLAVE = 'presto:clientes';

const ClientesContext = createContext<ClienteContextType | null>(null);

export const ClientesProvider = ({ children }: { children: ReactNode }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [cargado, setCargado] = useState(false);

    // Este useEffect primero lee lo guardado y si hay algo, lo carga a la lista.-
    useEffect(() => {
        leerDatos<Cliente[]>(CLAVE).then((guardados) => {
            if (guardados) setClientes(guardados);
            setCargado(true);
        });
    }, []);

    // Este solo se actualiza cuando cambia 'cliente' o 'cargado'. Si la luz está apagada, no hace nada.-
    useEffect(() => {
        if (cargado) guardarDatos(CLAVE, clientes);
    }, [clientes, cargado]);
    
    return (
        <ClientesContext.Provider value={{ clientes, setClientes }}>
            {children}
        </ClientesContext.Provider>
    )
};

export const useClientes = () => {
    const ctx = useContext(ClientesContext);
    if (!ctx) throw new Error('useClientes debe usarse dentro de ClientesProvider.');
    return ctx;
}