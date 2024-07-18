import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MyButton from '../utils/my_button';

type TaskItemProps = {
  text: string;
  checked: boolean;
};

const TaskItem: React.FC<TaskItemProps> = ({text, checked}) => (
  <View style={styles.taskItem} testID="task-item">
    <View style={styles.taskCheckbox}>
      <View style={[styles.checkbox, checked && styles.checkedBox]} />
    </View>
    <View style={styles.taskTextContainer}>
      <Text style={styles.taskText}>{text}</Text>
    </View>

    <MyButton
      icon={require('../assets/icons/delete.png')}
      style={styles.taskIcon}
      onPress={() => {}}
    />
  </View>
);

type CourseItemProps = {
  title: string;
  color: string;
};

const CourseItem: React.FC<CourseItemProps> = ({title, color}) => (
  <View style={styles.courseItem} testID="course-item">
    <View style={styles.courseTitle}>
      <Text style={[styles.courseTitleText, {color: color}]}>{title}</Text>
    </View>
    <MyButton
      icon={require('../assets/icons/edit.png')}
      style={[styles.courseIcon, {tintColor: color}]}
      onPress={() => {}}
    />
  </View>
);

const TaskList: React.FC = () => {
  const tasks: TaskItemProps[] = [
    {text: 'Bring notes', checked: false},
    {text: 'Prepare for Presentation', checked: false},
    {text: 'Bring PC', checked: false},
    {text: 'Print notes', checked: false},
  ];

  return (
    <View style={styles.taskList} testID="task-list">
      <View style={styles.taskListContent}>
        {tasks.map((task, index) => (
          <TaskItem key={index} {...task} />
        ))}
      </View>
      <MyButton
        icon={require('../assets/icons/plus.png')}
        style={styles.plusIcon}
        onPress={() => {}}
      />
    </View>
  );
};

const Reminder: React.FC = () => {
  return (
    <ScrollView style={styles.container} testID="reminder">
      <View style={styles.header}>
        <Text style={styles.dateText}>Today - October 18th, 2023</Text>
      </View>
      <View style={styles.courseList}>
        <CourseItem title="MGT 101 - Organization Management" color="#FFC374" />
        <CourseItem
          title="EC 203 - Principles Macroeconomics"
          color="#4AD2C9"
        />
      </View>
      <TaskList />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  dateText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
  },
  courseList: {
    marginBottom: 8,
  },
  courseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
  },
  courseTitle: {
    flex: 1,
  },
  courseTitleText: {
    color: '#010618',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Inter, sans-serif',
  },
  courseIcon: {
    width: 24,
    height: 24,
  },
  taskList: {
    backgroundColor: 'rgba(235, 235, 245, 0.60)',
    borderRadius: 8,
    padding: 16,
  },
  taskListIcon: {
    width: 1,
    height: 100,
    marginRight: 7,
  },
  taskListContent: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskCheckbox: {
    padding: 4,
    marginRight: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#010618',
  },
  checkedBox: {
    backgroundColor: '#010618',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 14,
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
  },
  taskIcon: {
    width: 16,
    height: 16,
  },
  plusIcon: {
    backgroundColor: '#80B3FF',
    borderRadius: 4,
  },
});

export {TaskItem, TaskList, CourseItem, Reminder};
