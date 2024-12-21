// Import necessary modules and components from React and React Native
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Import axios for making HTTP requests

// Define the UserProfile component, which takes `route` and `navigation` as props
const UserProfile = ({ route, navigation }) => {
  // Extract `userId` and `role` from the navigation route parameters
  const { userId, role } = route.params;

  // State to store user details
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  // Fetch user details when the component mounts or when `userId` changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        // Make a GET request to fetch user details using the provided userId
        const response = await axios.get(`http://192.168.56.1:5000/users/${userId}`);
        setUser(response.data); // Update the state with the fetched user details
      } catch (error) {
        console.error('Error fetching user details:', error); // Log any errors
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, [userId]);

  // Function to navigate to the appropriate home screen based on the user's role
  const handleHomeNavigation = () => {
    if (role === 'admin') {
      navigation.navigate('AdminDashboard', { userId, role }); // Navigate to admin dashboard
    } else {
      navigation.navigate('HomePage', { userId, role }); // Navigate to user home page
    }
  };

  // Function to handle logout with a confirmation alert
  const handleLogout = () => {
    Alert.alert(
      'Logout', // Alert title
      'Are you sure you want to log out?', // Alert message
      [
        { text: 'Cancel', style: 'cancel' }, // Cancel button
        {
          text: 'OK', // Confirm button
          onPress: () => {
            navigation.navigate('LoginPage'); // Navigate to the login page
          },
        },
      ],
      { cancelable: false } // Prevent dismissing the alert by tapping outside
    );
  };

  return (
    <View style={styles.container}>
      {/* Header section with profile title and avatar */}
      <View style={styles.header}>
        <Text style={styles.profileText}>Profile</Text>
        <View style={styles.avatar}></View>
      </View>

      {/* Section to display user details */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        {/* Display user's first name in a non-editable input */}
        <TextInput style={styles.input} value={user.firstname} editable={false} />

        <Text style={styles.label}>Last Name</Text>
        {/* Display user's last name in a non-editable input */}
        <TextInput style={styles.input} value={user.lastname} editable={false} />

        <Text style={styles.label}>Email</Text>
        {/* Display user's email in a non-editable input */}
        <TextInput style={styles.input} value={user.email} editable={false} />
      </View>

      {/* Button to change password (currently not functional) */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      {/* Bottom navigation with home, favorites, and user profile buttons */}
      <View style={styles.bottomNav}>
        {/* Navigate to home */}
        <TouchableOpacity onPress={handleHomeNavigation}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Navigate to favorites */}
        <TouchableOpacity onPress={() => navigation.navigate('Favorites', { userId, role })}>
          <Image source={require('./Icons/heart.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Navigate to user profile */}
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId, role })}>
          <Image source={require('./Icons/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the entire screen
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    height: 150,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 35,
  },
  inputContainer: {
    marginTop: 20,
    width: '90%',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'green',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
});

export default UserProfile;
