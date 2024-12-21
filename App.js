import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';  // Import AdminDashboard
import Add from './components/Add';
import CogonProduct from './components/CogonProduct';
import CarmenProduct from './components/CarmenProduct';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ title: 'Login' }} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ title: 'Admin Dashboard' }} />
        <Stack.Screen name="Add" component={Add} />
        <Stack.Screen name="CogonProduct" component={CogonProduct} />
        <Stack.Screen name="CarmenProduct" component={CarmenProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
