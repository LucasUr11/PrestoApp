import { View } from "react-native";
import { globalStyles } from "../../style/global-styles";
import { CrearPresupuesto } from "./CrearPresupuesto";

const PrestoApp = () => {
  return (
    <View style={globalStyles.card}>
      <CrearPresupuesto />
    </View>
  )
}

export default PrestoApp