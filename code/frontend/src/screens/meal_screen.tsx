import {
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {getEat} from '../services/aiService';
import {useState} from 'react';
import Loading from '../components/loading';

const MealScreen = ({navigation}: {navigation: any}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEat = () => {
    setLoading(true);
    getEat(text).then(res => {
      setLoading(false);
      navigation.navigate('AddMeal', {data: res});
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentWrapper}>
      <Loading visible={loading} />
      <Text style={styles.title}>New Schedule</Text>
      <Image
        source={require('../assets/images/eat_text.png')}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder="Type here"
        value={text}
        onChangeText={setText}
        accessibilityLabel="Enter food preference"
      />
      <TouchableOpacity style={styles.summaryButton} onPress={handleEat}>
        <Text style={styles.summaryButtonText}>Get your Meals!</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Inter, sans-serif',
    color: 'rgba(33, 40, 63, 1)',
    fontWeight: '400',
  },
  contentWrapper: {
    justifyContent: 'flex-start',
    gap: 20,
    padding: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#010618',
    fontSize: 20,
    fontWeight: '900',
    alignSelf: 'stretch',
  },
  question: {
    position: 'absolute',
    minHeight: 164,
    maxWidth: '100%',
    width: 358,
    textAlign: 'center',
    bottom: 30,
    height: 164,
    fontFamily: 'Lemon, sans-serif',
    fontSize: 32,
  },
  summaryButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  summaryButtonText: {
    color: '#FFF',
    fontFamily: 'Nunito, sans-serif',
    fontSize: 16,
  },

  input: {
    fontSize: 16,
    alignSelf: 'flex-start',
  },
  icon: {
    objectFit: 'contain',
    width: '100%',
  },
});

export default MealScreen;
