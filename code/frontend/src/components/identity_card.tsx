import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const IdentityCard = ({
  src,
  label,
  value,
  ImageStyle,
  user,
}: {
  src: any;
  label: string;
  value: string;
  ImageStyle?: any;
  user: any;
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={
        () => {
          navigation.navigate('Question1', {
            user: {...user, identity: value},
          });
        } //传参给下一个页面
      }>
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{label}</Text>
        <Image source={src} style={[styles.image, ImageStyle]} />
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    opacity: 0.8,
  },
});

export default IdentityCard;
