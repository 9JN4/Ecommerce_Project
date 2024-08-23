import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SQLiteProvider } from "expo-sqlite";

import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import ProductListPage from "./ProductListPage";
import ProductDetailPage from "./ProductDetailPage";
import CartPage from "./CartPage";
import LocationPage from "./LocationPage";
import ImageSelectionPage from "./ImageSelectionPage";
import { ImageProvider } from "./ImageContext";

const Stack = createStackNavigator();

async function initializeDatabase(db) {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      role TEXT
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      price REAL,
      image TEXT
    );
    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      productId INTEGER,
      quantity INTEGER
    );
    INSERT OR IGNORE INTO users (username, password, role) VALUES 
      ('admin', 'adminpass', 'admin'), 
      ('client', 'clientpass', 'client');
  `);
}

export default function App() {
  return (
    <ImageProvider>
      <SQLiteProvider databaseName="ecommerce.db" onInit={initializeDatabase}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginPage">
            <Stack.Screen
              name="LoginPage"
              component={LoginPage}
              options={{ title: "Acceuil" }} // Titre personnalisé
            />
            <Stack.Screen
              name="AdminPage"
              component={AdminPage}
              options={{ title: "Gestion des Produits" }} 
            />
            <Stack.Screen
              name="ProductListPage"
              component={ProductListPage}
              options={{ title: "Liste des Produits" }} 
            />
            <Stack.Screen
              name="ProductDetailPage"
              component={ProductDetailPage}
              options={{ title: "Détails du Produit" }} 
            />
            <Stack.Screen
              name="CartPage"
              component={CartPage}
              options={{ title: "Panier" }} 
            />
            <Stack.Screen
              name="LocationPage"
              component={LocationPage}
              options={{ title: "Carte des Entrepôts" }} 
            />
            <Stack.Screen
              name="ImageSelectionPage"
              component={ImageSelectionPage}
              options={{ title: "Sélection d'Image" }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SQLiteProvider>
    </ImageProvider>
  );
}
