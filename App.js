import React from 'react';
// React is the library used for building user interfaces in this app.

import { NavigationContainer } from '@react-navigation/native';
// NavigationContainer is the top-level component that manages the navigation system.

import { createStackNavigator } from '@react-navigation/stack';
// createStackNavigator creates a stack of screens for navigation, where each screen can be pushed or popped.

import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import AdminDashboard from './components/AdminDashboard';
import CogonProduct from './components/CogonProduct';
import CarmenProduct from './components/CarmenProduct';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import UserProfile from './components/UserProfile';
// Importing all the components (or screens) that will be part of the app's navigation.

const Stack = createStackNavigator();
// This creates a stack navigator instance, which will be used to define the screens and navigation behavior.

export default function App() {
  // The main function that defines the app's structure and functionality.
  return (
    <NavigationContainer>
      {/* 
        NavigationContainer wraps the navigation system and manages the navigation state. 
        It's required for the navigation to work.
      */}
      <Stack.Navigator initialRouteName="LoginPage">
        {/* 
          Stack.Navigator defines the screens in the stack and manages how users navigate between them. 
          The `initialRouteName` prop sets the first screen to be displayed when the app starts.
        */}
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage} 
          options={{ headerShown: false }} 
        />
        {/* 
          A screen for the login page. 
          `headerShown: false` hides the default navigation header for a cleaner look.
        */}
        <Stack.Screen 
          name="RegisterPage" 
          component={RegisterPage} 
          options={{ title: 'Sign Up' }} 
        />
        {/* 
          A screen for user registration. 
          The header title is set to "Sign Up" for better user context.
        */}
        <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AdminDashboard" 
          component={AdminDashboard} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CogonProduct" 
          component={CogonProduct} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CarmenProduct" 
          component={CarmenProduct} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="AddProduct" 
          component={AddProduct} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProductList" 
          component={ProductList} 
        />
        {/* 
          All these screens (HomePage, AdminDashboard, CogonProduct, CarmenProduct, AddProduct, and ProductList) 
          represent different parts of the app. They are linked to their respective components.
          Most have `headerShown: false` to hide the navigation header for a full-screen experience.
        */}
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ headerShown: false }} 
        />
        {/* 
          A screen for displaying and managing user profile information. 
          The navigation header is hidden for simplicity.
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
