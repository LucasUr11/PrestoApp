import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSize, FontWeight, Spacing } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';
import { useState } from 'react';
import { CalculoPorHoras } from './CalculoPorHoras';
import { CalculoPorTiempo } from './CalculoPorTiempo';
import { SegmentedControl } from './SegmentedControl';

type Modo = 'horas' | 'trabajo';

export const CrearPresupuesto = () => {

  const [modo, setModo] = useState<Modo>('horas');

  return (
    <View style={globalStyles.screen}>
      <ScrollView
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
            <Text style={globalStyles.body}>Elegir cliente del historial</Text>
            <Text style={globalStyles.muted}>▼</Text>
          </View>
          <Pressable hitSlop={8}>
            <Text style={globalStyles.linkButtonText}>+ Crear cliente nuevo</Text>
          </Pressable>
        </View>

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
            ? <CalculoPorHoras />
            : <CalculoPorTiempo />
          }
        </View>

        {/* Ítems Extra.- */}
        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Ítems extra</Text>
          <View style={styles.chipRow}>
            <Pressable style={[globalStyles.pillButton, globalStyles.pillButtonActive]}>
              <Text style={[globalStyles.pillButtonText, globalStyles.pillButtonTextActive]}>
                Revisiones
              </Text>
            </Pressable>
            <Pressable style={globalStyles.pillButton}>
              <Text style={globalStyles.pillButtonText}>Urgencia</Text>
            </Pressable>
            <Pressable style={globalStyles.pillButton}>
              <Text style={globalStyles.pillButtonText}>+ Agregar</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.totalRow}>
          <View style={styles.totalInfo}>
            <Text style={globalStyles.muted}>Total estimado</Text>
            <Text style={styles.totalAmount}>$340</Text>
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
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
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
});
