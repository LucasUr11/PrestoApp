import { globalStyles } from "@/styles/globalStyles";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors, Spacing } from "@/constants/theme";

import { CampoTexto, Complejidad, DatosPorTrabajo } from "@/utils/calculoPorTrabajo";
import { SegmentedControl } from "./SegmentedControl";

type Props = {
    datos: DatosPorTrabajo,
    cambiarCampos: (campo: CampoTexto, texto: string) => void,
    cambiarComplejidad: (nuevaComplejidad: Complejidad) => void,
}

export const CalculoPorTrabajo = ({
    datos, cambiarCampos, cambiarComplejidad
}: Props )=> {
    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Cálculo por tipo de trabajo</Text>

            <View style={styles.field}>
                <View style={globalStyles.inputField}>
                    <Text style={globalStyles.body}>Elegir tipo de trabajo</Text>
                    <Text style={globalStyles.muted}>▼</Text>
                </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        gap: Spacing.sm,
    },
})