import { Slot } from "expo-router";
import { View } from "react-native";
import { globalStyles } from "../../style/global-styles";

const RootLayout = () => {
  return (
    <View style={globalStyles.background}>

      {/* Cualqueir ruta dentro de 'app/' se renderiza acá.- */}
      <Slot></Slot>
      
    </View>
  )
}

export default RootLayout