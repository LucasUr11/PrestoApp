import { globalStyles } from "@/styles/globalStyles";
import { StyleSheet, Text, View } from "react-native";

import { Spacing } from "@/constants/theme";

export const CalculoPorHoras = () => {
    return (
        <View style={globalStyles.section}>
            <Text style={globalStyles.sectionTitle}>Cálculo por horas</Text>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Tarifa por hora</Text>
                <View style={globalStyles.inputField}>
                    <Text style={globalStyles.body}>$25</Text>
                    <Text style={globalStyles.muted}>por hora</Text>
                </View>
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Tiempo estimado</Text>
                <View style={globalStyles.inputField}>
                    <Text style={globalStyles.body}>12</Text>
                    <Text style={globalStyles.muted}>horas</Text>
                </View>
            </View>

            <View style={styles.field}>
                <Text style={globalStyles.label}>Materiales y costos extra</Text>
                <View style={globalStyles.inputField}>
                    <Text style={globalStyles.body}>$40</Text>
                    <Text style={globalStyles.muted}>total</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        gap: Spacing.sm,
    },
})