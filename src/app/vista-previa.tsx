import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { globalStyles } from '@/styles/globalStyles';

const VistaPreviaScreen = () => {
  const router = useRouter();

  return (
    <View style={globalStyles.screen}>
      <ScrollView contentContainerStyle={globalStyles.screenContent} showsVerticalScrollIndicator={false}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.title}>Vista previa</Text>
          <Text style={globalStyles.subtitle}>Revisá el presupuesto antes de generarlo.</Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Resumen</Text>
          <View style={globalStyles.emptyState}>
            <Text style={globalStyles.emptyStateTitle}>Vista previa en preparación</Text>
            <Text style={globalStyles.emptyStateText}>
              Acá vas a poder revisar el detalle del presupuesto antes de generar el PDF.
            </Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [globalStyles.secondaryButton, pressed && { opacity: 0.85 }]}
        >
          <Text style={globalStyles.secondaryButtonText}>Volver</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default VistaPreviaScreen;
