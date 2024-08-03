import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Reminder from '../components/reminder';
import Switch from '../components/switch';
import {useState} from 'react';
import MyButton from '../utils/my_button';
import Subtasks from '../components/subtasks';
import {formatDate} from '../utils/date';
import {categoryOptions} from '../utils/offline';
import {updateEvent} from '../services/eventService';

const AIScreen = ({
  route,
  navigation,
}: {
  route: {params: {event: any}};
  navigation: any;
}) => {
  const [event, setEvent] = useState<{
    id: number;
    title: string;
    category: number;
    ddl: string;
    subtasks: {content: string; ddl: string; saved: boolean}[];
    reminders: {content: string; saved: boolean}[];
  }>(route.params.event);
  const [tab, setTab] = useState('Subtasks');
  const handleSave = () => {
    //除去所有不需要保存的任务
    let newEvent = {
      id: event.id,
      subtasks: event.subtasks.filter(subtask => subtask.saved),
      reminders: event.reminders.filter(reminder => reminder.saved),
    };
    console.log(newEvent);
    updateEvent(newEvent)
      .then(res => {
        console.log(res);
        Alert.alert('Success', 'Event saved successfully');
        navigation.navigate('Tabs');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={{backgroundColor: 'white', height: '100%', padding: 25}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Help From AI</Text>
        <MyButton
          icon={require('../assets/icons/cross.png')}
          onPress={() => {}}
        />
      </View>

      <Switch tab={tab} setTab={setTab} />
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{`Today - ${formatDate(
          event.ddl,
        )}`}</Text>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{`${
          categoryOptions[event.category].label
        } - ${event.title}`}</Text>
        <MyButton
          icon={require('../assets/icons/edit.png')}
          style={styles.sectionIcon}
          onPress={() => {}}
        />
      </View>
      {tab === 'Subtasks' ? (
        <Subtasks subtasks={event.subtasks} />
      ) : (
        <Reminder reminders={event.reminders} />
      )}
      <TouchableOpacity
        style={styles.saveButton}
        accessibilityRole="button"
        onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
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
    fontSize: 12,
    fontWeight: '700',
  },
  dateContainer: {
    marginVertical: 16,
  },
  dateText: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#FFC374',
    fontFamily: 'Inter, sans-serif',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionIcon: {
    width: 24,
    height: 24,
  },
  sectionHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default AIScreen;
