import { guardarDatos, leerDatos } from "@/utils/almacenamiento";
import { TIPOS_TRABAJO_INICIALES, TipoTrabajo } from "@/utils/calculoPorTrabajo";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type TipoTrabajoContextType = {
    tipoTrabajos: TipoTrabajo[],
    setTipoTrabajos: Dispatch<SetStateAction<TipoTrabajo[]>>,
};

const CLAVE = 'presto:tipo-trabajo';

const TipoTrabajoContext = createContext<TipoTrabajoContextType | null>(null);

export const TipoTrabajoProvider = ({ children}: { children: ReactNode}) => {
    const [tipoTrabajos, setTipoTrabajos] = useState<TipoTrabajo[]>(TIPOS_TRABAJO_INICIALES);
    const [cargado, setCargado] = useState(false);

    useEffect(() => {
        leerDatos<TipoTrabajo[]>(CLAVE).then((guardados) => {
            if (guardados) setTipoTrabajos(guardados);
            setCargado(true);
        })
    }, []);

    useEffect(() => {
        if (cargado) guardarDatos(CLAVE, tipoTrabajos);
    }, [tipoTrabajos, cargado]);

    return (
        <TipoTrabajoContext value={{ tipoTrabajos, setTipoTrabajos}}>
            {children}
        </TipoTrabajoContext>
    )
};

export const useTipoTrabajos = () => {
    const ctx = useContext(TipoTrabajoContext);
    if (!ctx) throw new Error('useTipoTrabajos debe usarse dentro de TipoTrabajoProvider.');
    return ctx;
}