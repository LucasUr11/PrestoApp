import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors, Spacing } from "@/constants/theme";
import { globalStyles } from "@/styles/globalStyles";

import { useTipoTrabajos } from "@/context/TipoTrabajoContext";
import { agregarTipoTrabajo, CampoTexto, Complejidad, crearTrabajo, DatosPorTrabajo, DatosTrabajo, TipoTrabajo } from "@/utils/calculoPorTrabajo";
import { FormularioTrabajo } from "./FormularioTrabajo";
import { SegmentedControl } from "./SegmentedControl";

type Props = {
    datos: DatosPorTrabajo,
    cambiarCampos: (campo: CampoTexto, texto: string) => void,
    cambiarComplejidad: (nuevaComplejidad: Complejidad) => void,
    tipoTrabajoId: string | null,
    setTipoTrabajoId: (id: string | null) => void,
}

export const CalculoPorTrabajo = ({
    datos, cambiarCampos, cambiarComplejidad, tipoTrabajoId, setTipoTrabajoId
}: Props) => {

    // Estados para cambiar los Tipo de Trabajo.-
    const [mostrarSelector, setMostrarSelector] = useState(false);
    const { tipoTrabajos, setTipoTrabajos } = useTipoTrabajos();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const elegirTipo = (tipo: TipoTrabajo) => {
         setTipoTrabajoId(tipo.id)
         cambiarCampos('precioBase', tipo.precio);
    };


    // Función para Guardar el Tipo de Trabajo.-
    const guardarTipoTrabajo = (datos: DatosTrabajo) => {
        const nuevo = crearTrabajo(datos);
        setTipoTrabajos((actuales) => agregarTipoTrabajo(actuales, nuevo));
        setTipoTrabajoId(nuevo.id);
        cambiarCampos('precioBase', nuevo.precio);
        setMostrarFormulario(false);
    };

    // Toma el Tipo de Trabajo elegido y lo muestrá en la pantalla.-
    const tipoTrabajoElegido = tipoTrabajos.find((tipo) => tipo.id === tipoTrabajoId);

    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Cálculo por tipo de trabajo</Text>

            <View style={globalStyles.card}>
                <Text style={globalStyles.label}>Tipo de Trabajo</Text>
                <Pressable
                    onPress={() => setMostrarSelector(true)}
                    style={globalStyles.inputField}
                >
                    <Text style={globalStyles.body}>
                        {tipoTrabajoElegido ? tipoTrabajoElegido.nombre : 'Elegir el tipo de trabajo del historial'}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => setMostrarFormulario(true)}
                    hitSlop={8}
                >
                    <Text style={globalStyles.linkButtonText}>+ Nuevo Tipo de Trabajo</Text>
                </Pressable>
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Precio base</Text>
                <TextInput
                    value={datos.precioBase}
                    onChangeText={(t) => cambiarCampos('precioBase', t)}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={Colors.placeholder}
                    style={globalStyles.inputField}
                />
            </View>

            <View style={globalStyles.inputField}>
                <SegmentedControl
                    options={[
                        { value: 'simple', label: 'Simple' },
                        { value: 'media', label: 'Media' },
                        { value: 'compleja', label: 'Compleja' }
                    ]}
                    value={datos.complejidad}
                    onChange={cambiarComplejidad}
                />
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Materiales y costos extra</Text>
                <TextInput
                    value={datos.costosExtras}
                    onChangeText={(t) => cambiarCampos('costosExtras', t)}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={Colors.placeholder}
                    style={globalStyles.inputField}
                />
            </View>
            
            {/* Modal del selector.- */}
            <Modal
                visible={mostrarSelector}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setMostrarSelector(false)}
            >
                <View style={globalStyles.section}>
                    <Text style={globalStyles.sectionTitle}>Elegir tipo de trabajo</Text>

                    {tipoTrabajos.map((tipo) => (
                        <Pressable 
                            key={tipo.id}
                            onPress={() => {
                                elegirTipo(tipo);
                                setMostrarSelector(false)
                            }}
                        >
                            <Text style={globalStyles.body}>{tipo.nombre}</Text>
                        </Pressable>
                    ))}

                    <Pressable
                        onPress={() => setMostrarSelector(false)}
                        style={globalStyles.pillButton}
                    >
                        <Text style={globalStyles.pillButtonText}>Cerrar</Text>
                    </Pressable>
                </View>
            </Modal>

            <Modal
                visible={mostrarFormulario}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setMostrarFormulario(false)}
            >
                <FormularioTrabajo
                    onGuardar={guardarTipoTrabajo}
                    onCancelar={() => setMostrarFormulario(false)}
                />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        gap: Spacing.sm,
    },
})