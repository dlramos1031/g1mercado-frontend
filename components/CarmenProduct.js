import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import axios from 'axios';

const CarmenProduct = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Carmen');
  const [selectedType, setSelectedType] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPriceRangeModalVisible, setIsPriceRangeModalVisible] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const priceRanges = ['100-200', '201-500', '501-1000', '1001-5000'];

  // Fetch products when category or type changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.18.31:5000/products', {
          params: { category: selectedCategory, type: selectedType },
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedType]);

  // Filter products when search query or price range changes
  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedPriceRange, products]);

  const handleCategoryClick = (type) => {
    setSelectedType(type);
  };

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    setSearchQuery('');
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      ) : (
        <View style={styles.productImagePlaceholder} />
      )}
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>₱{item.price}</Text>
      <Text style={styles.productType}>{item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
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

      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryClick('Meat')}>
          <View style={styles.categoryItem}>
            <Image source={require('./Images/meat.png')} style={styles.categoryImage} />
            <Text>Meats</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Fish')}>
          <View style={styles.categoryItem}>
            <Image source={require('./Images/fish.png')} style={styles.categoryImage} />
            <Text>Seafoods</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Rice')}>
          <View style={styles.categoryItem}>
            <Image source={require('./Images/rice.png')} style={styles.categoryImage} />
            <Text>Rice</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Fruits')}>
          <View style={styles.categoryItem}>
            <Image source={require('./Images/fruits.png')} style={styles.categoryImage} />
            <Text>Fruits</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCategoryClick('Vegetables')}>
          <View style={styles.categoryItem}>
            <Image source={require('./Images/vegetables.png')} style={styles.categoryImage} />
            <Text>Vegetables</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => setIsPriceRangeModalVisible(true)} style={styles.priceRangeButton}>
        <Text style={styles.priceRangeText}>Select Price Range</Text>
      </TouchableOpacity>

      <Modal
        visible={isPriceRangeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsPriceRangeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={priceRanges}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSelectedPriceRange(item);
                    setIsPriceRangeModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('CarmenProduct')}>
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
  productImage: {
    width: '100%',
    height: 100, // You can adjust this value as needed
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
  priceRangeButton: {
    backgroundColor: '#f4f4f4',
    padding: 10,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
  },
  priceRangeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  modalItemText: {
    fontSize: 18,
    color: '#333',
  },
});

export default CarmenProduct;
