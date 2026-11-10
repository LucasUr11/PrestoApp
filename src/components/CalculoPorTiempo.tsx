import { globalStyles } from "@/styles/globalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";

export const CalculoPorTiempo = () => {
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
                <Text style={globalStyles.label}>Tarifa base</Text>
                <View style={globalStyles.inputField}>
                    <Text style={globalStyles.body}>$25</Text>
                </View>
            </View>

            <View style={styles.tabBar}>
                <Pressable style={styles.tabItem} hitSlop={8}>
                    <Text style={styles.tabIconActive}>○</Text>
                    <Text style={styles.tabLabelActive}>Simple</Text>
                </Pressable>
                <Pressable style={styles.tabItem} hitSlop={8}>
                    <Text style={styles.tabIcon}>○</Text>
                    <Text style={styles.tabLabel}>Media</Text>
                </Pressable>
                <Pressable style={styles.tabItem} hitSlop={8}>
                    <Text style={styles.tabIcon}>○</Text>
                    <Text style={styles.tabLabel}>Compleja</Text>
                </Pressable>
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