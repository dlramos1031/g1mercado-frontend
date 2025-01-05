import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, FlatList, Image } from 'react-native';

const AddProduct = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Carmen');
  const [type, setType] = useState('Meat');
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);

  const categories = ['Carmen', 'Cogon'];
  const types = ['Meat', 'Rice', 'Fish', 'Vegetables', 'Fruits'];

  const handleAddProduct = () => {
    fetch('http://192.168.18.31:5000/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_name: productName,
        description: description,
        price: parseFloat(price),
        category: category,
        type: type,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add product. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        if (data.message === 'Product added successfully!') {
          navigation.navigate(category === 'Carmen' ? 'CarmenProduct' : 'CogonProduct');
        }
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Add Product</Text>
        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Category Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsCategoryModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{category}</Text>
        </TouchableOpacity>

        {/* Type Dropdown */}
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsTypeModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{type}</Text>
        </TouchableOpacity>

        {/* Modal for Category */}
        <Modal
          visible={isCategoryModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsCategoryModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setCategory(item);
                      setIsCategoryModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Modal for Type */}
        <Modal
          visible={isTypeModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsTypeModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={types}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setType(item);
                      setIsTypeModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
          <Image source={require('./Icons/heart.png')} style={styles.icon} />
        </TouchableOpacity>
        {/* Change this to back.png and go back to AdminDashboard */}
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
    backgroundColor: '#f4f4f4',
  },
  content: {
    flex: 1, // Allow the content to take up available space
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 80, // Added padding to avoid overlap with the bottom nav bar
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
