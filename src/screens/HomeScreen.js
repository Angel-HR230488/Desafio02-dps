import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, Modal, StyleSheet, Alert } from "react-native";

const HomeScreen = ({ navigation }) => {
  // Estado para almacenar las piezas registradas
  const [pieces, setPieces] = useState([]);
  // Estado para la pieza seleccionada en el modal
  const [selectedPiece, setSelectedPiece] = useState(null);
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);

  // Función para agregar una nueva pieza al historial
  const addPiece = (newPiece) => {
    setPieces([...pieces, newPiece]);
  };

  // Función para eliminar una pieza del historial
  const deletePiece = (id) => {
    Alert.alert("Eliminar Pieza", "¿Estás seguro de que quieres eliminar esta pieza?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", onPress: () => setPieces(pieces.filter((piece) => piece.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Historial de Piezas</Text>

      {/* Lista de piezas o mensaje si no hay piezas */}
      {pieces.length === 0 ? (
        <Text style={styles.noPieces}>No hay piezas agregadas.</Text>
      ) : (
        <FlatList
          data={pieces}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // Cada pieza es un botón que abre el modal con detalles
            <TouchableOpacity onPress={() => { setSelectedPiece(item); setModalVisible(true); }} style={styles.item}>
              <View>
                <Text style={styles.boldText}>{item.type}</Text>
                <Text style={styles.text}>Fecha de cambio: {item.date}</Text>
              </View>
              {/* Botón para eliminar la pieza */}
              <Button title="Eliminar" onPress={() => deletePiece(item.id)} color="red" />
            </TouchableOpacity>
          )}
        />
      )}

      {/* Botón para navegar a la pantalla de registro de piezas */}
      <Button title="Agregar Nueva Pieza" onPress={() => navigation.navigate("Registrar Pieza", { addPiece })} />

      {/* Modal para mostrar los detalles de la pieza seleccionada */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPiece && (
            <>
              <Text style={styles.modalTitle}>{selectedPiece.type}</Text>
              <Text>Marca: {selectedPiece.brand}</Text>
              <Text>Número de Serie: {selectedPiece.serial}</Text>
              <Text>Precio: {selectedPiece.price}</Text>
              <Text>Fecha: {selectedPiece.date}</Text>
              {/* Botón para cerrar el modal */}
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  noPieces: { fontSize: 18, color: "#777", textAlign: "center", marginVertical: 20 },
  item: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  text: { fontSize: 16 },
  boldText: { fontWeight: "bold" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 20 },
  modalTitle: { fontSize: 20, fontWeight: "bold" },
});

export default HomeScreen;
