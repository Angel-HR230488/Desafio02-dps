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
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f5f5f5" // Fondo claro para mejor contraste
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    color: "#333" // Color oscuro para el texto
  },
  noPieces: { 
    fontSize: 18, 
    color: "#888", 
    textAlign: "center", 
    marginVertical: 20 
  },
  item: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: 15, 
    marginVertical: 8, 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 // Sombra para Android
  },
  text: { 
    fontSize: 16, 
    color: "#555" 
  },
  boldText: { 
    fontWeight: "bold", 
    fontSize: 16, 
    color: "#333" 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0,0,0,0.5)", 
    padding: 20 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    marginBottom: 10, 
    color: "#fff" 
  },
  button: { 
    backgroundColor: "#007BFF", 
    padding: 10, 
    borderRadius: 5, 
    alignItems: "center", 
    marginTop: 10 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  deleteButton: { 
    backgroundColor: "red", 
    padding: 10, 
    borderRadius: 5 
  },
  deleteButtonText: { 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: "bold" 
  }
});
export default HomeScreen;
