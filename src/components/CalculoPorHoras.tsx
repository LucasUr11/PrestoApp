import { Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';
import { DatosHoras } from '@/utils/FuncionesPorHoras';

type Props = {
  datos: DatosHoras;
  cambiarCampos: (campo: keyof DatosHoras, texto: string) => void;
};

export const CalculoPorHoras = ({ datos, cambiarCampos }: Props) => {
  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>Cálculo por horas</Text>

      <View style={globalStyles.field}>
        <Text style={globalStyles.label}>Tarifa por hora</Text>
        <TextInput
          value={datos.tarifa}
          onChangeText={(t) => cambiarCampos('tarifa', t)}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={Colors.placeholder}
          style={globalStyles.textInput}
        />
      </View>

      <View style={globalStyles.field}>
        <Text style={globalStyles.label}>Tiempo estimado</Text>
        <TextInput
          value={datos.tiempoEstimado}
          onChangeText={(t) => cambiarCampos('tiempoEstimado', t)}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={Colors.placeholder}
          style={globalStyles.textInput}
        />
      </View>

      <View style={globalStyles.field}>
        <Text style={globalStyles.label}>Materiales y costos extra</Text>
        <TextInput
          value={datos.costosExtras}
          onChangeText={(t) => cambiarCampos('costosExtras', t)}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={Colors.placeholder}
          style={globalStyles.textInput}
        />
      </View>
    </View>
  );
};
