import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Modal, Alert, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    product_name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('http://192.168.56.1:5000/products/all');
      setProducts(response.data);
    } catch (err) {
      console.error('Error fetching products:', err.message);
      Alert.alert('Error', 'Failed to fetch products. Please try again.');
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setForm({
      product_name: product.product_name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
    });
    setModalVisible(true);
  };

  const handleInputChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const updateProduct = async () => {
    if (!selectedProduct) return;

    try {
      await axios.put(`http://192.168.56.1:5000/products/update/${selectedProduct.id}`, form);
      Alert.alert('Success', 'Product updated successfully!');
      setModalVisible(false);
      fetchAllProducts(); // Refresh the product list
    } catch (err) {
      console.error('Error updating product:', err.message);
      Alert.alert('Error', 'Failed to update product. Please try again.');
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.product_name}</Text>
      <Text style={styles.cell}>{item.description}</Text>
      <Text style={styles.cell}>₱{item.price}</Text>
      <Text style={styles.cell}>{item.category}</Text>
      <Button title="Edit" onPress={() => openEditModal(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Products</Text>

      {/* Header Row */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Product Name</Text>
        <Text style={styles.headerCell}>Description</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Category</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
      />

      {/* Edit Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Edit Product</Text>

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
            keyboardType="numeric"
            onChangeText={(value) => handleInputChange('price', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={form.category}
            onChangeText={(value) => handleInputChange('category', value)}
          />

          <Button title="Update" onPress={updateProduct} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
        </View>
      </Modal>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Image source={require('./Icons/heart.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Icons/back.png')} style={styles.icon} />
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
