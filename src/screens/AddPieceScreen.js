import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddPieceScreen = ({ navigation, route }) => {
  // Estado para almacenar los datos de la nueva pieza
  const [piece, setPiece] = useState({ type: "", brand: "", serial: "", price: "", date: new Date() });
  // Estado para controlar la visibilidad del selector de fechas
  const [showPicker, setShowPicker] = useState(false);

  // Función para agregar la pieza
  const handleAddPiece = () => {
    if (piece.type && piece.brand && piece.serial && piece.price) {
      // Agregar la pieza al historial
      route.params?.addPiece({ id: Date.now().toString(), ...piece, date: piece.date.toISOString().split("T")[0] });

      // Mostrar mensaje de éxito
      Alert.alert("Pieza Agregada", "La pieza se ha guardado correctamente.", [{ text: "OK", onPress: () => navigation.goBack() }]);

      // Limpiar los campos
      setPiece({ type: "", brand: "", serial: "", price: "", date: new Date() });
    } else {
      alert("Completa todos los campos.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Registrar Nueva Pieza</Text>

      {/* Campos de entrada para los datos de la pieza */}
      <TextInput placeholder="Tipo de Pieza" style={styles.input} onChangeText={(text) => setPiece({ ...piece, type: text })} />
      <TextInput placeholder="Marca" style={styles.input} onChangeText={(text) => setPiece({ ...piece, brand: text })} />
      <TextInput placeholder="Número de Serie" style={styles.input} onChangeText={(text) => setPiece({ ...piece, serial: text })} />
      <TextInput placeholder="Precio" style={styles.input} keyboardType="numeric" onChangeText={(text) => setPiece({ ...piece, price: text })} />

      {/* Selector de fecha */}
      <Text style={styles.label}>Fecha de cambio:</Text>
      <Button title={piece.date.toISOString().split("T")[0]} onPress={() => setShowPicker(true)} />

      {showPicker && (
        <DateTimePicker
          value={piece.date}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) {
              setPiece({ ...piece, date: selectedDate });
            }
          }}
        />
      )}

      {/* Botón para agregar la pieza */}
      <Button title="Agregar Pieza" onPress={handleAddPiece} />
    </View>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Fondo claro para mejor contraste
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Color oscuro para el texto
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc", // Borde gris claro
    borderRadius: 8, // Bordes redondeados
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff", // Fondo blanco para los campos de entrada
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra para Android
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555", // Color gris oscuro para las etiquetas
  },
  button: {
    backgroundColor: "#007BFF", // Azul para el botón
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff", // Texto blanco para el botón
    fontSize: 16,
    fontWeight: "bold",
  },
  dateButton: {
    backgroundColor: "#e0e0e0", // Fondo gris claro para el botón de fecha
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333", // Texto oscuro para el botón de fecha
  },
});

export default AddPieceScreen;
