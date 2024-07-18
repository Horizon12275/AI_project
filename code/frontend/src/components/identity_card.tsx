import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IdentityCard = ({ src, title, ImageStyle }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Identity_Details', { title })}>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Image source={src} style={[styles.image, ImageStyle]} testID="image"/>
      </View>
    </TouchableOpacity>
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
});

export default IdentityCard;
