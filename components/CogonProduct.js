import React, { useEffect, useState } from 'react'; // Import React and hooks for managing state and side effects
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'; // Import React Native components for UI
import axios from 'axios'; // Import axios for making API requests

// Define the CogonProduct component and pass navigation as a prop
const CogonProduct = ({ navigation }) => {
  // State to hold product data fetched from the API
  const [products, setProducts] = useState([]);
  // State for filtered products to show based on search or category
  const [filteredProducts, setFilteredProducts] = useState([]);
  // State to track the currently selected product category
  const [selectedCategory, setSelectedCategory] = useState('Cogon');
  // State for the selected product type within a category
  const [selectedType, setSelectedType] = useState(''); 
  // State to toggle the search input visibility
  const [isSearchActive, setIsSearchActive] = useState(false);
  // State to track the user's search query
  const [searchQuery, setSearchQuery] = useState('');

  // useEffect to fetch product data whenever selectedCategory or selectedType changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Make an API request to fetch products with the selected category and type
        const response = await axios.get(`http://172.22.97.121:5000/products`, {
          params: { category: selectedCategory, type: selectedType },
        });
        setProducts(response.data); // Save fetched data to the state
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (error) {
        console.error('Error fetching products:', error.message); // Log any errors that occur
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, [selectedCategory, selectedType]); // Dependencies ensure this runs when these states change

  // useEffect to filter products based on the search query
  useEffect(() => {
    if (searchQuery) {
      // Filter products to include only those matching the search query
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered); // Update the filtered products list
    } else {
      setFilteredProducts(products); // Reset to show all products if no query
    }
  }, [searchQuery, products]); // Runs whenever searchQuery or products change

  // Function to handle category selection
  const handleCategoryClick = (category, type) => {
    setSelectedCategory(category); // Update the selected category
    setSelectedType(type); // Update the selected type
  };

  // Function to toggle the search bar's visibility
  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive); // Toggle search active state
    setSearchQuery(''); // Reset search query
  };

  // Render a single product item in a card layout
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.imageUrl ? (
        // Display product image if available
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.productImage}
        />
      ) : (
        // Show a placeholder if no image is available
        <View style={styles.productImagePlaceholder} />
      )}
      <Text style={styles.productName}>{item.product_name}</Text> {/* Product name */}
      <Text style={styles.product_description}>{item.description}</Text> {/* Product description */}
      <Text style={styles.productPrice}>₱{item.price}</Text> {/* Product price */}
      <Text style={styles.productType}>{item.type}</Text> {/* Product type */}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Category selection section */}
      <View style={styles.categoryContainer}>
        <TouchableOpacity onPress={() => handleCategoryClick('Meats', 'Meat')}>
          <View style={[styles.categoryItem, { backgroundColor: '#e1eff7' }]}>
            <Image source={require('./Images/meat.png')} style={styles.categoryImage} />
            <Text>Meats</Text> {/* Category label */}
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

      <Text style={styles.title}>Cogon Products</Text> {/* Title for the products section */}

      {isSearchActive && (
        // Search input visible when search is active
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      )}

      {/* List of products displayed in a grid */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        renderItem={renderProduct} // Render each product using the renderProduct function
        numColumns={2} // Show two products per row
        columnWrapperStyle={styles.row} // Style for each row
      />

      {/* Bottom navigation bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}> {/* Navigate to HomePage */}
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchToggle}> {/* Toggle search */}
          <Image source={require('./Icons/search.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}> {/* Navigate back */}
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
    height: 100, 
    borderRadius: 8,
    marginBottom: 10,
  },
  

});

export default CogonProduct;
