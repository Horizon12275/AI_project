import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MyButton from '../utils/my_button';
import {formatDate} from '../utils/date';

type TaskItemProps = {
  content: string;
  saved: boolean;
  handleCheck: () => void;
  handleDelete: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  content,
  saved,
  handleCheck,
  handleDelete,
}) => (
  <View style={styles.taskItem}>
    <MyButton
      icon={
        saved
          ? require('../assets/icons/checked.png')
          : require('../assets/icons/checkbox.png')
      }
      style={styles.taskIcon}
      onPress={handleCheck}
    />
    <View style={styles.taskTextContainer}>
      <Text style={styles.taskText}>{content}</Text>
    </View>

    <MyButton
      icon={require('../assets/icons/delete.png')}
      style={styles.taskIcon}
      onPress={handleDelete}
    />
  </View>
);

const Reminder = ({
  reminders,
}: {
  reminders: {content: string; saved: boolean}[];
}) => {
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {}, [refresh]);
  const handleCheck = (index: number) => {
    reminders[index].saved = !reminders[index].saved;
    setRefresh(refresh + 1);
  };
  const handleDelete = (index: number) => {
    reminders.splice(index, 1);
    setRefresh(refresh + 1);
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.taskList}>
        <View style={styles.taskListContent}>
          {reminders.map((reminder, index) => (
            <TaskItem
              key={index}
              {...reminder}
              handleCheck={() => handleCheck(index)}
              handleDelete={() => handleDelete(index)}
            />
          ))}
        </View>
        <MyButton
          icon={require('../assets/icons/plus.png')}
          style={styles.plusIcon}
          onPress={() => {}}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    gap: 8,
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
    fontSize: 18,
    color: '#010618',
    fontWeight: '400',
    fontFamily: 'Inter, sans-serif',
  },
  taskIcon: {
    width: 20,
    height: 20,
  },
  plusIcon: {
    backgroundColor: '#80B3FF',
    borderRadius: 4,
  },
});

export default Reminder;
