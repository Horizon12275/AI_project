import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import IdentityCard from '../components/IdentityCard';

const IdentityRow = ({ cards }) => (
  <View style={styles.row}>
    {cards.map((card, index) => (
      <IdentityCard key={index} {...card} />
    ))}
  </View>
);

const PortraitIdentityScreen = () => {
  const identityCards = [
    [
      { src: require('../assets/images/portrait_student.png'), title: 'Student', ImageStyle: { width: 110, height: 145 } },
      { src: require('../assets/images/portrait_officeworker.png'), title: 'Office Worker', ImageStyle: { width: 112, height: 150 } },
      { src: require('../assets/images/portrait_freelancer.png'), title: 'Freelancer', ImageStyle: { width: 112, height: 147 } },
    ],
    [
      { src: require('../assets/images/portrait_homemaker.png'), title: 'Homemaker', ImageStyle: { width: 110, height: 147 } },
      { src: require('../assets/images/portrait_entrepreneur.png'), title: 'Entrepreneur', ImageStyle: { width: 111, height: 152 } },
      { src: require('../assets/images/portrait_others.png'), title: 'Others', ImageStyle: { width: 106, height: 148 } },
    ],
  ];

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          The more we know ,{'\n'}
          the better for you.
        </Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Please select your identity.</Text>
      </View>
      <View style={styles.identityRowContainer}>
        <IdentityRow cards={identityCards[0]} />
      </View>
      <View style={styles.identityRowContainer}>
        <IdentityRow cards={identityCards[1]} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>You can fill in the details after selecting the card.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginBottom: 10,
    padding: 6,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    width: 112,
    height: 172,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    opacity: 0.8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },
  headerText: {
    color: '#4A90E2',
    opacity: 0.8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeader: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
  },
  identityRowContainer: {
    marginTop: 16,
  },
  footer: {
    marginTop: 80,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
  },
});

export default PortraitIdentityScreen;
