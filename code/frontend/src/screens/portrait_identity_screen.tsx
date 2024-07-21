import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import IdentityCard from '../components/identity_card';
import {identityOptions} from '../utils/offline';

const IdentityRow = ({
  cards,
}: {
  cards: {src: any; label: string; value: string}[];
}) => (
  <View style={styles.row}>
    {cards.map((card, index) => (
      <IdentityCard key={index} ImageStyle={styles.card} {...card} />
    ))}
  </View>
);

const PortraitIdentityScreen = () => {
  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', padding: 20}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          The more we know ,{'\n'}
          the better for you.
        </Text>
      </View>
      <View style={styles.subHeader}>
        <Text style={styles.subHeaderText}>Please select your identity.</Text>
      </View>
      {identityOptions.map(
        (option, index) =>
          index % 3 === 0 && (
            <View key={index} style={styles.identityRowContainer}>
              <IdentityRow cards={identityOptions.slice(index, index + 3)} />
            </View>
          ),
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You can fill in the details after selecting the card.
        </Text>
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
    height: 160,
  },
  cardTitle: {
    fontSize: 12,
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
    textShadowOffset: {width: 0, height: 4},
    textShadowRadius: 4,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subHeader: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  subHeaderText: {
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
  },
  card: {
    width: 110,
    height: 145,
  },
});

export default PortraitIdentityScreen;
