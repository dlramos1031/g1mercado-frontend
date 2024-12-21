import React, { useState } from 'react'; // Import React and useState for managing state
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'; // Import React Native components

// AdminDashboard component definition with props for navigation and route
const AdminDashboard = ({ navigation, route }) => {
  const [hovered, setHovered] = useState(null); // State to track which market item is hovered

  // Array of market data with names, images, and routes
  const markets = [
    { name: 'Cogon Public Market', image: require('./Images/cogon.jpg'), route: 'CogonProduct' },
    { name: 'Carmen Public Market', image: require('./Images/carmen.jpg'), route: 'CarmenProduct' },
  ];

  // Destructure userId and userName from the route parameters
  const { userId, userName } = route.params;

  return (
    <View style={styles.container}> {/* Main container for the screen */}
      <View style={styles.content}> {/* Content container */}
        <View style={styles.header}> {/* Header section */}
          <View>
            <Text style={styles.greeting}>
              ADMIN DASHBOARD
            </Text>
          </View>
          <View style={styles.logoContainer}> {/* Logo container */}
            <Image source={require('./Images/logo.jpg')} style={styles.logo} /> {/* Logo image */}
          </View>
        </View>

        {/* Button Section */}
        <View style={styles.buttonWrapper}> {/* Wrapper for buttons */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProduct')}> {/* Navigate to AddProduct */}
            <Text style={styles.buttonText}>Add</Text> {/* Button label */}
          </TouchableOpacity>
        </View>

        {/* Banner Section */}
        <View style={styles.banner}> {/* Promotional banner */}
          <View style={styles.bannerTextWrapper}> {/* Wrapper for banner text */}
            <Text style={styles.bannerTitle}>Shop Wise on Market Wise!</Text> {/* Banner title */}
            <Text style={styles.bannerSubtitle}>Find the best prices on local market goods.</Text> {/* Banner subtitle */}
          </View>
          <Image source={require('./Images/plate.jpg')} style={styles.bannerImage} /> {/* Banner image */}
        </View>

        {/* Local Markets Section */}
        <Text style={styles.sectionTitle}> {/* Title for the local markets section */}
          Checkout these <Text style={styles.highlightText}>Local Markets!</Text>
        </Text>
        <View style={styles.marketList}> {/* List of local markets */}
          {markets.map((market, index) => ( /* Loop through markets array */
            <TouchableOpacity
              key={market.name} // Unique key for each market
              onPress={() => navigation.navigate(market.route)} // Navigate to the specific market's route
              onPressIn={() => setHovered(index)} // Set hovered state on press in
              onPressOut={() => setHovered(null)} // Reset hovered state on press out
            >
              <View
                style={[
                  styles.marketContainer,
                  index === markets.length - 1 && { marginBottom: 60 }, // Add extra margin for the last market item
                ]}
              >
                <Image source={market.image} style={styles.marketImage} /> {/* Market image */}
                <Text
                  style={[
                    styles.marketName,
                    hovered === index && styles.hoveredText, // Highlight text when hovered
                  ]}
                >
                  {market.name} {/* Market name */}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}> {/* Navigation bar at the bottom */}
        <TouchableOpacity onPress={() => navigation.navigate('HomePage', { userId })}> {/* Navigate to HomePage */}
          <Image source={require('./Icons/home.png')} style={styles.icon} /> {/* Home icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites', { userId })}> {/* Navigate to Favorites */}
          <Image source={require('./Icons/heart.png')} style={styles.icon} /> {/* Favorites icon */}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId })}> {/* Navigate to UserProfile */}
          <Image source={require('./Icons/user.png')} style={styles.icon} /> {/* User profile icon */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
  },
  content: {
    flex: 1, // Take up most of the screen
    padding: 20,
    paddingBottom: 80, // Leave space for bottom navigation bar
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Space out items
    alignItems: 'center', // Align items vertically
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  logoContainer: {
    justifyContent: 'center', // Center the logo
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 80, // Logo width
    height: 80, // Logo height
    resizeMode: 'contain', // Fit logo within bounds
    paddingLeft: 50,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold', // Bold text
    color: '#000', // Black text
  },
  buttonWrapper: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Space out buttons
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2f7f4e', // Green background
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center button text
    flex: 1, // Take up equal space
    marginHorizontal: 5, // Space between buttons
  },
  buttonText: {
    color: '#fff', // White text
    fontWeight: 'bold', // Bold text
    fontSize: 20,
  },
  banner: {
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically
    backgroundColor: '#2f7f4e', // Green background
    borderRadius: 15, // Rounded corners
    padding: 20, // Padding inside banner
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 22, // Large text
    fontWeight: 'bold', // Bold text
    color: '#fff', // White text
    textAlign: 'left', // Align text to the left
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14, // Smaller text
    color: '#fff', // White text
    textAlign: 'left',
    marginBottom: 10,
  },
  bannerImage: {
    width: 80, // Width of image
    height: 80, // Height of image
    borderRadius: 40, // Circular image
    resizeMode: 'cover', // Cover the space
    marginLeft: 10, // Space between image and text
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f7f4e', // Green text
    marginBottom: 10,
  },
  highlightText: {
    color: '#2f7f4e', // Green text for emphasis
  },
  marketList: {
    flexDirection: 'column', // Arrange items in a column
    gap: 15, // Space between items
  },
  marketContainer: {
    position: 'relative', // Position items relatively
    marginBottom: 20, // Space at the bottom
    justifyContent: 'center',
    alignItems: 'center', // Center align items
  },
  marketImage: {
    width: '100%', // Full width
    height: 150, // Fixed height
    borderRadius: 15, // Rounded corners
  },
  marketName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff', // White text
    position: 'center', // Centered text
    bottom: 35, // Move text up slightly
    left: 10,
  },
  hoveredText: {
    color: '#2f7f4e', // Change text color on hover
  },
  bottomNav: {
    flexDirection: 'row', // Arrange icons horizontally
    justifyContent: 'space-around', // Space out icons
    alignItems: 'center', // Center align icons
    backgroundColor: '#fff', // White background
    paddingVertical: 10, // Padding inside navigation
    position: 'absolute', // Stick to the bottom
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1, // Top border
    borderColor: '#ccc', // Light gray border color
    elevation: 5, // Shadow for Android
  },
  icon: {
    width: 20, // Icon width
    height: 20, // Icon height
    tintColor: '#666', // Gray color for icons
  },
});

export default AdminDashboard;
