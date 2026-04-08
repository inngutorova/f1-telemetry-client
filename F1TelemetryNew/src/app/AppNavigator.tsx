// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelemetryScreen from '../pages/TelemetryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: '#0B1422' }
        }}
      >
        <Stack.Screen name="Telemetry" component={TelemetryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}