import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { DocumentoPresupuesto } from '@/components/DocumentoPresupuesto';
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
      <Text style={globalStyles.title}>Vista previa</Text>

      {presupuesto ? (
        <DocumentoPresupuesto presupuesto={presupuesto} />
      ) : (
        <Text style={globalStyles.body}>No se encontró el presupuesto</Text>
      )}

      <Pressable onPress={() => router.back()} style={globalStyles.pillButton}>
        <Text style={globalStyles.pillButtonText}>Volver</Text>
      </Pressable>
    </View>
  );
};

export default VistaPreviaScreen;
