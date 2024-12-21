import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const AdminDashboard = ({ navigation }) => {
  const markets = [
    { name: 'Cogon Public Market', image: require('./Images/cogon.jpg'), route: 'CogonProduct' },
    { name: 'Carmen Public Market', image: require('./Images/carmen.jpg'), route: 'CarmenProduct' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Button Section */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Add')}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Update')}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Delete')}>
          <Text style={styles.buttonText}>Delete</Text>
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
        {markets.map((market) => (
          <TouchableOpacity
            key={market.name}
            onPress={() => navigation.navigate(market.route)}
          >
            <Image source={market.image} style={styles.marketImage} />
            <Text style={styles.marketName}>{market.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
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
    fontSize: 16,
  },
  banner: {
    flexDirection: 'row', // Make sure the text and image are side by side
    alignItems: 'center', // Vertically align the items
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
    width: 80, // Set the width for the image
    height: 80, // Set the height for the image
    borderRadius: 40, // Make the image round
    resizeMode: 'cover', // Ensure the image covers the area
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
  marketImage: {
    width: '100%',
    height: 180,
    borderRadius: 15,
    marginBottom: 15,
  },
  marketName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2f7f4e',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default AdminDashboard;
