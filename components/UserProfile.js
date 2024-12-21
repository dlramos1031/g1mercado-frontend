import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const UserProfile = ({ route, navigation }) => {
  const { userId, role } = route.params; // Get userId and role from navigation params

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {~
        const response = await axios.get(`http://172.22.97.121:5000/users/${userId}`);
        setUser(response.data); // Update state with fetched user details
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleHomeNavigation = () => {
    if (role === 'admin') {
      navigation.navigate('AdminDashboard', { userId, role });
    } else {
      navigation.navigate('HomePage', { userId, role });
    }
  };

  const handleLogout = () => {

    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('LoginPage'); // Navigate to login page
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.profileText}>Profile</Text>
        <View style={styles.avatar}></View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={user.firstname} editable={false} />

        <Text style={styles.label}>Last Name</Text>
        <TextInput style={styles.input} value={user.lastname} editable={false} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={user.email} editable={false} />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={handleHomeNavigation}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Favorites', { userId, role })}>
          <Image source={require('./Icons/heart.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId, role })}>
          <Image source={require('./Icons/user.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
