import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet} from 'react-native';

export default function RecordScreen({ route }) {
  const navigation = useNavigation();

  const [record, setRecord] = useState(route.params.thisRecord);
  const otherRecords = route.params.otherRecords;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Запись о приёме пищи</Text>
      <Text style={styles.label}>Время:</Text>
      <TextInput style={styles.input} value={record.time} onChangeText={(text) => setRecord({ ...record, time: text})} />
      <Text style={styles.label}>Описание:</Text>
      <TextInput style={styles.input} value={record.description} onChangeText={(text) => setRecord({ ...record, description: text })} multiline />
      <Text style={styles.label}>Калории:</Text>
      <TextInput style={styles.input} value={String(record.calories)} onChangeText={(text) => setRecord({ ...record, calories: parseInt(text) || 0 })} keyboardType="numeric" />
      <Button title="Сохранить изменения" onPress={() => navigation.popTo('Home', { records: [...otherRecords, record] })} />
      <Button title="Удалить запись" onPress={() => navigation.popTo('Home', { records: [...otherRecords] })} color="red" />
    </View>
  );
}

// Функции сохранения изменений и удаления записи
const saveChanges = () => {
  console.log('Изменения сохранены');
};

const deleteRecord = () => {
  console.log('Запись удалена');
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9fafb',
      },
      recordContainer: {
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 15,
        borderRadius: 8,
      },
      time: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      description: {
        fontSize: 14,
        marginBottom: 5,
      },
      calories: {
        fontSize: 12,
        color: 'gray',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      label: {
        fontSize: 18,
        marginBottom: 5,
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        paddingHorizontal: 10,
        marginBottom: 15,
      },
});