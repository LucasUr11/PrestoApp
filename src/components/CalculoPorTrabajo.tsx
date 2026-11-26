import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, FontSize, FontWeight } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';

import { useTipoTrabajos } from '@/context/TipoTrabajoContext';
import { agregarTipoTrabajo, CampoTexto, Complejidad, crearTrabajo, DatosPorTrabajo, DatosTrabajo, TipoTrabajo } from '@/utils/calculoPorTrabajo';
import { FormularioTrabajo } from './FormularioTrabajo';
import { SegmentedControl } from './SegmentedControl';

type Props = {
  datos: DatosPorTrabajo;
  cambiarCampos: (campo: CampoTexto, texto: string) => void;
  cambiarComplejidad: (nuevaComplejidad: Complejidad) => void;
  tipoTrabajoId: string | null;
  setTipoTrabajoId: (id: string | null) => void;
};

export const CalculoPorTrabajo = ({
  datos,
  cambiarCampos,
  cambiarComplejidad,
  tipoTrabajoId,
  setTipoTrabajoId,
}: Props) => {
  // Estados para cambiar los Tipo de Trabajo.-
  const [mostrarSelector, setMostrarSelector] = useState(false);
  const { tipoTrabajos, setTipoTrabajos } = useTipoTrabajos();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const elegirTipo = (tipo: TipoTrabajo) => {
    setTipoTrabajoId(tipo.id);
    cambiarCampos('precioBase', tipo.precio);
  };

  // Función para Guardar el Tipo de Trabajo.-
  const guardarTipoTrabajo = (datosTrabajo: DatosTrabajo) => {
    const nuevo = crearTrabajo(datosTrabajo);
    setTipoTrabajos((actuales) => agregarTipoTrabajo(actuales, nuevo));
    setTipoTrabajoId(nuevo.id);
    cambiarCampos('precioBase', nuevo.precio);
    setMostrarFormulario(false);
  };

  // Toma el Tipo de Trabajo elegido y lo muestrá en la pantalla.-
  const tipoTrabajoElegido = tipoTrabajos.find((tipo) => tipo.id === tipoTrabajoId);

  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>Cálculo por tipo de trabajo</Text>

      <View style={globalStyles.card}>
        <Text style={globalStyles.label}>Tipo de trabajo</Text>
        <Pressable
          onPress={() => setMostrarSelector(true)}
          style={globalStyles.selectField}
        >
          <Text
            style={tipoTrabajoElegido ? globalStyles.selectFieldText : globalStyles.selectFieldPlaceholder}
            numberOfLines={1}
          >
            {tipoTrabajoElegido ? tipoTrabajoElegido.nombre : 'Elegir tipo de trabajo del historial'}
          </Text>
          <Text style={globalStyles.muted}>▼</Text>
        </Pressable>
        <Pressable
          onPress={() => setMostrarFormulario(true)}
          hitSlop={8}
        >
          <Text style={globalStyles.linkButtonText}>+ Nuevo tipo de trabajo</Text>
        </Pressable>
      </View>

      <View style={globalStyles.field}>
        <Text style={globalStyles.label}>Precio base</Text>
        <TextInput
          value={datos.precioBase}
          onChangeText={(t) => cambiarCampos('precioBase', t)}
          keyboardType="decimal-pad"
          placeholder="0"
          placeholderTextColor={Colors.placeholder}
          style={globalStyles.textInput}
        />
      </View>

      <View style={globalStyles.field}>
        <Text style={globalStyles.label}>Complejidad</Text>
        <SegmentedControl
          options={[
            { value: 'simple', label: 'Simple' },
            { value: 'media', label: 'Media' },
            { value: 'compleja', label: 'Compleja' }
          ]}
          value={datos.complejidad}
          onChange={cambiarComplejidad}
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

      {/* Modal del selector.- */}
      <Modal
        visible={mostrarSelector}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setMostrarSelector(false)}
      >
        <View style={globalStyles.modalScreen}>
          <View style={globalStyles.modalHeader}>
            <Text style={globalStyles.title}>Elegir tipo de trabajo</Text>
            <Text style={globalStyles.subtitle}>Seleccioná un trabajo guardado para cargar su precio</Text>
          </View>

          <ScrollView contentContainerStyle={globalStyles.modalContent} keyboardShouldPersistTaps="handled">
            {tipoTrabajos.length === 0 ? (
              <View style={globalStyles.emptyState}>
                <Text style={globalStyles.emptyStateTitle}>Todavía no hay tipos de trabajo</Text>
                <Text style={globalStyles.emptyStateText}>
                  Guardá un tipo de trabajo para reutilizarlo en próximos presupuestos.
                </Text>
              </View>
            ) : (
              <View style={globalStyles.section}>
                {tipoTrabajos.map((tipo) => {
                  const selected = tipo.id === tipoTrabajoId;
                  return (
                    <Pressable
                      key={tipo.id}
                      onPress={() => {
                        elegirTipo(tipo);
                        setMostrarSelector(false);
                      }}
                      style={[globalStyles.listItem, selected && globalStyles.listItemActive]}
                    >
                      <View style={styles.listItemContent}>
                        <Text style={globalStyles.listItemText}>{tipo.nombre}</Text>
                        {!!tipo.precio && <Text style={globalStyles.listItemMeta}>${tipo.precio}</Text>}
                      </View>
                      {selected && <Text style={styles.selectedMark}>✓</Text>}
                    </Pressable>
                  );
                })}
              </View>
            )}

            <View style={globalStyles.modalActions}>
              <Pressable
                onPress={() => setMostrarSelector(false)}
                style={globalStyles.secondaryButton}
              >
                <Text style={globalStyles.secondaryButtonText}>Cerrar</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        visible={mostrarFormulario}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setMostrarFormulario(false)}
      >
        <FormularioTrabajo
          onGuardar={guardarTipoTrabajo}
          onCancelar={() => setMostrarFormulario(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContent: {
    flex: 1,
    gap: 2,
  },
  selectedMark: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
});
