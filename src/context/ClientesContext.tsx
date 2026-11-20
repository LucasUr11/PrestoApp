import { Cliente } from "@/utils/clientes";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type ClienteContextType = {
    clientes: Cliente[],
    setClientes: Dispatch<SetStateAction<Cliente[]>>,
}

const ClientesContext = createContext<ClienteContextType | null>(null);

export const ClientesProvider = ({ children }: { children: ReactNode }) => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

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