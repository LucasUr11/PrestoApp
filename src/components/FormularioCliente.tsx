import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';
import { DatosCliente, nombreValido } from '@/utils/clientes';

type Prop = {
  onGuardar: (datos: DatosCliente) => void;
  onCancelar: () => void;
};

const DATOS_VACIOS: DatosCliente = {
  nombreApellido: '',
  empresa: '',
  mail: '',
  telefono: '',
  notas: '',
};

export const FormularioCliente = ({ onGuardar, onCancelar }: Prop) => {
  const [datos, setDatos] = useState<DatosCliente>(DATOS_VACIOS);
  const [mostrarError, setMostrarError] = useState(false);

  const cambiarCampo = (campo: keyof DatosCliente, texto: string) => {
    setDatos((actuales) => ({ ...actuales, [campo]: texto }));
    if (campo === 'nombreApellido') setMostrarError(false);
  };

  const guardar = () => {
    if (!nombreValido(datos.nombreApellido)) {
      setMostrarError(true);
      return;
    }
    onGuardar(datos);
  };

  return (
    <View style={globalStyles.modalScreen}>
      <View style={globalStyles.modalHeader}>
        <Text style={globalStyles.title}>Nuevo cliente</Text>
        <Text style={globalStyles.subtitle}>Completá los datos para guardarlo en el historial</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.section}>
          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Nombre y apellido</Text>
            <TextInput
              value={datos.nombreApellido}
              onChangeText={(t) => cambiarCampo('nombreApellido', t)}
              autoCapitalize="words"
              placeholder="Ej. Ana Pérez"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
            />
            {mostrarError && <Text style={globalStyles.errorText}>El nombre es obligatorio</Text>}
          </View>

          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Empresa</Text>
            <TextInput
              value={datos.empresa}
              onChangeText={(t) => cambiarCampo('empresa', t)}
              placeholder="Ej. Estudio Norte"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
            />
          </View>

          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Mail</Text>
            <TextInput
              value={datos.mail}
              onChangeText={(t) => cambiarCampo('mail', t)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="nombre@correo.com"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
            />
          </View>

          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Teléfono</Text>
            <TextInput
              value={datos.telefono}
              onChangeText={(t) => cambiarCampo('telefono', t)}
              keyboardType="phone-pad"
              placeholder="Ej. +54 11 5555 5555"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
            />
          </View>

          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Notas</Text>
            <TextInput
              value={datos.notas}
              onChangeText={(t) => cambiarCampo('notas', t)}
              style={[globalStyles.textInput, globalStyles.textInputMultiline]}
              multiline={true}
              placeholder="Detalles adicionales sobre el cliente"
              placeholderTextColor={Colors.placeholder}
            />
          </View>
        </View>

        <View style={globalStyles.modalActions}>
          <Pressable
            onPress={guardar}
            style={({ pressed }) => [
              globalStyles.primaryButton,
              pressed && globalStyles.primaryButtonPressed,
            ]}
          >
            <Text style={globalStyles.primaryButtonText}>Guardar cliente</Text>
          </Pressable>
          <Pressable
            onPress={() => onCancelar()}
            style={globalStyles.secondaryButton}
          >
            <Text style={globalStyles.secondaryButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
