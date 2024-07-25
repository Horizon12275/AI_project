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
} from 'react-native';
import MyButton from '../utils/my_button';
import Calendar from '../components/calendar';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DropdownInput from '../components/dropdown_input';
import {categoryOptions} from '../utils/offline';
import {Form, Input} from '@ant-design/react-native';
import MyHeader from '../components/my_header';
import {toDate, toTime} from '../utils/date';
import {addEvent} from '../services/eventService';
import SelectModal from '../components/select_modal';

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

const AddOnScreen = ({navigation}: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [category, setCategory] = useState(1);
  const [startTime, setStartTime] = useState<null | Date>(null);
  const [endTime, setEndTime] = useState<null | Date>(null);
  const [ddlDate, setDdlDate] = useState(new Date());
  const [form] = Form.useForm();

  useEffect(() => {}, [ddlDate, startTime, endTime]);

  const onSubmit = () => {
    form.submit();
  };
  const handleSave = (event: any) => {
    if (startTime) event.startTime = toTime(startTime);
    if (endTime) event.endTime = toTime(endTime);
    event.ddl = toDate(ddlDate);
    event.category = category;
    let eventDetails = {
      category: categoryOptions[category].label,
      ddl: event.ddl,
      details: event.details,
      location: event.location,
      title: event.title,
    };
    setLoading(true);
    addEvent({
      event,
      eventDetails,
    })
      .then(event => {
        setLoading(false);
        navigation.navigate('AI', {event}); //传入响应的event给ai界面 来渲染ai的帮助内容
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error', err);
      });
  };
  return (
    <Form onFinish={handleSave} form={form}>
      <MyHeader onSave={onSubmit} />
      <ScrollView
        style={{
          backgroundColor: '#fff',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
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
            selectedValue={category}
            setSelectedValue={setCategory}
          />
        </View>
        <InputField
          label="Details"
          props={{
            name: 'details',
            rules: [
              {
                required: true,
                message: 'Please input the details!',
              },
            ],
          }}
          inputStyle={styles.textInput}
        />
        <View style={styles.ddlContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.ddlText}>DDL</Text>
            <Text style={styles.dateText}>
              {`${toDate(ddlDate)}  `}
              {startTime &&
                endTime &&
                `${toTime(startTime)}~${toTime(endTime)}`}
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
              value={startTime || new Date()}
              onChange={(event, selectedDate) => {
                if (endTime && selectedDate > endTime) {
                  Alert.alert(
                    'Error',
                    'Start time should be earlier than end time',
                  );
                  setShowStartTimePicker(false);
                  return;
                }
                setStartTime(selectedDate || startTime);
                if (!endTime) setEndTime(selectedDate || startTime);
                setShowStartTimePicker(false);
              }}
            />
          )}
          {showEndTimePicker && (
            <RNDateTimePicker
              mode="time"
              display="clock"
              value={endTime || new Date()}
              onChange={(event, selectedDate) => {
                if (startTime && selectedDate < startTime) {
                  Alert.alert(
                    'Error',
                    'End time should be later than start time',
                  );
                  setShowEndTimePicker(false);
                  return;
                }
                setEndTime(selectedDate || endTime);
                if (!startTime) setStartTime(selectedDate || endTime);
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

        {/* <TouchableOpacity style={styles.saveButton} accessibilityRole="button">
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity> */}
      </ScrollView>
      {showCalendar && (
        <Modal
          animationType="fade" // 动画效果
          transparent={true} // 透明背景
          visible={showCalendar}
          onRequestClose={() => {
            setShowCalendar(!showCalendar);
          }}>
          <TouchableWithoutFeedback onPress={() => setShowCalendar(false)}>
            <View style={styles.modalView}>
              <Text style={styles.calendarSpanTitle}>DDL Date</Text>
              <Calendar selectedDate={ddlDate} setSelectedDate={setDdlDate} />
              <TouchableOpacity
                onPress={() => setShowCalendar(!showCalendar)}
                style={styles.doneButton}>
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </Form>
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
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
  },
  saveButtonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  inputContainer: {
    gap: 5,
    justifyContent: 'center',
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
    width: '100%',
    height: 50,
  },
  textInput: {
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    marginTop: 5,
    height: 300, // 自定义文本输入框高度
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
  },
  textContainer: {
    flex: 1,
  },
  ddlText: {
    fontSize: 16,
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
    marginBottom: 150,
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
    lineHeight: 15,
    fontFamily: 'Inter, sans-serif',
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
});

export default AddOnScreen;
