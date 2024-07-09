import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface GoBackProps {
  title: string;
}

const GoBack: React.FC<GoBackProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    //自己添加
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 2, //IOS
    elevation: 2, //安卓
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
});

export default GoBack;