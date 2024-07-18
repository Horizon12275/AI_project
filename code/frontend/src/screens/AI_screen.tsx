import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Reminder from '../components/reminder';
import Switch from '../components/switch';
import {useState} from 'react';
import MyButton from '../utils/my_button';
import Subtasks from '../components/subtasks';

const AIScreen = ({route}: {route: {params: {event: any}}}) => {
  console.log(route.params.event);
  const [tab, setTab] = useState('Subtasks');
  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Help From AI</Text>
        <MyButton
          icon={require('../assets/icons/cross.png')}
          onPress={() => {}}
        />
      </View>
      <Switch tab={tab} setTab={setTab} />
      {tab === 'Subtasks' ? <Subtasks /> : <Reminder />}
      <TouchableOpacity style={styles.saveButton} accessibilityRole="button">
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  saveButton: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',
    width: '90%',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  saveButtonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default AIScreen;
