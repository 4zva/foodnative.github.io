import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import RecordScreen from './components/RecordScreen';
import NewRecordScreen from './components/NewRecordScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Мой дневник питания' }} />
        <Stack.Screen name="Record" component={RecordScreen} options={{ headerTitle: 'Детали записи' }} />
        <Stack.Screen name="NewRecord" component={NewRecordScreen} options={{ headerTitle: 'Новая запись' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}