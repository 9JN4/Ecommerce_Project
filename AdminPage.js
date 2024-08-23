import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useImage } from "./ImageContext"; // Importer le contexte

export default function AdminPage({ navigation }) {
  const db = useSQLiteContext();
  const { selectedImage, setSelectedImage } = useImage(); // Utiliser le contexte pour gérer l'image
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (selectedImage) {
      setProduct({ ...product, image: selectedImage });
      setSelectedImage(null); // Réinitialiser après utilisation
    }
  }, [selectedImage]);

  const showProducts = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM products");
      setProducts(result);
    } catch (error) {
    }
  };

  const addProduct = async () => {
    if (product.name && product.description && product.price) {
      try {
        await db.runAsync(
          "INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)",
          [
            product.name,
            product.description,
            parseFloat(product.price),
            product.image,
          ]
        );
        await showProducts();
        setProduct({ name: "", description: "", price: "", image: "" });
      } catch (error) {
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await db.runAsync("DELETE FROM products WHERE id = ?", [id]);
      await showProducts(); // Actualiser la liste des produits après suppression
    } catch (error) {
    }
  };

  const handleSelectImage = () => {
    navigation.navigate("ImageSelectionPage");
  };

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestion des produits</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={product.name}
        onChangeText={(text) => setProduct({ ...product, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={product.description}
        onChangeText={(text) => setProduct({ ...product, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Prix"
        value={product.price}
        onChangeText={(text) => setProduct({ ...product, price: text })}
        keyboardType="numeric"
      />
      <Pressable style={styles.button} onPress={handleSelectImage}>
        <Text style={styles.buttonText}>Sélectionner une image</Text>
      </Pressable>
      {product.image ? (
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          onLoad={() => console.log("Image chargée avec succès.")}
          onError={(error) =>
            console.log(
              "Erreur lors du chargement de l'image:",
              error.nativeEvent.error
            )
          }
        />
      ) : null}
      <Pressable style={styles.button} onPress={addProduct}>
        <Text style={styles.buttonText}>Ajouter le produit</Text>
      </Pressable>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.price} $</Text>
            <Pressable onPress={() => deleteProduct(item.id)}>
              <Text>Supprimer</Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable
        style={[styles.button, { backgroundColor: "#007bff" }]}
        onPress={() => navigation.navigate("LocationPage")}
      >
        <Text style={styles.buttonText}>Voir la carte des entrepôts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
    marginBottom: 20,
    resizeMode: "cover",
  },
  product: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 10,
    borderRadius: 5,
  },
});
