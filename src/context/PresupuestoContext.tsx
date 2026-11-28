import { guardarDatos, leerDatos } from "@/utils/almacenamiento";
import { Presupuesto } from "@/utils/presupuesto";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type PresupuestoContextType = {
    presupuestos: Presupuesto[],
    setPresupuestos: Dispatch<SetStateAction<Presupuesto[]>>
};

const CLAVE = 'presto:presupuestos';

const PresupuestoContext = createContext<PresupuestoContextType | null>(null);

export const PresupuestoProvider = ({ children }: { children: ReactNode}) => {
    const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);
    const [cargado, setCargado] = useState(false);

    useEffect(() => {
        leerDatos<Presupuesto[]>(CLAVE).then((guardados) => {
            if (guardados) setPresupuestos(guardados);
            setCargado(true);
        });
    }, []);

    useEffect(() => {
        if (cargado) guardarDatos(CLAVE, presupuestos);
    }, [presupuestos, cargado]);

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