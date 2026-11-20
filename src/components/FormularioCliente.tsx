import { Colors, Spacing } from "@/constants/theme";
import { globalStyles } from "@/styles/globalStyles";
import { DatosCliente, nombreValido } from "@/utils/clientes";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Prop = {
    onGuardar: (datos: DatosCliente) => void,
    onCancelar: () => void,
}

const DATOS_VACIOS: DatosCliente = {
    nombreApellido: '', empresa: '', mail: '', telefono: '', notas: '',
};

export const FormularioCliente = ({ onGuardar, onCancelar }: Prop) => {
    const [datos, setDatos] = useState<DatosCliente>(DATOS_VACIOS);
    const [mostrarError, setMostrarError] = useState(false);

    const cambiarCampo = (campo: keyof DatosCliente, texto: string) => {
        setDatos((actuales) => ({ ...actuales, [campo]: texto }));
        if (campo === 'nombreApellido') setMostrarError(false);
    };

    const guardar = () => {
        if (!nombreValido(datos.nombreApellido)) {
            setMostrarError(true);
            return;
        }
        onGuardar(datos);
    }

    // Return de los TextInputs.- 
    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            automaticallyAdjustKeyboardInsets
        >
            <View style={globalStyles.section}>
                <Text style={globalStyles.sectionTitle}>Formulario</Text>

                <View>
                    <View>
                        <Text>Nombre y Apellido</Text>
                        <TextInput
                            value={datos.nombreApellido}
                            onChangeText={(t) => cambiarCampo('nombreApellido', t)}
                            autoCapitalize="words"
                            placeholder="Nombre y Apellido"
                            placeholderTextColor={Colors.placeholder}
                            style={globalStyles.inputField}
                        />
                        {mostrarError && <Text style={globalStyles.muted}>El nombre es obligatorio</Text>}
                    </View>

                    <View>
                        <Text>Empresa</Text>
                        <TextInput
                            value={datos.empresa}
                            onChangeText={(t) => cambiarCampo('empresa', t)}
                            placeholder="Empresa"
                            placeholderTextColor={Colors.placeholder}
                            style={globalStyles.inputField}
                        />
                    </View>

                    <View>
                        <Text>Mail</Text>
                        <TextInput
                            value={datos.mail}
                            onChangeText={(t) => cambiarCampo('mail', t)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder="Mail"
                            placeholderTextColor={Colors.placeholder}
                            style={globalStyles.inputField}
                        />
                    </View>

                    <View>
                        <Text>Telefono</Text>
                        <TextInput
                            value={datos.telefono}
                            onChangeText={(t) => cambiarCampo('telefono', t)}
                            keyboardType="phone-pad"
                            placeholder="Telefono"
                            placeholderTextColor={Colors.placeholder}
                            style={globalStyles.inputField}
                        />
                    </View>

                    <View>
                        <Text>Notas</Text>
                        <TextInput
                            value={datos.notas}
                            onChangeText={(t) => cambiarCampo('notas', t)}
                            style={[globalStyles.inputField, styles.textInputMultiline]}
                            multiline={true}
                            placeholder="Notas"
                            placeholderTextColor={Colors.placeholder}
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
};

const styles = StyleSheet.create({
    field: {
        gap: Spacing.sm,
    },
    textInputMultiline: {
        minHeight: 100
    },
})