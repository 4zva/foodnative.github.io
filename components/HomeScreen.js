import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet} from 'react-native';

export default function HomeScreen({ route }) {
  const navigation = useNavigation();

  let records = (route.params && route.params.records) ? route.params.records : 
  [
    { id: 1, time: '08:00', description: 'Завтрак', calories: 500, proteins: 30, fats: 20, carbs: 50 },
    { id: 2, time: '13:00', description: 'Обед', calories: 700, proteins: 40, fats: 30, carbs: 60 },
    { id: 3, time: '19:00', description: 'Ужин', calories: 600, proteins: 35, fats: 25, carbs: 55 },
  ];

  function filteredRecords(records, id) {
    return records.filter((item) => item.id !== id);
  }

  function calculateTotalNutrients(records) {
    return records.reduce((totals, record) => {
      totals.calories += record.calories;
      totals.proteins +=  record.calories/4;
      totals.fats +=  record.calories/9;
      totals.carbs +=  record.calories/4;
      return totals;
    }, { calories: 0, proteins: 0, fats: 0, carbs: 0 });
  }

  const totalNutrients = calculateTotalNutrients(records);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>КБЖУ за текущую неделю:</Text>
      <Text style={styles.header}>Калории: {totalNutrients.calories}</Text>
      <Text style={styles.header}>Белки: {totalNutrients.proteins} г</Text>
      <Text style={styles.header}>Жиры: {totalNutrients.fats} г</Text>
      <Text style={styles.header}>Углеводы: {totalNutrients.carbs} г</Text>

      <FlatList
        data={records}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.recordContainer}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.calories}>Калории: {item.calories}</Text>
            <Button title="Подробнее" onPress={() => navigation.navigate('Record', { thisRecord: { id: item.id, time: item.time, description: item.description, calories: item.calories }, otherRecords: filteredRecords(records, item.id) })} />
          </View>
        )}
      />
      <Button title="Добавить новую запись" onPress={() => navigation.navigate('NewRecord', { otherRecords: records })} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9fafb',
      },
      header: {
        borderWidth: 1,
        borderColor: 'lightgray',
        padding: 15,
        borderRadius: 8,
        marginBottom: 5
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