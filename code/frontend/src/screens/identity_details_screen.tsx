import React from 'react';
import {View, StyleSheet, Text, Pressable, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {studentOptions} from '../utils/offline';

type OptionButtonProps = {
  label: string;
  onPress: () => void;
};

const OptionButton: React.FC<OptionButtonProps> = ({label, onPress}) => (
  <Pressable style={styles.optionButton} onPress={onPress}>
    <Text style={styles.optionButtonText}>{label}</Text>
  </Pressable>
);

type StudentTypeProps = {
  title: string;
  options: {label: string; value: string}[];
  params?: {portrait:object};
};

const StudentType: React.FC<StudentTypeProps> = ({title, options, params}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.studentTypeContainer}>
      <Text style={styles.studentTypeTitle}>{title}</Text>
      {options.map((option, index) => (
        <OptionButton
          key={index}
          label={option.label}
          onPress={() =>
            navigation.navigate('Question1', {
              portrait: {...(params.portrait), studentType: option.value},//传参给下一个页面
            })
          } //传参给下一个页面
        />
      ))}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to previous step</Text>
      </Pressable>
    </View>
  );
};

const IdentityDetailsScreen = ({route}: {route: {params: {portrait:object}}}) => {
  console.log(route.params);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          The more we know,{'\n'}the better for you.
        </Text>
      </View>
      <Text style={styles.subHeaderText}>More details...</Text>
      <StudentType title="Student" options={studentOptions} params={route.params}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: '700',
    padding: 20,
  },
  headerContainer: {
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
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeaderText: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    opacity: 0.7,
  },
  studentTypeContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: 1,
    display: 'flex',
    marginTop: 53,
    width: '100%',
    maxWidth: 263,
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 21,
    paddingBottom: 8,
  },
  studentTypeTitle: {
    color: 'rgba(0, 0, 0, 0.90)',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 36,
    fontFamily: 'Nunito-Bold',
    marginBottom: 31,
  },
  optionButton: {
    alignItems: 'stretch',
    borderRadius: 8,
    borderColor: 'rgba(33, 40, 63, 1)',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginBottom: 20,
    justifyContent: 'center',
    padding: 8,
  },
  optionButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#000103',
  },
  backButton: {
    alignSelf: 'center',
    marginTop: 37,
  },
  backButtonText: {
    color: 'rgba(0, 0, 0, 0.90)',
    textAlign: 'center',
    fontFamily: 'Nunito-Light',
    fontSize: 16,
  },
});

export default IdentityDetailsScreen;
