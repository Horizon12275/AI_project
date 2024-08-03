import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MyButton from '../utils/my_button';
import {formatDate} from '../utils/date';

type TaskItemProps = {
  content: string;
  ddl: string;
  saved: boolean;
  handleCheck: () => void;
  handleDelete: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({
  content,
  ddl,
  saved,
  handleCheck,
  handleDelete,
}) => (
  <View
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    }}>
    <View style={styles.taskItemContainer}>
      <View style={styles.taskItemContent}>
        <MyButton
          icon={
            saved
              ? require('../assets/icons/checked.png')
              : require('../assets/icons/checkbox.png')
          }
          style={styles.taskIcon}
          onPress={handleCheck}
        />
        <Text style={[styles.taskTitle, saved && styles.completedText]}>
          {content}
        </Text>
      </View>
      <Text style={[styles.dueDate, saved && styles.completedText]}>
        Due: {ddl}
      </Text>
    </View>
    <MyButton
      icon={require('../assets/icons/delete.png')}
      onPress={handleDelete}
      style={styles.deleteIcon}
    />
  </View>
);

const Subtasks = ({
  subtasks,
}: {
  subtasks: {content: string; ddl: string; saved: boolean}[];
}) => {
  const [refresh, setRefresh] = useState(0);
  useEffect(() => {}, [refresh]);
  const handleCheck = (index: number) => {
    subtasks[index].saved = !subtasks[index].saved;
    setRefresh(refresh + 1);
  };
  const handleDelete = (index: number) => {
    subtasks.splice(index, 1);
    setRefresh(refresh + 1);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.tasksContainer}>
            {subtasks.map((task, index) => (
              <TaskItem
                key={index}
                {...task}
                handleCheck={() => handleCheck(index)}
                handleDelete={() => handleDelete(index)}
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
    paddingBottom: 16,
  },
  content: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
  },

  tasksContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  taskItemContainer: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  taskTitle: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontSize: 13,
    fontWeight: '400',
    flex: 1,
  },
  dueDate: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
    fontSize: 9,
    fontWeight: '400',
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
