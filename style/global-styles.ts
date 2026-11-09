import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.background
    },

    backgroundInput: {
        backgroundColor: '#EDEDF5',
        justifyContent: "space-between",
        flexDirection: 'row',
    },

    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    h1: {
        fontSize: 30,
        fontWeight: "bold",
    },

    textSecundary: {
        fontSize: 15,
        color: Colors.textSecundary
    }
})