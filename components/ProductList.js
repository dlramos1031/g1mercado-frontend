import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const ProductList = ({ navigation }) => {
  // State to store the list of products fetched from the API
  const [products, setProducts] = useState([]);

  // State to store the product currently selected for editing
  const [selectedProduct, setSelectedProduct] = useState(null);

  // State to control the visibility of the edit modal
  const [modalVisible, setModalVisible] = useState(false);

  // State to store the form data for editing a product
  const [form, setForm] = useState({
    product_name: '', // Name of the product
    description: '',  // Description of the product
    price: '',        // Price of the product
    category: '',     // Category of the product
  });

  // useEffect hook to fetch all products when the component mounts
  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Function to fetch all products from the server
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://192.168.56.1:5000/products/all'); // API call to fetch products
      setProducts(response.data); // Update the products state with the fetched data
    } catch (err) {
      console.error('Error fetching products:', err.message); // Log any errors
      Alert.alert('Error', 'Failed to fetch products. Please try again.'); // Show error message to the user
    }
  };

  // Function to open the edit modal and prefill the form with the selected product's data
  const openEditModal = (product) => {
    setSelectedProduct(product); // Set the selected product
    setForm({
      product_name: product.product_name, // Prefill product name
      description: product.description,   // Prefill description
      price: product.price.toString(),    // Convert price to string and prefill
      category: product.category,         // Prefill category
    });
    setModalVisible(true); // Show the modal
  };

  // Function to handle changes in the input fields of the form
  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,  // Keep the previous form data
      [field]: value, // Update the specific field with the new value
    }));
  };

  // Function to update the product details on the server
  const updateProduct = async () => {
    if (!selectedProduct) return; // If no product is selected, do nothing

    try {
      await axios.put(`http://192.168.56.1:5000/products/update/${selectedProduct.id}`, form); // API call to update product
      Alert.alert('Success', 'Product updated successfully!'); // Show success message
      setModalVisible(false); // Hide the modal
      fetchAllProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error updating product:', err.message); // Log any errors
      Alert.alert('Error', 'Failed to update product. Please try again.'); // Show error message to the user
    }
  };

  // Function to render each product in the list
  const renderProduct = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.product_name}</Text> {/* Display product name */}
      <Text style={styles.cell}>{item.description}</Text>  {/* Display product description */}
      <Text style={styles.cell}>₱{item.price}</Text>       {/* Display product price */}
      <Text style={styles.cell}>{item.category}</Text>     {/* Display product category */}
      <Button title="Edit" onPress={() => openEditModal(item)} /> {/* Button to open edit modal */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text> {/* Page title */}

      {/* Header Row for table-like structure */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Product Name</Text>
        <Text style={styles.headerCell}>Description</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Category</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>

      {/* List of products */}
      <FlatList
        data={products} // Data for the list
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        renderItem={renderProduct} // Function to render each item
      />

      {/* Modal for editing product */}
      <Modal
        visible={modalVisible} // Show or hide the modal
        animationType="slide" // Animation type for the modal
        onRequestClose={() => setModalVisible(false)} // Close the modal when requested
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Product</Text> {/* Modal title */}

          {/* Input fields for editing */}
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={form.product_name}
            onChangeText={(value) => handleInputChange('product_name', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChangeText={(value) => handleInputChange('description', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={form.price}
            keyboardType="numeric" // Only allow numeric input
            onChangeText={(value) => handleInputChange('price', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={form.category}
            onChangeText={(value) => handleInputChange('category', value)}
          />

          {/* Buttons for updating or canceling */}
          <Button title="Update" onPress={updateProduct} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('./Icons/home.png')} style={styles.icon} /> {/* Navigate to Home */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Image source={require('./Icons/heart.png')} style={styles.icon} /> {/* Navigate to Favorites */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Icons/back.png')} style={styles.icon} /> {/* Go back to previous screen */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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

export default ProductList;
