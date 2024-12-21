// Import necessary modules and components from React and React Native
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Image } from 'react-native';

// Define the AddProduct component
const AddProduct = ({ navigation }) => {
  // State variables to store user inputs for the product
  const [productName, setProductName] = useState(''); // Product name input
  const [description, setDescription] = useState(''); // Description input
  const [price, setPrice] = useState(''); // Price input

  // State variables for selected category and type
  const [category, setCategory] = useState('Carmen'); // Default category
  const [type, setType] = useState('Meat'); // Default type

  // State variables to manage visibility of category and type modals
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false); // Show/hide category modal
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false); // Show/hide type modal

  // Define lists for available categories and types
  const categories = ['Carmen', 'Cogon'];
  const types = ['Meat', 'Rice', 'Fish', 'Vegetables', 'Fruits'];

  // Function to handle the addition of a new product
  const handleAddProduct = () => {
    // Send a POST request to the server with the product data
    fetch('http://192.168.56.1:5000/add-product', {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({
        product_name: productName, // Pass the product name
        description: description, // Pass the description
        price: parseFloat(price), // Convert price to a number
        category: category, // Pass the selected category
        type: type, // Pass the selected type
      }),
    })
      .then((response) => {
        if (!response.ok) {
          // If the response is not OK, throw an error
          throw new Error('Failed to add product. Please try again.');
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        alert(data.message); // Show a message based on the server's response
        if (data.message === 'Product added successfully!') {
          // Navigate to the respective product page based on the category
          navigation.navigate(category === 'Carmen' ? 'CarmenProduct' : 'CogonProduct');
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error); // Log any errors
        alert('Failed to add product. Please try again.'); // Show an error message
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Add Product</Text>

        {/* Input field for the product name */}
        <TextInput
          style={styles.input}
          placeholder="Product Name" // Placeholder text
          value={productName} // Bind value to state
          onChangeText={setProductName} // Update state on change
        />

        {/* Input field for the description */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        {/* Input field for the price */}
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric" // Numeric keyboard for price
          value={price}
          onChangeText={setPrice}
        />

        {/* Button to open the category dropdown modal */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsCategoryModalVisible(true)} // Show category modal
        >
          <Text style={styles.dropdownText}>{category}</Text> {/* Display selected category */}
        </TouchableOpacity>

        {/* Button to open the type dropdown modal */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsTypeModalVisible(true)} // Show type modal
        >
          <Text style={styles.dropdownText}>{type}</Text> {/* Display selected type */}
        </TouchableOpacity>

        {/* Modal for selecting a category */}
        <Modal
          visible={isCategoryModalVisible} // Modal visibility
          transparent={true} // Make the modal background transparent
          animationType="fade" // Animation type for modal
          onRequestClose={() => setIsCategoryModalVisible(false)} // Close modal on request
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* List of categories */}
              <FlatList
                data={categories} // List data
                keyExtractor={(item) => item} // Unique key for each item
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setCategory(item); // Update the selected category
                      setIsCategoryModalVisible(false); // Hide the modal
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text> {/* Display category */}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Modal for selecting a type */}
        <Modal
          visible={isTypeModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsTypeModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* List of types */}
              <FlatList
                data={types}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setType(item); // Update the selected type
                      setIsTypeModalVisible(false); // Hide the modal
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text> {/* Display type */}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Button to add the product */}
        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom navigation bar */}
      <View style={styles.bottomNav}>
        {/* Navigate to the home page */}
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Navigate to the favorites page */}
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Image source={require('./Icons/heart.png')} style={styles.icon} />
        </TouchableOpacity>

        {/* Navigate back to the previous screen */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Icons/back.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdown: {
    width: '80%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  modalItemText: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2f7f4e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#ccc',
    elevation: 5,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#666',
  },
});

export default AddProduct;
