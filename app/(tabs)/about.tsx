import { Text, View, StyleSheet } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Prazer,</Text>

      <View style={styles.bioContainer}>
        <Text style={styles.bioTitle}>Meu nome é Felipe Rosa</Text>
        <Text style={styles.bioText}>
          Tenho 19 anos, sou brasileiro e estou cursando Técnico em Informática no Colégio Técnico Industrial "Prof. Isaac Portal Roldán" - UNESP, com previsão de conclusão em 2025.
        </Text>
        <Text style={styles.bioText}>
          Meus interesses incluem desenvolvimento de software, tecnologias emergentes e participação em projetos de código aberto.
        </Text>
        <Text style={styles.bioText}>
          Além disso, jogo bastante futebol e diversos outros esportes.
        </Text>
        <Text style={styles.bioText}>
          Atualmente estou estagiando na empresa: CPFL Serviços, aqui em Bauru SP. 
        </Text>
        <Text style={styles.bioText}>
          Participei da MOBFOG - Mostra Brasileira de Foguetes, em 2022. Com isso, ganhei medalhas e conquistei títulos. 
        </Text>
        <Text style={styles.bioText}>
          Com a grande perfomance nesse evento, fui convidado a participar de outra competição em Sorocaba SP, onde fiquei em 5° lugar no ranking geral.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bioContainer: {
    backgroundColor: '#2E2E2E',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  bioTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bioText: {
    color: '#ddd',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
