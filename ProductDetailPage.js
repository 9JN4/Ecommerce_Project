import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function ProductDetailPage({ route, navigation }) {
  const db = useSQLiteContext();
  const { product } = route.params;
  const [quantity, setQuantity] = useState("1");

  const addToCart = async () => {
    const intQuantity = parseInt(quantity, 10);
    if (isNaN(intQuantity) || intQuantity <= 0) {
      Alert.alert("Erreur", "Veuillez entrer une quantité valide");
      return;
    }

    try {
      await db.runAsync(
        "INSERT INTO cart (productId, quantity) VALUES (?, ?)",
        [product.id, intQuantity]
      );
      Alert.alert("Succès", "Produit ajouté au panier");
      navigation.navigate("CartPage");
    } catch (error) {
      console.log("Erreur lors de l'ajout au panier :", error);
    }
  };

  return (
    <View style={styles.container}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.image} />
      ) : (
        <Image
          source={{
            uri: "https://www.eatforhealth.gov.au/sites/default/files/images/the_guidelines/fruit%26vegetables_600x300.jpg",
          }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>{product.price} $</Text>
      <TextInput
        style={styles.input}
        placeholder="Quantité"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <Pressable style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});
