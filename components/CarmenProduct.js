import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';

const CarmenProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Carmen');
  const [selectedType, setSelectedType] = useState(''); // For storing the selected type
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://192.168.56.1:5000/products`, {
          params: { category: selectedCategory, type: selectedType },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    const mockData = Array(20).fill().map((_, i) => ({
      id: i + 1,
      product_name: `Product ${i + 1}`,
      description: `Description of product ${i + 1}`,
      price: `${(i + 1) * 10}`,
      type: 'Sample',
      imageUrl: '', // Add a valid image URL if testing images
    }));
    setFilteredProducts(mockData);
    

    fetchProducts();
  }, [selectedCategory, selectedType]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Show all products if the search query is empty
    }
  }, [searchQuery, products]);

  const handleCategoryClick = (category, type) => {
    setSelectedCategory(category);
    setSelectedType(type); // Set the selected type based on category
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    setSearchQuery('');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.productImage}
        />
      ) : (
        <View style={styles.productImagePlaceholder} />
      )}
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.product_description}>{item.description}</Text>
      <Text style={styles.productPrice}>₱{item.price}</Text>
      <Text style={styles.productType}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryClick('Meats', 'Meat')}>
          <View style={[styles.categoryItem, { backgroundColor: '#e1eff7' }]}>
            <Image source={require('./Images/meat.png')} style={styles.categoryImage} />
            <Text>Meats</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Seafoods', 'Fish')}>
          <View style={[styles.categoryItem, { backgroundColor: '#eef8d8' }]}>
            <Image source={require('./Images/fish.png')} style={styles.categoryImage} />
            <Text>Seafoods</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Rice', 'Grain')}>
          <View style={[styles.categoryItem, { backgroundColor: '#f9e5f0' }]}>
            <Image source={require('./Images/rice.png')} style={styles.categoryImage} />
            <Text>Rice</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Fruits', 'Fruit')}>
          <View style={[styles.categoryItem, { backgroundColor: '#e5f4e3' }]}>
            <Image source={require('./Images/fruits.png')} style={styles.categoryImage} />
            <Text>Fruits</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Vegetables', 'Vegetable')}>
          <View style={[styles.categoryItem, { backgroundColor: '#f8eada' }]}>
            <Image source={require('./Images/vegetables.png')} style={styles.categoryImage} />
            <Text>Vegetables</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Carmen Products</Text>

      {isSearchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchToggle}>
          <Image source={require('./Icons/search.png')} style={styles.icon} />
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
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2f7f4e',
    textAlign: 'center',
  },
  productType: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 60,
    height: 50,
    marginHorizontal: 1,
    textAlign: 'center',
  },
  categoryImage: {
    width: 45,
    height: 45,
    marginBottom: 15,
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
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

  productImage: {
    width: '100%',
    height: 100, // You can adjust this value as needed
    borderRadius: 8,
    marginBottom: 10,
  },
  

});

export default CarmenProduct;
