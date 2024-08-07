import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import MyButton from '../utils/my_button';
import Calendar from '../components/calendar';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {categoryOptions, priorityOptions} from '../utils/offline';
import SelectModal from '../components/select_modal';
import {Form, Input} from '@ant-design/react-native';
import Loading from '../components/loading';
import {formatDate, toDate, toTime} from '../utils/date';
import {generateId, getObject, storeObject} from '../services/offlineService';
import Switch from '../components/switch';
import Subtasks from '../components/subtasks';
import Reminder from '../components/reminder';
import {addEvent} from '../services/eventService';

const InputField = ({
  label,
  placeholder,
  props,
  inputStyle,
}: {
  label: string;
  placeholder?: string;
  props: any;
  inputStyle?: any;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <Form.Item {...props}>
      <Input
        style={[styles.input, inputStyle]}
        accessibilityLabel={label}
        placeholder={placeholder}
      />
    </Form.Item>
  </View>
);

const AddMealScreen = ({route}: {route: {params: {data: any}}}) => {
  const data = route.params.data;
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [event, setEvent] = useState<any>({
    subtasks: [],
    reminders: [],
    ddl: new Date(),
    category: 6,
    startTime: null,
    endTime: null,
  });
  const [subtask, setSubtask] = useState({
    content: '',
    ddl: new Date(),
    saved: false,
  });
  const [subtaskCalendar, setSubtaskCalendar] = useState(false);
  const [tab, setTab] = useState('Subtasks');
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: data.restaurant_name,
      location: data.location,
    });
    let reminders = data.recommended_dishes.split(',').map((dish: string) => {
      return {content: dish, saved: false};
    });
    let subtasks = data.business_hours.split(',').map((hour: string) => {
      return {content: hour, saved: false, ddl: new Date()};
    });
    setEvent({...event, reminders: reminders, subtasks: subtasks});
  }, []);

  const onSubmit = () => {
    form.submit();
  };
  const handleSave = (newEvent: any) => {
    if (event.startTime) newEvent.startTime = toTime(event.startTime);
    if (event.endTime) newEvent.endTime = toTime(event.endTime);
    newEvent.ddl = toDate(event.ddl);
    newEvent.category = event.category;
    newEvent.priority = event.priority;
    newEvent.subtasks = event.subtasks;
    newEvent.id = generateId();
    getObject('mode').then(mode => {
      if (mode === 'offline') {
        Alert.alert('You are offline, please connect to the internet');
      } else {
        addEvent(newEvent)
          .then(event => {
            //本地存储 保持数据一致性
            getObject('events').then(events => {
              events.push(event);
              storeObject('events', events);
            });
            setLoading(false);
            Alert.alert('Success', 'Event added successfully');
          })
          .catch(e => Alert.alert('Error', e));
      }
    });
  };
  const handleAddSubtask = () => {
    if (!subtask.content) {
      Alert.alert('Error', 'Subtask content cannot be empty');
      return;
    }
    setEvent({...event, subtasks: [...event.subtasks, subtask]});
    setSubtask({content: '', ddl: new Date(), saved: false});
  };

  const handleCheckSubtask = (index: number) => {
    const newSubtasks = event.subtasks;
    newSubtasks[index].saved = !newSubtasks[index].saved;
    setEvent({...event, subtasks: newSubtasks});
  };
  const handleCheckReminder = (index: number) => {
    const newReminders = event.reminders;
    newReminders[index].saved = !newReminders[index].saved;
    setEvent({...event, reminders: newReminders});
  };

  return (
    event && (
      <Form onFinish={handleSave} form={form}>
        <Loading visible={loading} />
        <KeyboardAvoidingView behavior="position">
          <ScrollView
            style={{
              backgroundColor: '#fff',
              height: '100%',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}>
            <View style={styles.container}>
              <Text style={styles.titleText}>New Schedule</Text>
            </View>
            <InputField
              label="Title"
              props={{
                name: 'title',
                rules: [
                  {
                    required: true,
                    message: 'Please input the title!',
                  },
                ],
              }}
            />
            <InputField
              label="Location"
              props={{
                name: 'location',
                rules: [
                  {
                    required: true,
                    message: 'Please input the location!',
                  },
                ],
              }}
            />
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category</Text>
              <SelectModal
                style={styles.input}
                data={categoryOptions}
                selectedValue={event.category}
                setSelectedValue={category => setEvent({...event, category})}
              />
            </View>
            <Switch tab={tab} setTab={setTab} />
            {tab === 'Subtasks'
              ? event.subtasks.map((subtask, index) => (
                  <View
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 10,
                    }}>
                    <View style={styles.taskItemContainer}>
                      <MyButton
                        icon={
                          subtask.saved
                            ? require('../assets/icons/checked.png')
                            : require('../assets/icons/checkbox.png')
                        }
                        style={styles.taskIcon}
                        onPress={() => handleCheckSubtask(index)}
                      />
                      <Text style={styles.taskTitle}>{subtask.content}</Text>
                    </View>

                    <Text style={styles.dueDate}>
                      Due: {toDate(subtask.ddl)}
                    </Text>
                  </View>
                ))
              : event.reminders.map((reminder, index) => (
                  <View
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      marginTop: 10,
                    }}>
                    <View style={styles.taskItemContainer}>
                      <MyButton
                        icon={
                          reminder.saved
                            ? require('../assets/icons/checked.png')
                            : require('../assets/icons/checkbox.png')
                        }
                        style={styles.taskIcon}
                        onPress={() => handleCheckReminder(index)}
                      />
                      <Text style={styles.taskTitle}>{reminder.content}</Text>
                    </View>
                  </View>
                ))}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setSubtaskCalendar(true)}>
                <Text style={styles.doneButtonText}>{`DUE: ${toDate(
                  subtask.ddl,
                )}`}</Text>
              </TouchableOpacity>
              {subtaskCalendar && (
                <Modal
                  animationType="fade" // 动画效果
                  transparent={true} // 透明背景
                  visible={subtaskCalendar}
                  onRequestClose={() => {
                    setSubtaskCalendar(!subtaskCalendar);
                  }}>
                  <TouchableWithoutFeedback
                    onPress={() => setSubtaskCalendar(false)}>
                    <View style={styles.modalView}>
                      <Text style={styles.calendarSpanTitle}>DDL Date</Text>
                      <Calendar
                        selectedDate={subtask.ddl}
                        setSelectedDate={(date: Date) =>
                          setSubtask({...subtask, ddl: date})
                        }
                      />
                      <TouchableOpacity
                        onPress={() => setSubtaskCalendar(false)}
                        style={styles.doneButton}>
                        <Text style={styles.doneButtonText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={handleAddSubtask}>
                <Text style={styles.doneButtonText}>Add New Subtask</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ddlContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.ddlText}>DDL</Text>
                <Text style={styles.dateText}>
                  {`${formatDate(toDate(event.ddl))}  `}
                  {event.startTime &&
                    event.endTime &&
                    `${toTime(event.startTime)}~${toTime(event.endTime)}`}
                </Text>
              </View>
              <MyButton
                icon={require('../assets/icons/time-select.png')}
                onPress={() => setShowCalendar(!showCalendar)}
                style={styles.timeZoneIcon}
                buttonStyle={styles.timeZoneButton}
              />
            </View>
            <View style={styles.timeSelectContainer}>
              {showStartTimePicker && (
                <RNDateTimePicker
                  mode="time"
                  display="clock"
                  value={event.startTime || new Date()}
                  onChange={(e, selectedDate) => {
                    if (event.endTime && selectedDate > event.endTime) {
                      Alert.alert(
                        'Error',
                        'Start time should be earlier than end time',
                      );
                      setShowStartTimePicker(false);
                      return;
                    }
                    setEvent({
                      ...event,
                      startTime: selectedDate || event.startTime,
                    });
                    if (!event.endTime)
                      setEvent({
                        ...event,
                        endTime: selectedDate || event.startTime,
                      });
                    setShowStartTimePicker(false);
                  }}
                />
              )}
              {showEndTimePicker && (
                <RNDateTimePicker
                  mode="time"
                  display="clock"
                  value={event.endTime || new Date()}
                  onChange={(e, selectedDate) => {
                    if (event.startTime && selectedDate < event.startTime) {
                      Alert.alert(
                        'Error',
                        'End time should be later than start time',
                      );
                      setShowEndTimePicker(false);
                      return;
                    }
                    setEvent({
                      ...event,
                      endTime: selectedDate || event.endTime,
                    });
                    if (!event.startTime)
                      setEvent({
                        ...event,
                        startTime: selectedDate || event.endTime,
                      });
                    setShowEndTimePicker(false);
                  }}
                />
              )}
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => setShowStartTimePicker(true)}>
                <Text style={styles.startButtonText}>Start Time</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => setShowEndTimePicker(true)}>
                <Text style={styles.startButtonText}>End Time</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.saveButton}
              accessibilityRole="button"
              onPress={onSubmit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        {showCalendar && (
          <Modal
            animationType="fade" // 动画效果
            transparent={true} // 透明背景
            visible={showCalendar}
            onRequestClose={() => {
              setShowCalendar(!showCalendar);
            }}>
            <View style={styles.modalView}>
              <Text style={styles.calendarSpanTitle}>DDL Date</Text>
              <Calendar
                selectedDate={event.ddl}
                setSelectedDate={(date: Date) =>
                  setEvent({...event, ddl: date})
                }
              />
              <TouchableOpacity
                onPress={() => setShowCalendar(!showCalendar)}
                style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </Form>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
  },
  saveButton: {
    marginTop: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
    paddingHorizontal: 70,
    marginBottom: 50,
  },
  saveButtonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  inputContainer: {
    gap: 5,
  },
  inputLabel: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 12,
    color: 'black',
    fontWeight: '300',
  },
  input: {
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 50,
  },
  textInput: {
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    marginTop: 5,
    height: 200, // 自定义文本输入框高度
  },
  timeZoneIcon: {
    height: 40,
  },
  timeZoneButton: {
    backgroundColor: '#80B3FF',
    height: 65,
    width: 73,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  doneButtonText: {
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    padding: 3,
    textAlign: 'center',
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  ddlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#80B3FF',
  },
  ddlContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  timeSelectContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButton: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 8,
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  startButtonText: {
    color: '#0A84FF',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 22,
    fontFamily: 'Inter, sans-serif',
  },
  priorityContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  priorityButton: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 8,
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  checklistWrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 10,
    gap: 15,
  },
  taskItemContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteIcon: {
    width: 16,
    height: 16,
  },
  taskTitle: {
    color: '#000',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: '400',
    flex: 1,
  },
  dueDate: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
    fontSize: 8,
    fontWeight: '400',
  },
  modalView: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    padding: 20,
  },
  calendarSpanTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#010618',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#80B3FF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  taskIcon: {
    width: 24,
    height: 24,
  },
});

export default AddMealScreen;
