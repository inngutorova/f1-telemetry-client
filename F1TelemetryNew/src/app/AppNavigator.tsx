// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../pages/HomeScreen';
import TelemetryScreen from '../pages/TelemetryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B0F1A',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: { backgroundColor: '#0B0F1A' }, // Добавляем фон для карточек
          animationEnabled: false, // Отключаем анимацию (опционально)
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'F1 Telemetry', 
            headerShown: false,
            cardStyle: { backgroundColor: '#0B0F1A' }
          }}
        />
        <Stack.Screen 
          name="Telemetry" 
          component={TelemetryScreen} 
          options={{ 
            title: 'Telemetry', 
            headerShown: false,
            cardStyle: { backgroundColor: '#0B0F1A' }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}