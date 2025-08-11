import { StyleSheet, Text, TextInput, View, Image, ScrollView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useBuscaBiografia } from '../hooks/useBuscaBiografia';

export default function BuscaBiografia() {
  const { nomeBusca, setNomeBusca, biografia, buscarBiografia } = useBuscaBiografia();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Procure uma Biografia</Text>

      <TextInput
        style={styles.textinput}
        placeholder="Digite o nome da pessoa"
        value={nomeBusca}
        onChangeText={setNomeBusca}
      />

      <Pressable style={styles.iconButton} onPress={buscarBiografia}>
        <MaterialIcons name="search" size={24} color="#fff" />
        <Text style={styles.iconButtonLabel}>Busque</Text>
      </Pressable>

      {biografia && (
        <View style={styles.result}>
          <Text style={styles.name}>{biografia.nome}</Text>

          {biografia.imagem ? (
            <Image
              source={{ uri: biografia.imagem }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.missingImage}>Imagem não disponível</Text>
          )}

          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.text}>{biografia.descricao}</Text>

          <Text style={styles.label}>Nascimento:</Text>
          <Text style={styles.text}>
            {biografia.nascimento} em {biografia.localNascimento}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  textinput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  iconButtonLabel: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 15,
  },
  name: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 10,
  },
  missingImage: {
    color: '#ccc',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  label: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
