import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

export default function ProductListPage({ navigation }) {
  const db = useSQLiteContext();
  const [products, setProducts] = useState([]);

  const showProducts = async () => {
    try {
      const result = await db.getAllAsync("SELECT * FROM products");
      setProducts(result);
    } catch (error) {
      console.log("Erreur lors de la récupération des produits :", error);
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate("ProductDetailPage", { product: item })
            }
            style={styles.product}
          >
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.price} $</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  product: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    marginBottom: 10,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
