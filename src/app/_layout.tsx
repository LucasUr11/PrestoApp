import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ClientesProvider } from '@/context/ClientesContext';
import { PresupuestoProvider } from '@/context/PresupuestoContext';
import { TipoTrabajoProvider } from '@/context/TipoTrabajoContext';
import { globalStyles } from '@/styles/globalStyles';

const RootLayout = () => {
  return (
    <ClientesProvider>
      <TipoTrabajoProvider>
        <PresupuestoProvider>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <SafeAreaView style={globalStyles.screen} edges={['top', 'left', 'right']}>
              <Stack screenOptions={{ headerShown: false }} />
            </SafeAreaView>
          </SafeAreaProvider>
        </PresupuestoProvider>
      </TipoTrabajoProvider>
    </ClientesProvider>
  );
};

export default RootLayout;
