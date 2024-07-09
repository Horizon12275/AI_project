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

const PrioritySelector: React.FC = ({ label }) => {
  const [selectedPriority, setSelectedPriority] = useState(null);

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority === selectedPriority ? null : priority);
  };

  return (
    <View style={styles.pricontainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.priorityContainer}>
        <TouchableOpacity
          style={[styles.priorityButton, selectedPriority === 'High' && styles.selectedPriority]}
          onPress={() => handlePriorityClick('High')}
        >
          <Text style={styles.priorityButtonText}>High</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, selectedPriority === 'Medium' && styles.selectedPriority]}
          onPress={() => handlePriorityClick('Medium')}
        >
          <Text style={styles.priorityButtonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.priorityButton, selectedPriority === 'Low' && styles.selectedPriority]}
          onPress={() => handlePriorityClick('Low')}
        >
          <Text style={styles.priorityButtonText}>Low</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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


const AddOffScreen = () => {
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

  const [subTasks, setSubTasks] = useState<string[]>([]);
  const [newSubTask, setNewSubTask] = useState<string>('');

  const addSubTask = () => {
    if (newSubTask.trim() !== '') {
      setSubTasks([...subTasks, newSubTask]);
      setNewSubTask('');
    }
  };

  const removeSubTask = (index: number) => {
    const updatedSubTasks = subTasks.filter((task, i) => i !== index);
    setSubTasks(updatedSubTasks);
  };


  return (
    <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>New Schedule</Text>
      </View>

      <InputField label="Title" />

      <InputField label="Location" />

      <CustomDropdown label="Category" options={categoryOptions} onSelect={handleCategorySelect} />

      <PrioritySelector label="Priority" />


      <View style={styles.subTaskContainer}>
        <Text style={styles.labelText}>Sub Tasks</Text>
        <View style={styles.subTaskInputContainer}>
          <TextInput
            style={styles.subTaskInput}
            value={newSubTask}
            onChangeText={setNewSubTask}
            placeholder="Add a new sub-task"
          />
          <TouchableOpacity style={styles.addButton} onPress={addSubTask}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {subTasks.map((task, index) => (
          <View key={index} style={styles.subTaskItem}>
            <Text style={styles.subTaskText}>{task}</Text>
            <TouchableOpacity onPress={() => removeSubTask(index)}>
              <Text style={styles.removeButtonText}>✘</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <TextinputField label="Reminders" />

      <View style={styles.ddlContainer}>
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
      right: 10, // 调整右侧距离
      width: '20%',
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
    height: 300,  // 自定义文本输入框高度
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
  ddlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:30,
    marginBottom:0,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18, // 设置字体大小为 18
    fontWeight: 'bold', // 设置字体加粗
    textAlign: 'right',
  },
  pricontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  priorityButton: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0A84FF',
    textAlign: 'center',
    backgroundColor: 'rgba(10, 132, 255, 0.15)',
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 20,
  },
  pricontainer: {
    marginTop:20,
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priorityContainer: {
    marginBottom:30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
  },
  selectedPriority: {
    backgroundColor: '#80B3FF',
  },
  priorityButtonText: {
    fontSize: 16,
  },
  subTaskContainer: {
    padding: 20,
    backgroundColor: 'white'
  },
  labelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subTaskInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  subTaskInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  addButton: {
    backgroundColor: '#80B3FF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10
  },
  addButtonText: {
    color: 'white'
  },
  subTaskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },

});

export default AddOffScreen;