import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';

import { useClientes } from '@/context/ClientesContext';
import { calculoItemsExtra, ItemExtra } from '@/utils/calculoItemsExtra';
import { calculoPorTrabajo, CampoTexto, Complejidad, DatosPorTrabajo } from '@/utils/calculoPorTrabajo';
import { agregarCliente, crearCliente, DatosCliente } from '@/utils/clientes';
import { convertirAString } from '@/utils/convertirAString';
import { calculoPorHoras, DatosHoras } from '@/utils/FuncionesPorHoras';
import { CalculoPorHoras } from './CalculoPorHoras';
import { CalculoPorTrabajo } from './CalculoPorTrabajo';
import { FormularioCliente } from './FormularioCliente';
import { ItemsExtra } from './ItemsExtra';
import { SegmentedControl } from './SegmentedControl';

type Modo = 'horas' | 'trabajo';

const ITEMS_INICIALES: ItemExtra[] = [
  { id: '1', nombre: 'Revisiones', valor: '', activo: false, personalizado: false },
  { id: '2', nombre: 'Urgencia', valor: '', activo: false, personalizado: false },
];

// Valores iniciales de cada formulario.-
const DATOS_HORAS_VACIO: DatosHoras = {
  tarifa: '', tiempoEstimado: '', costosExtras: ''
}

const DATOS_POR_TRABAJO_VACIOS: DatosPorTrabajo = {
  precioBase: '', complejidad: 'simple', costosExtras: '',
}


export const CrearPresupuesto = () => {

  /* 
      ///////////////// ESTADOS /////////////////
  */
  
  // Estado para el Formulario.-
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Estados para cambiar los Clientes.-
  const [clienteId, setClienteId] = useState<string | null>(null);
  const { clientes, setClientes } = useClientes();

  // Estados para calcular el precio por hora.-
  const [datosHoras, setDatosHoras] = useState<DatosHoras>(DATOS_HORAS_VACIO);

  // Estados para calcular el precio por tipo de trabajo.-
  const [datosPorTrabajo, setDatosPorTrabajo] = useState<DatosPorTrabajo>(DATOS_POR_TRABAJO_VACIOS);
  
  // Estado para que elegir el Modo (horas / trabajo).-
  const [modo, setModo] = useState<Modo>('horas');

  // Estados para la Nota Privada.-
  const [notaPrivada, setNotaPrivada] = useState('');

  // Estado para ItemsExtra.-
  const [items, setItems] = useState<ItemExtra[]>(ITEMS_INICIALES);

  /* 
      ///////////////// FUNCIONES /////////////////
  */

  // Función para Guardar al Cliente.-
  const guardarCliente = (datos: DatosCliente) => {
    const nuevo = crearCliente(datos);
    setClientes((actuales) => agregarCliente(actuales, nuevo));
    setClienteId(nuevo.id);
    setMostrarFormulario(false);
  };

  // Toma el cliente elegido y lo muestrá en la pantalla.-
  const clienteElegido = clientes.find((c) => c.id === clienteId);

  // Función para calcular por hora.-
  const cambiarCamposHoras = (campo: keyof DatosHoras, texto: string) => {
    setDatosHoras((actuales) => ({ ...actuales, [campo]: texto }));
  };

  // Función para calcular por tipo de trabajo.-
  const cambiarCamposPorTrabajo = (campo: CampoTexto, texto: string) => {
    setDatosPorTrabajo((actuales) => ({ ...actuales, [campo]: texto }));
  };

  // Función para cambiar la complejidad.-
  const cambiarComplejidad = (nuevaComplejidad: Complejidad) => {
    setDatosPorTrabajo((actuales) => ({ ...actuales, complejidad: nuevaComplejidad }));
  };
  
  // Funciones para calcular el total del presupuesto.-
  const totalHoras = calculoPorHoras(datosHoras.tarifa, datosHoras.tiempoEstimado, datosHoras.costosExtras);
  const totalTrabajo = calculoPorTrabajo(datosPorTrabajo.precioBase, datosPorTrabajo.complejidad, datosPorTrabajo.costosExtras);
  const total = (modo === 'horas' ? totalHoras : totalTrabajo) + calculoItemsExtra(items);

  // Convierte a 'String' y a moneda local el precio total.-
  const aString: string = convertirAString(total);

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[globalStyles.screenContent, styles.content]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={globalStyles.title}>Nuevo Presupuesto</Text>
          <Text style={globalStyles.subtitle}>Calculá y enviá en pocos pasos</Text>
        </View>

        {/* Cargar cliente.- */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.label}>Cliente</Text>
          <View style={globalStyles.inputField}>
            <Text style={globalStyles.body}>
              {clienteElegido ? clienteElegido.nombreApellido : 'Elegir el cliente del historial'}
            </Text>
          </View>
          <Pressable
            onPress={() => setMostrarFormulario(true)}
            hitSlop={8}
          >
            <Text style={globalStyles.linkButtonText}>+ Crear cliente nuevo</Text>
          </Pressable>
        </View>

        {/* Cálculos.- */}
        <View style={globalStyles.inputField}>
          <SegmentedControl
            options={[
              { value: 'horas', label: 'Por horas' },
              { value: 'trabajo', label: 'Por tipo de trabajo' }
            ]}
            value={modo}
            onChange={setModo}
          />

        </View>
        <View>
          {modo === 'horas'
            ? <CalculoPorHoras
              datos={datosHoras}
              cambiarCampos={cambiarCamposHoras}
            />
            : <CalculoPorTrabajo
              datos={datosPorTrabajo}
              cambiarCampos={cambiarCamposPorTrabajo}
              cambiarComplejidad={cambiarComplejidad}
            />
          }
        </View>

        {/* Notas Privadas.- */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Notas Privadas</Text>
          <View style={styles.field}>
            <TextInput
              value={notaPrivada}
              onChangeText={setNotaPrivada}
              placeholder="No irá en el presupuesto"
              style={[globalStyles.inputField, styles.textInputMultiline]}
              multiline={true}
              placeholderTextColor={Colors.placeholder}
            />
          </View>
        </View>

        {/* Ítems Extra.- */}
        <ItemsExtra
          items={items}
          setItems={setItems}
        />

        {/* Total + Botón de Generar PDF.- */}
        <View style={styles.totalRow}>
          <View style={styles.totalInfo}>
            <Text style={globalStyles.muted}>Total estimado</Text>
            <Text style={styles.totalAmount}>{aString}</Text>
          </View>
          <Pressable style={globalStyles.primaryButton}>
            <Text style={globalStyles.primaryButtonText}>Generar PDF</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <Pressable style={styles.tabItem} hitSlop={8}>
          <Text style={styles.tabIconActive}>○</Text>
          <Text style={styles.tabLabelActive}>Nuevo</Text>
        </Pressable>
        <Pressable style={styles.tabItem} hitSlop={8}>
          <Text style={styles.tabIcon}>○</Text>
          <Text style={styles.tabLabel}>Historial</Text>
        </Pressable>
        <Pressable style={styles.tabItem} hitSlop={8}>
          <Text style={styles.tabIcon}>○</Text>
          <Text style={styles.tabLabel}>Perfil</Text>
        </Pressable>
      </View>

      <Modal
        visible={mostrarFormulario}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={() => setMostrarFormulario(false)}
      >
        <FormularioCliente
          onGuardar={guardarCliente}
          onCancelar={() => setMostrarFormulario(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
  },
  header: {
    gap: Spacing.xs,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  totalInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  totalAmount: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  tabItem: {
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 72,
  },
  tabIcon: {
    fontSize: FontSize.xl,
    color: Colors.textMuted,
  },
  tabIconActive: {
    fontSize: FontSize.xl,
    color: Colors.primary,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textMuted,
  },
  tabLabelActive: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
  },
  textInputMultiline: {
    minHeight: 100
  },
  field: {
    gap: Spacing.sm,
  },
});
