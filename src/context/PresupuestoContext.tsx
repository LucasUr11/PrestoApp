import { Presupuesto } from "@/utils/presupuesto";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type PresupuestoContextType = {
    presupuestos: Presupuesto[],
    setPresupuestos: Dispatch<SetStateAction<Presupuesto[]>>
};

const PresupuestoContext = createContext<PresupuestoContextType | null>(null);

export const PresupuestoProvider = ({ children }: { children: ReactNode}) => {
    const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

    return (
        <PresupuestoContext value={{ presupuestos, setPresupuestos}}>
            {children}
        </PresupuestoContext>
    )
}

export const usePresupuestos = () => {
    const ctx = useContext(PresupuestoContext);
    if (!ctx) throw new Error('usePresupuestos debe usarse dentro de PresupuestoProvider.');
    return ctx;
}