import { View, StyleSheet, Text } from "react-native";
import { Link, Stack } from 'expo-router';
import { Fontisto } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      <View style={styles.container}>
        <Fontisto name="alert" size={100} color="#fff" style={styles.icon} />
        <Text style={styles.title}>Página Não Encontrada</Text>
        <Text style={styles.description}>
          A página que você está procurando não existe. Volte para a tela inicial e continue sua navegação.
        </Text> 
        <Link href="/" style={styles.button}>
          Volte para a Home
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    color: '#ddd',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
