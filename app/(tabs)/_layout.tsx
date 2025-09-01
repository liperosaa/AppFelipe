import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FavoritesProvider } from "../hooks/useFavorites";

export default function TabLayout() {
  return (
    <FavoritesProvider>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#2E2E2E", // fundo da tab bar
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",

          // 🔹 estilo do header (barra superior)
          headerStyle: {
            backgroundColor: "#2E2E2E",
            shadowColor: "transparent", // remove sombra no iOS
            elevation: 0, // remove sombra no Android
          },
          headerShadowVisible: false, // remove linha no iOS
          headerTintColor: "white", // cor do texto e ícones do header
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Principal",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "Sobre",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={
                  focused ? "information-circle" : "information-circle-outline"
                }
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="toDoList"
          options={{
            title: "To-Do List",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "checkbox" : "checkbox-outline"}
                color={color}
                size={24}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="BuscaBiografia"
          options={{
            title: "Mundo das Biografias",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "search" : "search-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favoritos",
            sceneContainerStyle: {
              backgroundColor: "gray", // 🔹 fundo da tela Favoritos
            },
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </FavoritesProvider>
  );
}
