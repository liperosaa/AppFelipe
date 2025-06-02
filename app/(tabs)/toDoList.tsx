import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useTarefas } from '../hooks/useTarefas';
import { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

export default function ToDoList() {
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();
    const inputRef = useRef<TextInput>(null);

    const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (event.nativeEvent.key === 'Enter') {
            adicionarTarefa();
            setTimeout(() => {
                inputRef.current?.focus(); 
            }, 100);
        }
    };

    const handleChangeText = (text: string) => {
        const formattedText = text.charAt(0).toUpperCase() + text.slice(1);
        setNovaTarefa(formattedText);
    };
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Tarefas</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    ref={inputRef}  
                    style={styles.input}
                    placeholder="Nova tarefa..."
                    placeholderTextColor="#7A7A7A"
                    value={novaTarefa}
                    onChangeText={handleChangeText}
                    onSubmitEditing={adicionarTarefa}
                    onKeyPress={handleKeyPress}
                />
                <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarTarefa}>
                    <Text style={styles.textoBotao}>📤</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tarefas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.tarefaContainer}>
                        <Text style={styles.tarefaTexto}>📌 {item.texto}</Text>
                        <TouchableOpacity onPress={() => removerTarefa(item.id)} style={styles.botaoRemover}>
                            <Text style={styles.textoBotaoRemover}>🗑️</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: 'gray' },
    titulo: { fontSize: 32, fontWeight: '600', textAlign: 'left', marginBottom: 24, color: '#2E2E2E' },
    inputContainer: { flexDirection: 'row', marginBottom: 24, alignItems: 'center' },
    input: { flex: 1, padding: 14, borderRadius: 12, color: '#2E2E2E', backgroundColor: '#FFFFFF', marginRight: 12, borderWidth: 1, borderColor: '#D1D1D1' },
    botaoAdicionar: { backgroundColor: '#1E90FF', padding: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }, 
    textoBotao: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
    tarefaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 18,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    tarefaTexto: { fontSize: 18, color: '#2E2E2E', flexShrink: 1 },
    botaoRemover: { backgroundColor: '#FF6B6B', padding: 8, borderRadius: 50 },
    textoBotaoRemover: { fontSize: 18, color: '#FFFFFF' },
});
