import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/theme";
import { globalStyles } from "@/styles/globalStyles";

import { DatosTrabajo, nombreValido } from "@/utils/calculoPorTrabajo";

type Prop = {
    onGuardar: (datos: DatosTrabajo) => void,
    onCancelar: () => void,
};

const DATOS_TRABAJO_VACIO = {
    nombre: '', precio: '',
};

export const FormularioTrabajo = ({ onGuardar, onCancelar }: Prop) => {
    const [datos, setDatos] = useState<DatosTrabajo>(DATOS_TRABAJO_VACIO);
    const [mostrarError, setMostrarError] = useState(false);

    const cambiarCampo = (campo: keyof DatosTrabajo, texto: string) => {
        setDatos((actuales) => ({ ...actuales, [campo]: texto }));
        if (campo === 'nombre') setMostrarError(false);
    };

    const guardar = () => {
        if (!nombreValido) {
            setMostrarError(true);
            return;
        }
        onGuardar(datos);
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
        >
            <View>
                <Text style={globalStyles.sectionTitle}>Formulario</Text>

                <View>
                    <View>
                        <Text>Nombre</Text>
                        <TextInput
                            value={datos.nombre}
                            onChangeText={(t) => cambiarCampo('nombre', t)}
                            autoCapitalize="words"
                            placeholder="Nombre"
                            placeholderTextColor={Colors.placeholder}
                            style={globalStyles.inputField}
                        />
                        {mostrarError && <Text style={globalStyles.muted}>El nombre es obligatorio</Text>}
                    </View>

                    <View>
                        <Text>Precio</Text>
                        <TextInput
                            value={datos.precio}
                            onChangeText={(t) => cambiarCampo('precio', t)}
                            placeholder="Precio"
                            keyboardType="number-pad"
                            placeholderTextColor={Colors.placeholder}
                            style={globalStyles.inputField}
                        />
                    </View>
                </View>

                <View>
                    <Pressable
                        onPress={guardar}
                        style={globalStyles.primaryButton}
                    >
                        <Text style={globalStyles.primaryButtonText}>Guardar</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => onCancelar()}
                        style={globalStyles.pillButton}
                    >
                        <Text style={globalStyles.pillButtonText}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    )
}
