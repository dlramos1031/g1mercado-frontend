import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log('Login response:', response.data);
  
      if (response.status === 200) {
        setMessage(response.data.message);
        setIsSuccess(true);
  
        // Check if the user is an admin
        if (response.data.user.role === 'admin') {
          navigation.navigate('AdminDashboard');  // Navigate to Admin Dashboard
        } else {
          navigation.navigate('HomePage');  // Navigate to Home Page
        }
      } else {
        setMessage('Login failed. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setIsSuccess(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {message ? (
        <Text style={[styles.message, isSuccess ? styles.success : styles.error]}>
          {message}
        </Text>
      ) : null}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  message: {
    marginBottom: 10,
    fontSize: 16,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
  signupText: {
    marginTop: 10,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
