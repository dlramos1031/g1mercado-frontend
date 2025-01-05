import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

const HomePage = ({ navigation, route }) => {
  const [hovered, setHovered] = useState(null);

  const markets = [
    { name: 'Carmen Market', image: require('./Images/carmen.jpg'), route: 'CarmenProduct' },
    { name: 'Cogon Market', image: require('./Images/cogon.jpg'), route: 'CogonProduct' },
  ];

  const { userId, userName } = route.params;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Hello, <Text style={styles.highlightText}>{userName}!</Text>
          </Text>
          <Text style={styles.subtitle}>Stay Updated, Save More!</Text>
        </View>
        <Image source={require('./Images/logo.jpg')} style={styles.logo} />
      </View>


      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Shop Wise on Market Wise!</Text>
        <Text style={styles.bannerSubtitle}>
          Find the best prices on local market goods.
        </Text>
        <Image source={require('./Images/plate.jpg')} style={styles.bannerImage} />
      </View>

      {/* Markets Section */}
      <Text style={styles.sectionTitle}>
        Checkout these <Text style={styles.highlightText}>local markets!</Text>
      </Text>

      {/* Market List */}
      <View style={styles.marketList}>
        {markets.map((market, index) => (
          <TouchableOpacity
            key={market.name}
            onPress={() => navigation.navigate(market.route)}
            onPressIn={() => setHovered(index)}
            onPressOut={() => setHovered(null)}
          >
            <View
              style={[
                styles.marketContainer,
                index === markets.length - 1 && { marginBottom: 80 }, // Extra margin for last item
              ]}
            >
              <Image source={market.image} style={styles.marketImage} />
              <Text
                style={[
                  styles.marketName,
                  hovered === index && styles.hoveredText,
                ]}
              >
                {market.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage', { userId })}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NotificationPage', { userId })}>
          <Image source={require('./Icons/notification.png')} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId })}>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },

  highlightText: {
    color: '#2f7f4e',
  },



  banner: {
    marginHorizontal: 20,
    backgroundColor: '#2f7f4e',
    borderRadius: 15,
    padding: 30,
    marginVertical: 20,
    position: 'relative',
    // alignItems: 'center', <-- REMOVE THIS
  },
  
  bannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left', // Force text alignment to the left
    alignSelf: 'flex-start', // Align text itself to the start (left)
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'left', // Force text alignment to the left
    alignSelf: 'flex-start', // Align text itself to the start (left)
    marginBottom: 10,
  },
  
  bannerImage: {
    position: 'absolute',
    right: 9, // Keep it aligned to the right
    top: '50%', // Start positioning it halfway down the container
    transform: [{ translateY: -14 }], // Adjust to vertically center (half the image height)
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f7f4e',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  marketList: {
    paddingHorizontal: 20,
  },
  marketContainer: {
    position: 'relative',
    marginBottom: 20, // Space between items
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  marketImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  marketName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffff',
    position: 'center',
    bottom: 35,
    left: 10,
  },
  hoveredText: {
    color: '#2f7f4e',
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
    width: 25,
    height: 25,
    tintColor: '#666',
  },
});

export default HomePage;
