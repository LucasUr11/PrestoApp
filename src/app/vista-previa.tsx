import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { DocumentoPresupuesto } from '@/components/DocumentoPresupuesto';
import { Colors, Spacing } from '@/constants/theme';
import { usePresupuestos } from '@/context/PresupuestoContext';
import { globalStyles } from '@/styles/globalStyles';

const VERDE_WHATSAPP = '#25D366';

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
        style={styles.scroll}
        contentContainerStyle={[globalStyles.screenContent, styles.content]}
        showsVerticalScrollIndicator={false}
      >
        {/* Barra superior.- */}
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

      {/* Acciones.- */}
      <View style={styles.acciones}>
        <View style={styles.filaEnviar}>
          <Pressable style={[globalStyles.primaryButton, styles.botonEnviar, styles.botonWhatsApp]}>
            <Text style={globalStyles.primaryButtonText}>WhatsApp</Text>
          </Pressable>
          <Pressable style={[globalStyles.primaryButton, styles.botonEnviar]}>
            <Text style={globalStyles.primaryButtonText}>Enviar</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() =>router.dismissAll()}
          style={[globalStyles.pillButton, styles.botonListo]}
        >
          <Text style={globalStyles.pillButtonText}>Listo</Text>
        </Pressable>
        
      </View>
    </View>
  );
};

export default VistaPreviaScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    gap: Spacing.lg,
  },
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  acciones: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.sm,
  },
  filaEnviar: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  botonEnviar: {
    flex: 1,
    alignItems: 'center',
  },
  botonWhatsApp: {
    backgroundColor: VERDE_WHATSAPP,
  },
  botonListo: {
    alignItems: 'center',
  },
});