import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';

import { DatosTrabajo, nombreValido } from '@/utils/calculoPorTrabajo';

type Prop = {
  onGuardar: (datos: DatosTrabajo) => void;
  onCancelar: () => void;
};

const DATOS_TRABAJO_VACIO = {
  nombre: '',
  precio: '',
};

export const FormularioTrabajo = ({ onGuardar, onCancelar }: Prop) => {
  const [datos, setDatos] = useState<DatosTrabajo>(DATOS_TRABAJO_VACIO);
  const [mostrarError, setMostrarError] = useState(false);

  const cambiarCampo = (campo: keyof DatosTrabajo, texto: string) => {
    setDatos((actuales) => ({ ...actuales, [campo]: texto }));
    if (campo === 'nombre') setMostrarError(false);
  };

  const guardar = () => {
    if (!nombreValido) {
      setMostrarError(true);
      return;
    }
    onGuardar(datos);
  };

  return (
    <View style={globalStyles.modalScreen}>
      <View style={globalStyles.modalHeader}>
        <Text style={globalStyles.title}>Nuevo tipo de trabajo</Text>
        <Text style={globalStyles.subtitle}>Guardá un trabajo para reutilizarlo en futuros presupuestos</Text>
      </View>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={globalStyles.modalContent}
      >
        <View style={globalStyles.section}>
          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Nombre</Text>
            <TextInput
              value={datos.nombre}
              onChangeText={(t) => cambiarCampo('nombre', t)}
              autoCapitalize="words"
              placeholder="Ej. Diseño de logo"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
            />
            {mostrarError && <Text style={globalStyles.errorText}>El nombre es obligatorio</Text>}
          </View>

          <View style={globalStyles.field}>
            <Text style={globalStyles.label}>Precio base</Text>
            <TextInput
              value={datos.precio}
              onChangeText={(t) => cambiarCampo('precio', t)}
              placeholder="0"
              keyboardType="decimal-pad"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
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
            <Text style={globalStyles.primaryButtonText}>Guardar trabajo</Text>
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
