import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, FontSize, FontWeight, Radius, Spacing } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';

import { useClientes } from '@/context/ClientesContext';
import { calculoItemsExtra, ItemExtra } from '@/utils/calculoItemsExtra';
import { calculoPorTrabajo, CampoTexto, Complejidad, DatosPorTrabajo } from '@/utils/calculoPorTrabajo';
import { agregarCliente, crearCliente, DatosCliente } from '@/utils/clientes';
import { convertirAString } from '@/utils/convertirAString';
import { calculoPorHoras, DatosHoras } from '@/utils/FuncionesPorHoras';
import { Modo } from '@/utils/presupuesto';
import { useRouter } from 'expo-router';
import { CalculoPorHoras } from './CalculoPorHoras';
import { CalculoPorTrabajo } from './CalculoPorTrabajo';
import { FormularioCliente } from './FormularioCliente';
import { ItemsExtra } from './ItemsExtra';
import { SegmentedControl } from './SegmentedControl';

import { usePresupuestos } from '@/context/PresupuestoContext';
import { useTipoTrabajos } from '@/context/TipoTrabajoContext';
import { agregarPresupuesto, armarPresupuesto } from '@/utils/presupuesto';

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
  const router = useRouter();

  /* 
    ///////////////// CONTEXT /////////////////
 */

  const { clientes, setClientes } = useClientes();
  const { setPresupuestos } = usePresupuestos();
  const { tipoTrabajos } = useTipoTrabajos();

  /* 
      ///////////////// ESTADOS /////////////////
  */

  // Estado para el Formulario.-
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Estados para cambiar los Clientes.-
  const [clienteId, setClienteId] = useState<string | null>(null);
  const [mostrarSelector, setMostrarSelector] = useState(false);

  const [tipoTrabajoId, setTipoTrabajoId] = useState<string | null>(null);

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

  // Generar el presupuesto.-
  const generarPresupuesto = () => {
    const tipoElegido = tipoTrabajos.find((t) => t.id === tipoTrabajoId);

    const nuevo = armarPresupuesto({
      cliente: clienteElegido ?? null, // '??' convierte el 'undefined' en 'null'.-
      modo,
      descripcion: modo === 'horas' ? 'Trabajo por horas' : (tipoElegido?.nombre ?? 'Trabajo por tipo'),
      itemExtra: items,
      total,
      notaPrivada,
    });

    setPresupuestos((actuales) => agregarPresupuesto(actuales, nuevo));
    router.push({ pathname: '/vista-previa', params: {id: nuevo.id}});
  }

  return (
    <View style={globalStyles.screen}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={globalStyles.title}>Nuevo Presupuesto</Text>
          <Text style={globalStyles.subtitle}>Calculá y enviá en pocos pasos</Text>
        </View>

        {/* Cargar cliente.- */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.label}>Cliente</Text>
          <Pressable
            onPress={() => setMostrarSelector(true)}
            style={globalStyles.selectField}
          >
            <Text
              style={clienteElegido ? globalStyles.selectFieldText : globalStyles.selectFieldPlaceholder}
              numberOfLines={1}
            >
              {clienteElegido ? clienteElegido.nombreApellido : 'Elegir cliente del historial'}
            </Text>
            <Text style={globalStyles.muted}>▼</Text>
          </Pressable>
          <Pressable
            onPress={() => setMostrarFormulario(true)}
            hitSlop={8}
          >
            <Text style={globalStyles.linkButtonText}>+ Crear cliente nuevo</Text>
          </Pressable>
        </View>

        {/* Cálculos.- */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Tipo de cálculo</Text>
          <SegmentedControl
            options={[
              { value: 'horas', label: 'Por horas' },
              { value: 'trabajo', label: 'Por tipo de trabajo' }
            ]}
            value={modo}
            onChange={setModo}
          />

          {modo === 'horas'
            ? <CalculoPorHoras
              datos={datosHoras}
              cambiarCampos={cambiarCamposHoras}
            />
            : <CalculoPorTrabajo
              datos={datosPorTrabajo}
              cambiarCampos={cambiarCamposPorTrabajo}
              cambiarComplejidad={cambiarComplejidad}
              tipoTrabajoId={tipoTrabajoId}
              setTipoTrabajoId={setTipoTrabajoId}
            />
          }
        </View>

        {/* Notas Privadas.- */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Notas privadas</Text>
          <View style={globalStyles.field}>
            <TextInput
              value={notaPrivada}
              onChangeText={setNotaPrivada}
              placeholder="No irá en el presupuesto"
              style={[globalStyles.textInput, globalStyles.textInputMultiline]}
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
        <View style={styles.totalCard}>
          <View style={styles.totalRow}>
            <View style={styles.totalInfo}>
              <Text style={styles.totalLabel}>Total estimado</Text>
              <Text style={styles.totalAmount}>{aString}</Text>
            </View>
            <Pressable
              onPress={generarPresupuesto}
              style={({ pressed }) => [
                globalStyles.primaryButton,
                pressed && globalStyles.primaryButtonPressed,
              ]}
            >
              <Text style={globalStyles.primaryButtonText}>Generar PDF</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <Pressable style={styles.tabItem} hitSlop={8}>
          <Text style={styles.tabIconActive}>●</Text>
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


      {/* MODALES.- */}
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

      <Modal
        visible={mostrarSelector}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setMostrarSelector(false)}
      >
        <View style={globalStyles.modalScreen}>
          <View style={globalStyles.modalHeader}>
            <Text style={globalStyles.title}>Elegir cliente</Text>
            <Text style={globalStyles.subtitle}>Seleccioná un cliente del historial</Text>
          </View>

          <ScrollView contentContainerStyle={globalStyles.modalContent} keyboardShouldPersistTaps="handled">
            {clientes.length === 0 ? (
              <View style={globalStyles.emptyState}>
                <Text style={globalStyles.emptyStateTitle}>Todavía no hay clientes</Text>
                <Text style={globalStyles.emptyStateText}>
                  Creá un cliente nuevo para poder seleccionarlo en tus presupuestos.
                </Text>
              </View>
            ) : (
              <View style={globalStyles.section}>
                {clientes.map((cliente) => {
                  const selected = cliente.id === clienteId;
                  return (
                    <Pressable
                      key={cliente.id}
                      onPress={() => {
                        setClienteId(cliente.id);
                        setMostrarSelector(false);
                      }}
                      style={[globalStyles.listItem, selected && globalStyles.listItemActive]}
                    >
                      <View style={styles.listItemContent}>
                        <Text style={globalStyles.listItemText}>{cliente.nombreApellido}</Text>
                        {!!cliente.empresa && (
                          <Text style={globalStyles.listItemMeta}>{cliente.empresa}</Text>
                        )}
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
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: Spacing['2xl'],
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  header: {
    gap: Spacing.xs,
  },
  totalCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 1,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.lg,
  },
  totalInfo: {
    flex: 1,
    gap: Spacing.xs,
  },
  totalLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  totalAmount: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
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
    fontSize: FontSize.lg,
    color: Colors.textMuted,
  },
  tabIconActive: {
    fontSize: FontSize.lg,
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
