import { globalStyles } from "@/styles/globalStyles";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { Colors, Spacing } from "@/constants/theme";

type Props = {
    tarifa: string;
    setTarifa: (texto: string) => void;
    tiempoEstimado: string;
    setTiempoEstimado: (texto: string) => void;
    costosExtras: string;
    setCostosExtras: (texto: string) => void;
}

export const CalculoPorHoras = ({
    tarifa, setTarifa,
    tiempoEstimado, setTiempoEstimado,
    costosExtras, setCostosExtras
}: Props) => {

    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Cálculo por horas</Text>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Tarifa por hora</Text>
                <TextInput 
                    value={tarifa}
                    onChangeText={setTarifa}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={Colors.placeholder}
                    style={globalStyles.inputField}
                />
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Tiempo estimado</Text>
                <TextInput 
                    value={tiempoEstimado}
                    onChangeText={setTiempoEstimado}
                    keyboardType="decimal-pad"
                    placeholder="0"
                    placeholderTextColor={Colors.placeholder}
                    style={globalStyles.inputField}
                />
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Materiales y costos extra</Text>
                <TextInput 
                    value={costosExtras}
                    onChangeText={setCostosExtras}
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