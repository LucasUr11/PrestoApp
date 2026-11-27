import { StyleSheet, Text, View } from "react-native";

import { Colors, FontSize, FontWeight, Spacing } from "@/constants/theme";
import { globalStyles } from "@/styles/globalStyles";
import { aNumero } from "@/utils/aNumber";
import { calculoItemsExtra } from "@/utils/calculoItemsExtra";
import { convertirAString } from "@/utils/convertirAString";
import { Presupuesto } from "@/utils/presupuesto";

type Props = {
    presupuesto: Presupuesto;
};

export const DocumentoPresupuesto = ({ presupuesto }: Props) => {
    const extras = calculoItemsExtra(presupuesto.itemExtra);
    const importeBase = presupuesto.total - extras; // TOTAL menos los EXTRAS.-
    const fecha = new Date(presupuesto.fecha).toLocaleDateString('es-AR');

    return (
        <View style={styles.hoja}>
            <View style={styles.fila}>
                
                {/* Luego este texto vendrá del perfil.-*/}
                <Text style={styles.marca}>Tu estudio</Text>
                <Text style={globalStyles.muted}>{fecha}</Text>
            </View>

            <View style={styles.linea} />

            <Text style={globalStyles.muted}>Para</Text>
            <Text style={globalStyles.body}>
                {presupuesto.cliente ? presupuesto.cliente.nombreApellido : 'Sin cliente'}
            </Text>

            <View style={styles.linea} />

            <View style={styles.fila}>
                <Text style={globalStyles.body}>{presupuesto.descripcion}</Text>
                <Text style={globalStyles.body}>{convertirAString(importeBase)}</Text>
            </View>

            {presupuesto.itemExtra.map((item) => (
                <View
                    key={item.id}
                    style={styles.fila}
                >
                    <Text style={globalStyles.body}>{item.nombre || 'Sin nombre'}</Text>
                    <Text style={globalStyles.body}>{convertirAString(aNumero(item.valor))}</Text>
                </View>
            ))}

            <View style={styles.linea} />

            <View style={styles.fila}>
                <Text style={globalStyles.body}>Total</Text>
                <Text style={styles.total}>{convertirAString(presupuesto.total)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    hoja: {
        backgroundColor: Colors.surface,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 16,
        padding: Spacing.lg,
        gap: Spacing.sm,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    linea: {
        height: 1,
        backgroundColor: Colors.border,
    },
    marca: {
        fontSize: FontSize.xl,
        fontWeight: FontWeight.bold,
        color: Colors.primary,
    },
    total: {
        fontSize: FontSize['3xl'],
        fontWeight: FontWeight.bold,
        color: Colors.primary,
    },
});