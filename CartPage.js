import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function CartPage({ navigation }) {
  const db = useSQLiteContext();
  const [cart, setCart] = useState([]);

  const showCart = async () => {
    try {
      const result = await db.getAllAsync(`
        SELECT cart.id, products.name, products.price, cart.quantity 
        FROM cart 
        JOIN products ON cart.productId = products.id
      `);
      setCart(result);
    } catch (error) {
      console.log("Erreur lors de la récupération du panier :", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await db.runAsync("DELETE FROM cart WHERE id = ?", [id]);
      await showCart();
    } catch (error) {
      console.log("Erreur lors de la suppression du produit :", error);
    }
  };

  const clearCart = async () => {
    try {
      await db.runAsync("DELETE FROM cart");
      await showCart();
    } catch (error) {
      console.log("Erreur lors du vidage du panier :", error);
    }
  };

  const purchase = async () => {
    Alert.alert("Achat réussi", `Merci pour votre achat de ${totalPrice} $`);
    await clearCart();
  };

  useEffect(() => {
    showCart();
  }, []);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text>{item.name}</Text>
            <Text>{item.price} $</Text>
            <Text>Quantité: {item.quantity}</Text>
            <Pressable onPress={() => removeItem(item.id)}>
              <Text>Enlever</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text>Total: {totalPrice} $</Text>
      <Pressable style={styles.button} onPress={purchase}>
        <Text style={styles.buttonText}>Acheter</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={clearCart}>
        <Text style={styles.buttonText}>Vider le panier</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cartItem: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
