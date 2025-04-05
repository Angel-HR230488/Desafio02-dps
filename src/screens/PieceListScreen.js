import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, Modal, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const PieceListScreen = ({ route }) => {
  // Estado para almacenar las piezas
  const [pieces, setPieces] = useState([]);
  // Estado para la pieza seleccionada en el modal
  const [selectedPiece, setSelectedPiece] = useState(null);
  // Estado para controlar la visibilidad del modal
  const [modalVisible, setModalVisible] = useState(false);

  useFocusEffect(() => {
    if (route.params?.newPiece) {
      setPieces([...pieces, { id: Date.now().toString(), ...route.params.newPiece }]);
    }
  });

  const deletePiece = (id) => {
    setPieces(pieces.filter((piece) => piece.id !== id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pieces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { setSelectedPiece(item); setModalVisible(true); }} style={styles.item}>
            <View>
              <Text style={styles.boldText}>{item.type}</Text>
              <Text style={styles.text}>Fecha: {item.date}</Text>
            </View>
            <Button title="Eliminar" onPress={() => deletePiece(item.id)} color="red" />
          </TouchableOpacity>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedPiece && (
            <>
              <Text style={styles.modalTitle}>{selectedPiece.type}</Text>
              <Text>Marca: {selectedPiece.brand}</Text>
              <Text>Número de Serie: {selectedPiece.serial}</Text>
              <Text>Precio: {selectedPiece.price}</Text>
              <Text>Fecha: {selectedPiece.date}</Text>
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({container: {
  flex: 1,
  padding: 20,
  backgroundColor: "#f5f5f5", // Fondo claro para mejor contraste
},
item: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  marginVertical: 8,
  backgroundColor: "#fff", // Fondo blanco para los elementos
  borderRadius: 10, // Bordes redondeados
  shadowColor: "#000", // Sombra para iOS
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3, // Sombra para Android
},
text: {
  fontSize: 16,
  color: "#555", // Texto gris oscuro
},
boldText: {
  fontWeight: "bold",
  fontSize: 16,
  color: "#333", // Texto más oscuro para resaltar
},
modalContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.5)", // Fondo semitransparente para el modal
  padding: 20,
},
modalTitle: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
  color: "#fff", // Texto blanco para el título del modal
},
button: {
  backgroundColor: "#007BFF", // Azul para los botones
  padding: 10,
  borderRadius: 8,
  alignItems: "center",
  marginTop: 10,
},
buttonText: {
  color: "#fff", // Texto blanco para los botones
  fontSize: 16,
  fontWeight: "bold",
},
deleteButton: {
  backgroundColor: "red", // Rojo para el botón de eliminar
  padding: 10,
  borderRadius: 8,
  alignItems: "center",
},
deleteButtonText: {
  color: "#fff", // Texto blanco para el botón de eliminar
  fontSize: 14,
  fontWeight: "bold",
},
});

export default PieceListScreen;
