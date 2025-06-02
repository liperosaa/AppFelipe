import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveBackgroundColor: '#2E2E2E',
        tabBarInactiveBackgroundColor: 'gray',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white'
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Principal',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Sobre',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="toDoList"
        options={{
          title: 'To-Do List',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'checkbox' : 'checkbox-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="BuscaBiografia"
        options={{
          title: 'Mundo das Biografias',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'search' : 'search-outline'} size={24} color={color} />
          )
        }}
      />
    </Tabs>
  );
}
