import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import CogonProduct from './components/CogonProduct';
import CarmenProduct from './components/CarmenProduct';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UserProfile from './components/UserProfile';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ title: 'Sign Up' }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="CogonProduct" component={CogonProduct} options={{ headerShown: false }} />
        <Stack.Screen name="CarmenProduct" component={CarmenProduct} options={{ headerShown: false }} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
