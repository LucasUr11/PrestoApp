import { TIPOS_TRABAJO_INICIALES, TipoTrabajo } from "@/utils/calculoPorTrabajo";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type TipoTrabajoContextType = {
    tipoTrabajos: TipoTrabajo[],
    setTipoTrabajos: Dispatch<SetStateAction<TipoTrabajo[]>>,
}

const TipoTrabajoContext = createContext<TipoTrabajoContextType | null>(null);

export const TipoTrabajoProvider = ({ children}: { children: ReactNode}) => {
    const [tipoTrabajos, setTipoTrabajos] = useState<TipoTrabajo[]>(TIPOS_TRABAJO_INICIALES);

    return (
        <TipoTrabajoContext value={{ tipoTrabajos, setTipoTrabajos}}>
            {children}
        </TipoTrabajoContext>
    )
};

export const useTipoTrabajos = () => {
    const ctx = useContext(TipoTrabajoContext);
    if (!ctx) throw new Error('useTipoTrabajos debe usarse dentro de ClientesProvider.');
    return ctx;
}