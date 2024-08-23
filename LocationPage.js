import React, { useState, useEffect } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";

const warehouses = [
  { id: 1, name: "Entrepôt 1", latitude: 48.8566, longitude: 2.3522 },
  { id: 2, name: "Entrepôt 2", latitude: 48.8666, longitude: 2.3522 },
];

export default function LocationPage() {
  const { height, width } = useWindowDimensions();
  const [closestWarehouse, setClosestWarehouse] = useState(null);
  const deliveryAddress = { latitude: 48.8566, longitude: 2.3522 }; // Exemple d'adresse de livraison

  useEffect(() => {
    const closest = warehouses.reduce((prev, curr) => {
      const prevDistance = getDistance(prev, deliveryAddress);
      const currDistance = getDistance(curr, deliveryAddress);
      return prevDistance < currDistance ? prev : curr;
    });
    setClosestWarehouse(closest);
  }, []);

  const getDistance = (point1, point2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Rayon de la Terre en kilomètres
    const dLat = toRad(point2.latitude - point1.latitude);
    const dLon = toRad(point2.longitude - point1.longitude);
    const lat1 = toRad(point1.latitude);
    const lat2 = toRad(point2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance en kilomètres
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // Ajout du provider Google
        style={{ height: height, width: width }}
        showsUserLocation
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {warehouses.map((wh) => (
          <Marker
            key={wh.id}
            coordinate={{ latitude: wh.latitude, longitude: wh.longitude }}
            title={wh.name}
          />
        ))}
        {closestWarehouse && (
          <Polyline
            coordinates={[
              {
                latitude: closestWarehouse.latitude,
                longitude: closestWarehouse.longitude,
              },
              deliveryAddress,
            ]}
            strokeColor="red"
            strokeWidth={2}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
