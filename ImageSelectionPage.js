import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { useImage } from "./ImageContext"; // Importer le contexte

const images = [
  {
    uri: "https://img.freepik.com/photos-gratuite/vue-dessus-pamplemousses-coupes-surface-nue_140725-62466.jpg?t=st=1724193879~exp=1724197479~hmac=2fdc1a22cf676b6877256107ad0d0b41119afc8896aff80e4973ad6c0711d99c&w=1380", // Remplace par l'URL de ta première image
    label: "Pamplemousse", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/vue-dessus-tomates-fraiches-mures-gouttes-eau-fond-noir_141793-3433.jpg?t=st=1724194082~exp=1724197682~hmac=f5c1f9b72ee355d4aa8d826f6dfcba4b18657fcb50d4e7f7d2a95c9402a75850&w=740", // Remplace par l'URL de ta deuxième image
    label: "Tomates", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/vue-dessus-arrangement-citrons-delicieux_23-2149433490.jpg?t=st=1724193763~exp=1724197363~hmac=2605370e9b1c665efe6cffeac76b7da0cdada108aa4d5a475a463b3d46e40d11&w=740", // Remplace par l'URL de ta troisième image
    label: "Citrons", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/gros-plan-vertical-bleuets-gouttelettes-eau-feuilles_181624-742.jpg?t=st=1724194172~exp=1724197772~hmac=d1c54b20bc936c74fe68f4d98b3d6cf691d45b2d78e213275f03f4dd28e022c5&w=740", // Remplace par l'URL de ta quatrième image
    label: "Bleuets", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/baie-fraise-levitation-fond-blanc_485709-57.jpg?t=st=1724194209~exp=1724197809~hmac=ac5311dba1d36b108ab5266414fb86a438a1569a12a742cfdb1594d7e9e73b0e&w=826", // Remplace par l'URL de ta cinquième image
    label: "Fraises", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/fond-delicieuses-framboises_1268-31484.jpg?t=st=1724194246~exp=1724197846~hmac=7dcb9a9ae7d642c5db9fb989aa75b3de499ac285593036e045b7c869a24b410f&w=1380", // Remplace par l'URL de ta sixième image
    label: "Framboises", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/kiwi-frais-isole_144627-30034.jpg?t=st=1724332993~exp=1724336593~hmac=f52d58338e7e3a9e34b23bea2793d6bf2cac76b4bd0ebdd2cb694d2c87b2cb6c&w=1800", // Remplace par l'URL de ta septième image
    label: "Kiwi", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/tranches-oranges-entieres_144627-3981.jpg?t=st=1724332960~exp=1724336560~hmac=fbec8e2552a10b8ac6ece55a0337c562a8ab6b56d535c7ab1e63f6dc1724c494&w=1800", // Remplace par l'URL de ta huitième image
    label: "Oranges", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-premium/photo-complete-pommes-vendre-marche_1048944-1436590.jpg?w=1800", // Remplace par l'URL de ta neuvième image
    label: "Pommes", // Remplace par ta description
  },
  {
    uri: "https://img.freepik.com/photos-gratuite/composition-delicieuses-bananes-exotiques_23-2149090914.jpg?t=st=1724332882~exp=1724336482~hmac=e0f54bb6614659e8b6834022147a59737ee9e58eb58c3dd54b015d9ed6a27304&w=1800", // Remplace par l'URL de ta dixième image
    label: "Bananes", // Remplace par ta description
  },
];

export default function ImageSelectionPage({ navigation }) {
  const { setSelectedImage } = useImage(); // Utiliser le contexte pour définir l'image sélectionnée

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sélectionner une image</Text>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Pressable
            style={styles.imageContainer}
            onPress={() => {
              console.log("Image sélectionnée:", item.uri); // Ajout du log
              setSelectedImage(item.uri);
              navigation.goBack();
            }}
          >
            <Image source={{ uri: item.uri }} style={styles.image} />
            <Text style={styles.label}>{item.label}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.uri}
      />
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
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
  },
});
