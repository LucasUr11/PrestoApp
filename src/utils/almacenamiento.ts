import AsyncStorage from '@react-native-async-storage/async-storage';

// Guarda los datos bajo un nombre.-
export const guardarDatos = async <T>(clave: string, valor: T): Promise<void> => {
    try {
        await AsyncStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
        // La app no se detiene, sigue andando con los datos de la memoria.-
    }
};

// Lee los datos guardados bajo ese nombre, retorna null si no hay nada.-
export const leerDatos = async <T>(clave: string): Promise<T | null> => {
    try {
        const texto = await AsyncStorage.getItem(clave);
        return texto === null ? null : (JSON.parse(texto) as T);
    } catch (error) {
        return null;
    };
};