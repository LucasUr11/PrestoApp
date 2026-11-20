import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { ClientesProvider } from '@/context/ClientesContext';
import { globalStyles } from '@/styles/globalStyles';

const RootLayout = () => {
  return (
    <ClientesProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <SafeAreaView style={globalStyles.screen} edges={['top', 'left', 'right']}>
          <Slot />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClientesProvider>
  );
};

export default RootLayout;
