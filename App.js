import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import AddPieceScreen from "./src/screens/AddPieceScreen";

// Se crea el stack navigator para manejar la navegación entre pantallas
const Stack = createStackNavigator();

export default function App() {
  return (
    // Contenedor principal para la navegación
    <NavigationContainer>
      <Stack.Navigator>
        {/* Pantalla principal: Historial de piezas */}
        <Stack.Screen name="Menú" component={HomeScreen} />
        {/* Pantalla para registrar una nueva pieza */}
        <Stack.Screen name="Registrar Pieza" component={AddPieceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
