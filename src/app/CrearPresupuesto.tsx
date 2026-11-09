import { Colors } from "@/constants/Colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { globalStyles } from "../../style/global-styles";

export const CrearPresupuesto = () => {
    return (
        <View style={styles.espacios}>
            <View>
                <Text style={globalStyles.h1}>Nuevo Presupuesto</Text>
                <Text style={globalStyles.textSecundary}>Calculá y enviá en pocos pasos</Text>
            </View>

            <View style={globalStyles.backgroundInput}>
                <Text>Por Hora | Por tipo de trabajo</Text>
            </View>

            <View style={{ backgroundColor: '#FFFFFF' }}>
                <Text>Cliente</Text>
                <View style={{ backgroundColor: '#FAFAFC' }}>
                    <Text>(Logo) Elegir cliente del historial 🔽</Text>
                </View>
                <Pressable>
                    <Text style={[{ color: Colors.violet }, { fontWeight: "bold" }, { fontSize: 15 }]}>+ Crear cliente nuevo</Text>
                </Pressable>
            </View>

            <View>
                <Text style={[globalStyles.textSecundary, { fontWeight: "bold" }]}>Calculo por horas</Text>
                <View style={[{ display: "flex" }, styles.espacios]}>
                    <View>
                        <Text>Tarifa por hora</Text>
                        <View style={globalStyles.backgroundInput}>
                            <Text>$25</Text>
                            <Text>por hora</Text>
                        </View>
                    </View>

                    <View>
                        <Text>Tiempo estimado</Text>
                        <View style={globalStyles.backgroundInput}>
                            <Text>12</Text>
                            <Text>horas</Text>
                        </View>
                    </View>

                    <View>
                        <Text>Materiales y costos extra</Text>
                        <View style={globalStyles.backgroundInput}>
                            <Text>$40</Text>
                            <Text>total</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.espacios}>
                <Text style={[globalStyles.textSecundary, { fontWeight: "bold" }]}>ítems extra</Text>
                <View style={[{ display: "flex"}, { flexDirection: 'row'}, {gap: 5}]}>
                    <Pressable style={[styles.button, { borderColor: Colors.violet}]}>
                        <Text style={{ color: Colors.violet}}>Revisiones</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text>Urgencia</Text>
                    </Pressable>
                    <Pressable style={styles.button}>
                        <Text>+ Agregar</Text>
                    </Pressable>
                </View>
            </View>

            <View style={[{ display: 'flex'}, {flexDirection: "row"}, {justifyContent: 'space-between'}]}>
                <View>
                    <Text style={globalStyles.textSecundary}>Total estimado</Text>
                    <Text style={[globalStyles.h1, { color: Colors.violet }]}>$340</Text>
                </View>
                <Pressable style={[styles.button, {backgroundColor: '#6E45F5'}, { borderColor: '#6E45F5'}]}>
                    <Text style={styles.textButton}>Generar PDF</Text>
                </Pressable>
            </View>

            {/* Componente para viajar entre las diferentes visuales*/}
            <View style={[{ display: 'flex'}, { flexDirection: 'row'}, { justifyContent: 'space-around'}]}>
                <Pressable style={{alignItems: "center"}}>
                    <Text style={[{ fontSize: 20}, { color: Colors.violet}]}>○</Text>
                    <Text style={{ color: Colors.violet}}>Nuevo</Text>
                </Pressable>
                <Pressable style={{alignItems: "center"}}>
                    <Text style={{ fontSize: 20}}>○</Text>
                    <Text>Historial</Text>
                </Pressable>
                <Pressable style={{alignItems: "center"}}>
                    <Text style={{ fontSize: 20}}>○</Text>
                    <Text>Perfil</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    espacios: {
        gap: 12
    },

    button: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 50,
    },

    textButton: {
        color: '#FFFFFF',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
})