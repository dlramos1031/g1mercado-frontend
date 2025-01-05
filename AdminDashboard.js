import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

const AdminDashboard = ({ navigation, route }) => {
  const [hovered, setHovered] = useState(null);

  const markets = [
    { name: 'Cogon Public Market', image: require('./Images/cogon.jpg'), route: 'CogonProduct' },
    { name: 'Carmen Public Market', image: require('./Images/carmen.jpg'), route: 'CarmenProduct' },
  ];

  const { userId, userName } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              ADMIN DASHBOARD
            </Text>
          </View>
          <View style={styles.logoContainer}>
            <Image source={require('./Images/logo.jpg')} style={styles.logo} />
          </View>
        </View>

        {/* Button Section */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddProduct')}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
  
        </View>

        {/* Banner Section */}
        <View style={styles.banner}>
          <View style={styles.bannerTextWrapper}>
            <Text style={styles.bannerTitle}>Shop Wise on Market Wise!</Text>
            <Text style={styles.bannerSubtitle}>Find the best prices on local market goods.</Text>
          </View>
          <Image source={require('./Images/plate.jpg')} style={styles.bannerImage} />
        </View>

        {/* Local Markets Section */}
        <Text style={styles.sectionTitle}>
          Checkout these <Text style={styles.highlightText}>Local Markets!</Text>
        </Text>
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
                  index === markets.length - 1 && { marginBottom: 60 }, // Extra margin for the last item
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
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage', { userId })}>
          <Image source={require('./Icons/home.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProductList')}>
          <Image source={require('./Icons/product.png')} style={styles.icon} />
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
  content: {
    flex: 1, // This will allow the content to take most of the space
    padding: 20,
    paddingBottom: 80, // Added space for bottom navigation bar
  },
  header: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    paddingLeft: 50,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2f7f4e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2f7f4e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2f7f4e',
    marginBottom: 10,
  },
  highlightText: {
    color: '#2f7f4e',
  },
  marketList: {
    flexDirection: 'column',
    gap: 15,
  },
  marketContainer: {
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 20,
    height: 20,
    tintColor: '#666',
  },
});

export default AdminDashboard;
