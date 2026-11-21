import { globalStyles } from "@/styles/globalStyles";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";

import { Complejidad, DatosPorTrabajo } from "@/utils/calculoPorTrabajo";
import { SegmentedControl } from "./SegmentedControl";


type Props = {
    datos: DatosPorTrabajo,
    cambiarCampos: (campo: Exclude<keyof DatosPorTrabajo, 'complejidad'>, texto: string) => void,
    cambiarComplejidad: (campo: Complejidad) => void,
}

export const CalculoPorTiempo = ({
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
                        { value: 'compleja', label: 'Complejo' }
                    ]}
                    value={datos.complejidad}
                    onChange={cambiarComplejidad}
                />
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Materiales y costos extra</Text>
                <TextInput
                    value={datos.costosExtrasPorTiempo}
                    onChangeText={(t) => cambiarCampos('costosExtrasPorTiempo', t)}
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
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.sm,
        paddingBottom: Spacing.lg,
    },
    tabItem: {
        alignItems: 'center',
        gap: Spacing.xs,
        minWidth: 72,
    },
    tabIcon: {
        fontSize: FontSize.xl,
        color: Colors.textMuted,
    },
    tabIconActive: {
        fontSize: FontSize.xl,
        color: Colors.primary,
    },
    tabLabel: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.medium,
        color: Colors.textMuted,
    },
    tabLabelActive: {
        fontSize: FontSize.xs,
        fontWeight: FontWeight.semibold,
        color: Colors.primary,
    },
})