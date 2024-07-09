import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    Modal } from 'react-native';
import MyButton from '../utils/my_button';
import Calendar from '../components/calendar';
import DateSelectBox from '../components/date_select';


const InputField = ({ label }) => (
  <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.input}
          accessibilityLabel={label}
        />
      </View>
);

const TextinputField = ({ label }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.textInput}  // 使用独立的样式
      textAlignVertical='top'
      accessibilityLabel={label}
    />
  </View>
);

const CustomDropdown = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.find(option => option.selected));
  const endDate = new Date();
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const handleSelect = (option) => {
    onSelect(option);
    setSelectedOption(option);
    setIsOpen(false);
  };


  return (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity style={styles.input} onPress={() => setIsOpen(!isOpen)}>
        <Text>{selectedOption.label}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.dropdown}>
          {options.map(option => (
            <TouchableOpacity
              style={styles.dropdownOption}
              key={option.value}
              onPress={() => handleSelect(option)}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const ddlDate = '2021-01-01';

const AddOnScreen = () => {
  const categoryOptions = [
      { label: "Work & study", value: "Work & study", selected: false },
      { label: "Leisure & Recreation", value: "Leisure & Recreation", selected: false },
      { label: "Sports", value: "Sports", selected: true },
      { label: "Family & Socializing", value: "Family & Socializing", selected: false },
      { label: "Personal Development", value: "Personal Development", selected: false },
      { label: "Daily Living", value: "Daily Living", selected: false }
  ];

  const handleCategorySelect = (option) => {
    // Handle the selected location option
    console.log('Selected Category: ', option.label);
  };



  const ddlDate = new Date();
  const [selectedDdlDate, setSelectedDdlDate] = useState(ddlDate);
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>New Schedule</Text>
      </View>

      <InputField label="Title" />

      <InputField label="Location" />

      <CustomDropdown label="Category" options={categoryOptions} onSelect={handleCategorySelect} />

      <TextinputField label="Details" />

      <View style={styles.container}>
            <Text style={styles.text}>DDL:        {selectedDdlDate.toDateString()}</Text>
      </View>

      <MyButton
          icon={require('../assets/icons/time-select.png')}
          onPress={() => setShowCalendar(!showCalendar)}
          style={styles.timeZoneIcon}
      />

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

      <TouchableOpacity style={styles.saveButton} accessibilityRole="button">
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
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
    inputContainer: {
      marginBottom: 20,
      marginLeft: 20,
    },
    inputLabel: {
      fontFamily: 'Nunito, sans-serif',
      fontSize: 16,
      color: '#A8A6A7',
      fontWeight: '700',
      marginBottom: 8,
      marginLeft: 10,
    },
    input: {
      width: '90%',
      marginHorizontal: 10,
      borderRadius: 10,
      borderColor: '#D6D6D6',
      borderWidth: 1,
      padding: 10,
      marginTop: 5
    },
  dropdown: {
    zIndex: 1, // 设置下拉菜单层级高于输入框
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textInput: {
    width: '90%',
    marginHorizontal: 10,
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    height: 200,  // 自定义文本输入框高度
  },
  timeZoneIcon: {
    height: 29,
    width: 45,
    marginLeft:30,
  },
  doneButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 20,
    width: '90%',
    margin: 10,
  },
  doneButtonText: {
    color: 'white',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    padding: 3,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:30,
    marginBottom:20,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18, // 设置字体大小为 18
    fontWeight: 'bold', // 设置字体加粗
    textAlign: 'right',
  },
});

export default AddOnScreen;