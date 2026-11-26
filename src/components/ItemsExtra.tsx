import { Dispatch, SetStateAction } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';
import { globalStyles } from '@/styles/globalStyles';

import {
  ItemExtra,
  agregarItem,
  alternarItem,
  cambiarNombre,
  cambiarValor,
} from '@/utils/calculoItemsExtra';

// Esqueleto de las props.-
type Props = {
  items: ItemExtra[];
  setItems: Dispatch<SetStateAction<ItemExtra[]>>;
};

export const ItemsExtra = ({ items, setItems }: Props) => {
  return (
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>Ítems extra</Text>

      {/* Fila de chips.- */}
      <View style={styles.chipRow}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setItems((actuales) => alternarItem(actuales, item.id))}
            style={[globalStyles.pillButton, item.activo && globalStyles.pillButtonActive]}
          >
            <Text
              style={[
                globalStyles.pillButtonText,
                item.activo && globalStyles.pillButtonTextActive,
              ]}
            >
              {item.nombre || 'Sin nombre'}
            </Text>
          </Pressable>
        ))}

        {/* Bóton de Agregar más.- */}
        <Pressable
          onPress={() => setItems((actuales) => agregarItem(actuales))}
          style={globalStyles.pillButton}
        >
          <Text style={globalStyles.pillButtonText}>+ Agregar</Text>
        </Pressable>
      </View>

      {/* Monto de los items activos- */}
      {items
        .filter((item) => item.activo)
        .map((item) => (
          <View key={item.id} style={globalStyles.field}>
            {item.personalizado ? (
              <TextInput
                value={item.nombre}
                onChangeText={(texto) =>
                  setItems((actuales) => cambiarNombre(actuales, item.id, texto))
                }
                placeholder="Nombre del ítem"
                placeholderTextColor={Colors.placeholder}
                style={globalStyles.textInput}
              />
            ) : (
              <Text style={globalStyles.label}>{item.nombre}</Text>
            )}
            <TextInput
              value={item.valor}
              onChangeText={(texto) =>
                setItems((actuales) => cambiarValor(actuales, item.id, texto))
              }
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={Colors.placeholder}
              style={globalStyles.textInput}
            />
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
});
