import React, { useState } from 'react'; 
// Import React for creating the component and useState for managing input data.

import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native'; 
// Import components from React Native for building the user interface.

import axios from 'axios'; 
// Import axios to send data to the backend API.

const RegisterPage = ({ navigation }) => {
  // This is a functional component that takes `navigation` as a prop to move between screens.

  // Declare state variables to store input values and messages.
  const [firstname, setFirstname] = useState(''); // Stores the first name input by the user.
  const [lastname, setLastname] = useState(''); // Stores the last name input by the user.
  const [email, setEmail] = useState(''); // Stores the email input by the user.
  const [password, setPassword] = useState(''); // Stores the password input by the user.
  const [confirmPassword, setConfirmPassword] = useState(''); // Stores the confirm password input by the user.
  const [message, setMessage] = useState(''); // Stores success or error messages to show to the user.

  const handleRegister = async () => {
    // This function is called when the user presses the "Create Account" button.

    if (password !== confirmPassword) {
      // Check if the password and confirm password are the same.
      setMessage('Passwords do not match.'); // Show an error message if they are different.
      return; // Stop the function here since we cannot continue with mismatched passwords.
    }

    try {
      // Try to send the registration data to the backend server.
      const response = await axios.post('http://192.168.56.1:5000/register', {
        firstname, // Include the first name in the request.
        lastname, // Include the last name in the request.
        email, // Include the email in the request.
        password, // Include the password in the request.
        confirmPassword, // Include the confirm password in the request (optional for extra validation).
      });

      setMessage(response.data.message); // Show the message from the server (e.g., "Registration successful").

      if (response.status === 201) {
        // If the server response has a status of 201 (successful registration):
        navigation.navigate('LoginPage'); // Navigate the user to the Login page.
      }
    } catch (error) {
      // If something goes wrong during the registration process:
      console.error(error); // Log the error for debugging (this is helpful for developers).
      setMessage(error.response?.data?.message || 'Registration failed.'); 
      // Show an error message, either from the server or a default one.
    }
  };

  // The return statement defines what the UI should look like.
  return (
    <View style={styles.container}>
      {/* A container that centers everything on the screen. */}
      <View style={styles.formContainer}>
        {/* A smaller container for the form elements. */}
        <Text style={styles.title}>Create Account</Text> 
        {/* A title for the form. */}
        
        <TextInput
          style={styles.input}
          placeholder="First Name" // Text shown when the input is empty.
          value={firstname} // The current value of the input.
          onChangeText={setFirstname} // Update the state when the user types.
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastname}
          onChangeText={setLastname}
        />
        <TextInput
          style={styles.input}
          placeholder="Email" 
          keyboardType="email-address" // Use a keyboard optimized for email input.
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry // Hide the text input for passwords.
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry // Also hide this input.
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          {/* Button to submit the form. */}
          <Text style={styles.registerButtonText}>Create Account</Text> 
          {/* Button text. */}
        </TouchableOpacity>

        {message ? <Text style={styles.message}>{message}</Text> : null} 
        {/* Display a message if one exists (e.g., error or success). */}

        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} style={styles.loginLink}>
          {/* Link to navigate to the Login page. */}
          <Text style={styles.loginText}>Already have an account? Log In</Text> 
          {/* Text for the link. */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Style definitions for the UI elements.
  container: {
    flex: 1, // The container takes up the entire screen.
    justifyContent: 'center', // Center items vertically.
    alignItems: 'center', // Center items horizontally.
    backgroundColor: '#eaf6f0', // Light green background color.
  },
  formContainer: {
    width: '90%', 
    maxWidth: 400, // Maximum width of the form.
    padding: 20, 
    backgroundColor: 'white', // White background for the form box.
    borderRadius: 10, // Rounded corners.
    shadowColor: 'rgba(0, 0, 0, 0.1)', 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // Add shadow effect for Android.
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
    borderColor: '#2f9c7b', // Green border color.
    borderWidth: 1, 
    marginBottom: 15, 
    paddingHorizontal: 10, 
    borderRadius: 8, 
    fontSize: 16, 
  },
  registerButton: {
    backgroundColor: '#2f9c7b', // Green background for the button.
    paddingVertical: 12, 
    borderRadius: 8, 
    marginBottom: 20, 
    alignItems: 'center', 
  },
  registerButtonText: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
  },
  message: {
    marginTop: 15, 
    textAlign: 'center', 
    color: 'green', 
  },
  loginLink: {
    marginTop: 10, 
    alignItems: 'center', 
  },
  loginText: {
    color: '#2f9c7b', // Green text for the link.
    fontSize: 14, 
    textDecorationLine: 'underline', // Underlined text for emphasis.
  },
});

export default RegisterPage; 
// Export the component so it can be used in other parts of the app.
