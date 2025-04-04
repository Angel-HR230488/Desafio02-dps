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
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  input: { borderBottomWidth: 1, marginBottom: 10, fontSize: 16, padding: 8 },
  label: { fontSize: 16, marginTop: 10 },
});

export default AddPieceScreen;
