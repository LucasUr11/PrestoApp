import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ClientesProvider } from '@/context/ClientesContext';
import { TipoTrabajoProvider } from '@/context/TipoTrabajoContext';
import { globalStyles } from '@/styles/globalStyles';

const RootLayout = () => {
  return (
    <ClientesProvider>
      <TipoTrabajoProvider>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <SafeAreaView style={globalStyles.screen} edges={['top', 'left', 'right']}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </TipoTrabajoProvider>
    </ClientesProvider>
  );
};

export default RootLayout;
