import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { usePresupuestos } from '@/context/PresupuestoContext';
import { globalStyles } from '@/styles/globalStyles';
import { convertirAString } from '@/utils/convertirAString';

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
        <>
          <Text style={globalStyles.body}>
            {presupuesto.cliente ? presupuesto.cliente.nombreApellido : 'Sin cliente'}
          </Text>
          <Text style={globalStyles.body}>{presupuesto.descripcion}</Text>
          <Text style={globalStyles.body}>{convertirAString(presupuesto.total)}</Text>
        </>
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
