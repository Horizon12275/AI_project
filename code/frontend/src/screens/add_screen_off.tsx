import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import MyButton from '../utils/my_button';
import Calendar from '../components/calendar';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import DropdownInput from '../components/dropdown_input';
import {categoryOptions, priorityOptions} from '../utils/offline';

const InputField = ({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.input}
      accessibilityLabel={label}
      placeholder={placeholder}
    />
  </View>
);

const TextinputField = ({label}: {label: string}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.textInput} // 使用独立的样式
      textAlignVertical="top"
      accessibilityLabel={label}
    />
  </View>
);

const AddOnScreen = () => {
  const ddlDate = new Date();
  const [selectedDdlDate, setSelectedDdlDate] = useState(ddlDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: '100%',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>New Schedule</Text>
      </View>
      <InputField label="Title" />
      <InputField label="Location" />
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Category</Text>
        <DropdownInput
          data={categoryOptions}
          onSelect={value => console.log(value)}
          style={styles.input}
          placeholder="Select a category"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Priority Level</Text>
        <View style={styles.priorityContainer}>
          {priorityOptions.map((item, index) => {
            return (
              <TouchableOpacity key={index} style={styles.priorityButton}>
                <Text style={styles.startButtonText}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <InputField label="Subtasks" />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Select Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Add New Subtask</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checklistWrapper}>
        {[1, 2, 3].map((item, index) => (
          <View
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}>
            <View style={styles.taskItemContainer}>
              <Text
                style={[styles.taskTitle]}
                numberOfLines={2}
                ellipsizeMode="tail">
                ICS-TEST231111111111111111111111111111111111111111
              </Text>
              <MyButton
                icon={require('../assets/icons/delete.png')}
                onPress={() => {}}
                style={styles.deleteIcon}
              />
            </View>
            <Text style={[styles.dueDate]}>Due: 9/19</Text>
          </View>
        ))}
      </View>
      <TextinputField label="Details" />
      <View style={styles.ddlContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.ddlText}>DDL</Text>
          <Text style={styles.dateText}>{selectedDdlDate.toDateString()}</Text>
        </View>
        <MyButton
          icon={require('../assets/icons/time-select.png')}
          onPress={() => setShowCalendar(!showCalendar)}
          style={styles.timeZoneIcon}
          buttonStyle={styles.timeZoneButton}
        />
      </View>
      <View style={styles.timeSelectContainer}>
        {showTimePicker && (
          <RNDateTimePicker
            mode="time"
            display="clock"
            value={new Date()}
            onChange={(event, selectedDate) => {
              setShowTimePicker(false);
              console.log(selectedDate);
            }}
          />
        )}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setShowTimePicker(true)}>
          <Text style={styles.startButtonText}>Start Time</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>End Time</Text>
        </TouchableOpacity>
      </View>
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
              selectedDate={selectedDdlDate}
              setSelectedDate={setSelectedDdlDate}
            />
            <TouchableOpacity
              onPress={() => setShowCalendar(!showCalendar)}
              style={styles.doneButton}>
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {/* <TouchableOpacity style={styles.saveButton} accessibilityRole="button">
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity> */}
    </View>
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
    fontSize: 32,
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
    fontSize: 16,
    fontWeight: '700',
  },
  inputContainer: {
    gap: 5,
  },
  inputLabel: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 16,
    color: 'black',
    fontWeight: '300',
  },
  input: {
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    padding: 10,
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
    flex: 1,
    paddingVertical: 10,
  },
  doneButtonText: {
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    padding: 3,
    textAlign: 'center',
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  ddlText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  dateText: {
    fontSize: 20,
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
    marginBottom: 20,
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
    fontSize: 17,
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
    fontSize: 16,
    fontWeight: '400',
    flex: 1,
  },
  dueDate: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    fontWeight: '400',
  },
});

export default AddOnScreen;
