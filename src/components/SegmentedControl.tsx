import { Pressable, StyleSheet, Text, View } from "react-native";

type Props<T extends string> = {
    options: { value: T, label: string }[];
    value: T;
    onChange: (value: T) => void;
};

export function SegmentedControl<T extends string> ({ options, value, onChange }: Props<T>) {
    return (
        <View style={styles.containter}>
            {options.map((op) => {
                const active = op.value === value;
                return (
                    <Pressable
                        key={op.value}
                        onPress={()=> onChange(op.value)}
                        accessibilityRole="button"
                        accessibilityState={{ selected: active }}
                        style= {[ styles.segment, active && styles.segmentActive]}
                    >
                        <Text style={[styles.label, active && styles.labelActive]}>{op.label}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        flexDirection: 'row',
        backgroundColor: '#EDEDF5',
        borderRadius: 14,
        padding: 4,
        gap: 4,
    },
    segment: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 11,
        borderRadius: 11,
    },
    segmentActive: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2, // Sombra en Android.-
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#737585'
    },
    labelActive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6E45F5'
    },
})