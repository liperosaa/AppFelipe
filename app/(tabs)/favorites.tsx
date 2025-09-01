import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useFavorites } from "../hooks/useFavorites";

export default function FavoritesScreen() {
  const { favorites, removeFavorite } = useFavorites();


  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Nenhum favorito adicionado ainda.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFavorite(item.name)}>
            <Text style={styles.remove}>Remover</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'gray' },
  emptyText: { fontSize: 18, color: "white" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  name: { flex: 1, fontSize: 18 },
  remove: { color: "red", fontSize: 16 },
});
