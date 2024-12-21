import React, { useEffect, useState } from 'react'; // Import necessary React hooks and libraries
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'; // Import essential React Native components
import axios from 'axios'; // Import axios for making HTTP requests

const CarmenProduct = ({ navigation }) => {
  // States to manage product data and filters
  const [products, setProducts] = useState([]); // Holds the original list of products
  const [filteredProducts, setFilteredProducts] = useState([]); // Holds the filtered list of products
  const [selectedCategory, setSelectedCategory] = useState('Carmen'); // Default category filter
  const [selectedType, setSelectedType] = useState(''); // Type filter, initially empty
  const [isSearchActive, setIsSearchActive] = useState(false); // Toggles the search input visibility
  const [searchQuery, setSearchQuery] = useState(''); // Holds the user's search query

  // Fetch product data when the component loads or when category/type changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://192.168.56.1:5000/products`, {
          params: { category: selectedCategory, type: selectedType }, // Pass category and type as query parameters
        });
        setProducts(response.data); // Store the fetched data
        setFilteredProducts(response.data); // Initially, all products are shown
      } catch (error) {
        console.error('Error fetching products:', error.message); // Log errors, if any
      }
    };

    // Mock data to display in case of no API response
    const mockData = Array(20).fill().map((_, i) => ({
      id: i + 1,
      product_name: `Product ${i + 1}`,
      description: `Description of product ${i + 1}`,
      price: `${(i + 1) * 10}`,
      type: 'Sample',
      imageUrl: '', // Placeholder for image URL
    }));
    setFilteredProducts(mockData); // Set mock data for initial display

    fetchProducts(); // Call the function to fetch data from the API
  }, [selectedCategory, selectedType]); // Dependencies to re-run the effect when category or type changes

  // Filter products based on the search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = products.filter(product =>
        product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) // Check if product name matches query
      );
      setFilteredProducts(filtered); // Update filtered products
    } else {
      setFilteredProducts(products); // Show all products if search query is empty
    }
  }, [searchQuery, products]); // Re-run when search query or product list changes

  // Update category and type when a category button is clicked
  const handleCategoryClick = (category, type) => {
    setSelectedCategory(category); // Update selected category
    setSelectedType(type); // Update selected type
  };

  // Toggle the search input visibility
  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive); // Toggle search bar
    setSearchQuery(''); // Clear the search query
  };

  // Render a single product card
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {item.imageUrl ? (
        <Image
          source={{ uri: item.imageUrl }} // Use the product image URL
          style={styles.productImage}
        />
      ) : (
        <View style={styles.productImagePlaceholder} /> // Placeholder if no image URL is available
      )}
      <Text style={styles.productName}>{item.product_name}</Text> {/* Display product name */}
      <Text style={styles.product_description}>{item.description}</Text> {/* Display product description */}
      <Text style={styles.productPrice}>₱{item.price}</Text> {/* Display product price */}
      <Text style={styles.productType}>{item.type}</Text> {/* Display product type */}
    </View>
  );

  return (
    <View style={styles.container}> {/* Main container */}
      <View style={styles.categoryContainer}> {/* Container for category buttons */}
        {/* Category buttons for filtering */}
        <TouchableOpacity onPress={() => handleCategoryClick('Meats', 'Meat')}>
          <View style={[styles.categoryItem, { backgroundColor: '#e1eff7' }]}> {/* Style for each category */}
            <Image source={require('./Images/meat.png')} style={styles.categoryImage} /> {/* Category image */}
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

      <Text style={styles.title}>Carmen Products</Text> {/* Page title */}

      {isSearchActive && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus // Automatically focus on the input field when active
        />
      )}

      <FlatList
        data={filteredProducts} // Data source for the list
        keyExtractor={(item) => item.id.toString()} // Unique key for each product
        renderItem={renderProduct} // Render each product card
        numColumns={2} // Display items in two columns
        columnWrapperStyle={styles.row} // Style for each row of products
      />

      <View style={styles.bottomNav}> {/* Bottom navigation bar */}
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Image source={require('./Icons/home.png')} style={styles.icon} /> {/* Home icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearchToggle}>
          <Image source={require('./Icons/search.png')} style={styles.icon} /> {/* Search icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('./Icons/back.png')} style={styles.icon} /> {/* Back icon */}
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
