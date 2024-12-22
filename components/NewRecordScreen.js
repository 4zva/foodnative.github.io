import React, { useState } from 'react';
import { View, Text, TextInput, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet} from 'react-native';

export default function NewRecordScreen({ route }) {
  const navigation = useNavigation();

  const [newRecord, setNewRecord] = useState({
    id: new Date().getMilliseconds(),
    time: '',
    description: '',
    calories: 0,
  });

  const otherRecords = route.params.otherRecords;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новая запись</Text>
      <Text style={styles.label}>Время:</Text>
      <TextInput style={styles.input} value={newRecord.time} onChangeText={(text) => setNewRecord({ ...newRecord, time: text})} />
      <Text style={styles.label}>Описание:</Text>
      <TextInput style={styles.input} value={newRecord.description} onChangeText={(text) => setNewRecord({ ...newRecord, description: text })} multiline />
      <Text style={styles.label}>Калории:</Text>
      <TextInput style={styles.input} value={String(newRecord.calories)} onChangeText={(text) => setNewRecord({ ...newRecord, calories: parseInt(text) || 0 })} keyboardType="numeric" />
      <Button title="Создать запись" onPress={() => navigation.popTo('Home', { records: [...otherRecords, newRecord] })} />
    </View>
  );
}



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