import React, { useState } from 'react';
// React is the library for building user interfaces. 
// `useState` is a React hook used to manage state (data) within this component.

import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// These are core React Native components:
// `View` is a container for layouts.
// `Text` displays text.
// `TextInput` is used for user input fields.
// `TouchableOpacity` is a button with opacity feedback when pressed.
// `StyleSheet` is for defining styles in React Native.

import axios from 'axios';
// `axios` is a library for making HTTP requests to communicate with a backend server.

const LoginPage = ({ navigation }) => {
  // The LoginPage component, which takes `navigation` as a prop to navigate between screens.

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  // State variables to store user input (`email` and `password`), 
  // messages to show success or error feedback (`message`), 
  // and a flag to indicate login success (`isSuccess`).

  const handleLogin = async () => {
    // Function to handle the login process when the user clicks "Log In."
    try {
      const response = await axios.post('http://192.168.56.1:5000/login', { email, password });
      // Sends a POST request to the backend login API with the user's email and password.

      if (response.status === 200) {
        // If the response is successful (status 200):
        setMessage(response.data.message); // Set success message.
        setIsSuccess(true); // Mark the login attempt as successful.

        const { id, firstname, role } = response.data.user;
        // Extract user details (id, firstname, role) from the API response.

        if (role === 'admin') {
          // If the user is an admin, navigate to the AdminDashboard screen.
          navigation.navigate('AdminDashboard', { userId: id, userName: firstname });
        } else {
          // Otherwise, navigate to the HomePage screen.
          navigation.navigate('HomePage', { userId: id, userName: firstname });
        }
      } else {
        // If the response is not successful, show an error message.
        setMessage('Login failed. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      // Handle errors such as incorrect login details or server issues.
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Main container for the login screen layout. */}
      <View style={styles.formContainer}>
        {/* Inner container for the form elements (email, password, and buttons). */}
        <Text style={styles.title}>Welcomes Back!</Text>
        {/* Title text at the top of the login form. */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {/* Text input for the email address. 
          - `placeholder` shows hint text when the input is empty.
          - `value` binds the input value to the `email` state.
          - `onChangeText` updates the `email` state when the user types.
          - `keyboardType` ensures the keyboard is optimized for email input.
        */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {/* Text input for the password. 
          - `secureTextEntry` masks the input for security.
        */}
        <View style={styles.footer}>
          {message && (
            <Text style={[styles.message, isSuccess ? styles.success : styles.error]}>
              {message}
            </Text>
          )}
          {/* Displays success or error messages, styled based on `isSuccess`. */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          {/* Button to trigger the `handleLogin` function. */}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')} style={styles.signupLink}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        {/* Link to navigate to the RegisterPage for creating a new account. */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf6f0',  // Light green background.
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2f9c7b', // Green title color.
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#2f9c7b',  // Green border color.
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
  },
  message: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  loginButton: {
    backgroundColor: '#2f9c7b', // Green background for login button.
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    marginTop: 10,
    alignItems: 'center',
  },
  signupText: {
    color: '#2f9c7b',  // Green text for sign-up link.
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
// Exports the LoginPage component so it can be used in other parts of the app.
