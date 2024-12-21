import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.56.1:5000/login', { email, password });

      if (response.status === 200) {
        setMessage(response.data.message);
        setIsSuccess(true);

        const { id, firstname, role } = response.data.user;

        if (role === 'admin') {
          navigation.navigate('AdminDashboard', { userId: id, userName: firstname }); 
        } else {
          navigation.navigate('HomePage', { userId: id, userName: firstname });
        }
      } else {
        setMessage('Login failed. Please try again.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcomes Back!</Text>
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
        <View style={styles.footer}>
          {message && (
            <Text style={[styles.message, isSuccess ? styles.success : styles.error]}>
              {message}
            </Text>
          )}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')} style={styles.signupLink}>
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf6f0',  // Light green background
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
    color: '#2f9c7b', // Green title color
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#2f9c7b',  // Green border color
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
  },
  forgotPassword: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#2f9c7b', // Green text color
    fontSize: 14,
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
    backgroundColor: '#2f9c7b', // Green background for login button
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
    color: '#2f9c7b',  // Green text for sign up link
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginPage;
