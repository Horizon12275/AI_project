import React, {useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MyButton from '../utils/my_button';

type ChecklistItemProps = {
  title: string;
  dueDate: string;
  isCompleted?: boolean;
};

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  title,
  dueDate,
  isCompleted = false,
}) => (
  <View style={styles.checklistItemContainer}>
    <View style={styles.checklistItemContent}>
      <View style={styles.checkboxContainer}>
        <View
          style={[styles.checkbox, isCompleted && styles.checkboxCompleted]}
        />
      </View>
      <Text
        style={[
          styles.checklistItemTitle,
          isCompleted && styles.completedText,
        ]}>
        {title}
      </Text>
    </View>
    <Text style={[styles.dueDate, isCompleted && styles.completedText]}>
      Due: {dueDate}
    </Text>
  </View>
);

type TaskItemProps = {
  title: string;
  dueDate: string;
  isCompleted?: boolean;
  onPress?: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  dueDate,
  isCompleted = false,
  onPress,
}) => (
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      marginTop: 16,
    }}>
    <View style={styles.taskItemContainer}>
      <View style={styles.taskItemContent}>
        <MyButton
          icon={
            isCompleted
              ? require('../assets/icons/checked.png')
              : require('../assets/icons/checkbox.png')
          }
          style={styles.taskIcon}
          onPress={onPress}
        />
        <Text style={[styles.taskTitle, isCompleted && styles.completedText]}>
          {title}
        </Text>
      </View>
      <Text style={[styles.dueDate, isCompleted && styles.completedText]}>
        Due: {dueDate}
      </Text>
    </View>
    <MyButton
      icon={require('../assets/icons/delete.png')}
      onPress={() => {}}
      style={styles.deleteIcon}
    />
  </View>
);

const Subtasks: React.FC = () => {
  const [tasks, setTasks] = useState([
    {
      title: 'Class note Chapter1 review',
      dueDate: '9/19',
      isCompleted: true,
    },
    {
      title: 'Class note Chapter1 review',
      dueDate: '9/19',
      isCompleted: true,
    },
    {title: 'Checklist title 3', dueDate: '9/19', isCompleted: false},
    {title: 'Checklist title 4', dueDate: '9/19', isCompleted: false},
  ]);

  const handleCheck = (index: number) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? {...task, isCompleted: !task.isCompleted} : task,
      ),
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>Today - October 18th, 2023</Text>
          </View>
          <View style={styles.tasksContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tests - ICS TEST</Text>
              <MyButton
                icon={require('../assets/icons/edit.png')}
                style={styles.sectionIcon}
                onPress={() => {}}
              />
            </View>
            {tasks.map((task, index) => (
              <TaskItem
                key={index}
                {...task}
                onPress={() => handleCheck(index)}
              />
            ))}
          </View>
        </View>
      </View>
      <MyButton
        icon={require('../assets/icons/plus.png')}
        onPress={() => {}}
        style={{
          width: 20,
          height: 20,
        }}
        buttonStyle={styles.plusIcon}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    padding: 32,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },
  dateContainer: {
    marginBottom: 16,
  },
  dateText: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
    fontWeight: '700',
  },
  tasksContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionHeader: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#FFC374',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionIcon: {
    width: 24,
    height: 24,
  },
  taskItemContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },
  taskItemContent: {
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  taskIcon: {
    width: 24,
    height: 24,
  },
  deleteIcon: {
    width: 16,
    height: 16,
  },
  taskTitle: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: '400',
  },
  dueDate: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    fontWeight: '400',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  plusIcon: {
    position: 'absolute',
    bottom: 75,
    right: 20,
    width: 50,
    height: 50,
    backgroundColor: '#80B3FF',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Subtasks;
