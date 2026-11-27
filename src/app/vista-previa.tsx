import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DocumentoPresupuesto } from '@/components/DocumentoPresupuesto';
import { Spacing } from '@/constants/theme';
import { usePresupuestos } from '@/context/PresupuestoContext';
import { globalStyles } from '@/styles/globalStyles';

const VistaPreviaScreen = () => {

  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { presupuestos } = usePresupuestos();
  /*
    'useLocalSearchParams' lee la nota que manda la otra pantalla,
    el `id`, y con ese `id` se busca el el presupuesto en la lista.
  */

  const presupuesto = presupuestos.find((p) => p.id === id);

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        contentContainerStyle={[globalStyles.screenContent, styles.content]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.barra}>
          <Pressable
            onPress={() => router.back()}
            style={globalStyles.pillButton}
          >
            <Text style={globalStyles.pillButtonText}>‹ Editar</Text>
          </Pressable>
          <Text style={globalStyles.sectionTitle}>Presupuesto listo</Text>
        </View>

        {/* Contenido del presupuesto.- */}
        {presupuesto ? (
          <DocumentoPresupuesto presupuesto={presupuesto} />
        ) : (
          <Text style={globalStyles.body}>No se encontró el presupuesto</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default VistaPreviaScreen;

const styles = StyleSheet.create({
  content: {
    gap: Spacing.lg,
  },
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
});