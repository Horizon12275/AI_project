import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Divider from './divider';
import MyButton from '../utils/my_button';
import {categoryColors} from '../utils/offline';
import {changeSubtaskDone, deleteSubtask} from '../services/subtaskService';
import {useEffect, useState} from 'react';
import {getObject, storeObject} from '../services/offlineService';
import {deleteEvent} from '../services/eventService';

type eventProps = {
  id: number;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  category: number;
  subtasks: Array<{
    id: number;
    content: string;
    ddl: string;
    done: boolean;
  }>;
};

const EventCard = ({
  isEditing,
  setIsEditing,
  event,
}: {
  isEditing: number;
  setIsEditing: (isEditing: number) => void;
  event: eventProps;
}) => {
  const [refresh, setRefresh] = useState(0); //setEvent逻辑太麻烦 偷懒使用refresh手动刷新渲染
  useEffect(() => {}, [refresh]);

  const handleExpand = () => {
    if (isEditing === event.id) {
      setIsEditing(-1);
    } else {
      setIsEditing(event.id);
    }
  };

  const handleCheck = (sid: number) => {
    getObject('mode').then(mode => {
      if (mode === 'online') {
        changeSubtaskDone(sid)
          .then(() => {
            const eventIndex = event.subtasks.findIndex(
              subtask => subtask.id === sid,
            );
            const newSubtasks = [...event.subtasks];
            newSubtasks[eventIndex].done = !newSubtasks[eventIndex].done;
            event.subtasks = newSubtasks;
            getObject('events').then(events => {
              const eventIndex = events.findIndex(
                (e: any) => e.id === event.id,
              );
              events[eventIndex] = event;
              storeObject('events', events);
            });
            setRefresh(refresh + 1);
          })
          .catch(error => Alert.alert('Error', error));
      } else {
        Promise.all([getObject('events'), getObject('events_unpushed')]).then(
          ([events, events_unpushed]) => {
            const eventIndex = event.subtasks.findIndex(
              subtask => subtask.id === sid,
            );
            const newSubtasks = [...event.subtasks];
            newSubtasks[eventIndex].done = !newSubtasks[eventIndex].done;
            event.subtasks = newSubtasks;
            //
            events_unpushed.push(event);
            storeObject('events_unpushed', events_unpushed);

            events.map((e: any) => {
              if (e.id === event.id) {
                e.subtasks = newSubtasks;
              }
            });
            storeObject('events', events);
            setRefresh(refresh + 1);
          },
        );
      }
    });
  };

  const handleDeleteSubtask = (sid: number) => {
    getObject('mode').then(mode => {
      if (mode === 'online') {
        deleteSubtask(sid)
          .then(() => {
            const eventIndex = event.subtasks.findIndex(
              subtask => subtask.id === sid,
            );
            const newSubtasks = [...event.subtasks];
            newSubtasks.splice(eventIndex, 1);
            event.subtasks = newSubtasks;
            getObject('events').then(events => {
              const eventIndex = events.findIndex(
                (e: any) => e.id === event.id,
              );
              events[eventIndex] = event;
              storeObject('events', events);
            });
            setRefresh(refresh + 1);
          })
          .catch(error => Alert.alert('Error', error));
      } else {
        Promise.all([getObject('events'), getObject('events_unpushed')]).then(
          ([events, events_unpushed]) => {
            const eventIndex = event.subtasks.findIndex(
              subtask => subtask.id === sid,
            );
            const newSubtasks = [...event.subtasks];
            newSubtasks.splice(eventIndex, 1);
            event.subtasks = newSubtasks;
            //
            events_unpushed.push(event);
            storeObject('events_unpushed', events_unpushed);

            events.map((e: any) => {
              if (e.id === event.id) {
                e.subtasks = newSubtasks;
              }
            });
            storeObject('events', events);
            setRefresh(refresh + 1);
          },
        );
      }
    });
  };
  const handleEdit = () => {
    console.log('edit');
  };
  const handleDeleteEvent = () => {
    getObject('mode').then(mode => {
      if (mode === 'online') {
        deleteEvent(event.id)
          .then(() => {
            getObject('events').then(events => {
              const eventIndex = events.findIndex(
                (e: any) => e.id === event.id,
              );
              events.splice(eventIndex, 1); //删除event
              storeObject('events', events);
            });
            setRefresh(refresh + 1);
          })
          .catch(e => Alert.alert('Error', e));
      } else {
        Promise.all([getObject('events'), getObject('events_unpushed')]).then(
          ([events, events_unpushed]) => {
            const eventIndex = events.findIndex((e: any) => e.id === event.id);
            events.splice(eventIndex, 1); //删除event
            storeObject('events', events);

            events_unpushed.push({id: event.id}); //title为null 代表删除
            storeObject('events_unpushed', events_unpushed);
            setRefresh(refresh + 1);
          },
        );
      }
    });
  };

  const color = categoryColors[event.category];
  return (
    <View style={styles.scheduleItemContainer}>
      <View style={styles.absoluteIcons}>
        <MyButton
          icon={require('../assets/icons/edit.png')}
          style={styles.icon}
          onPress={handleEdit}
        />
        <MyButton
          icon={require('../assets/icons/delete.png')}
          style={styles.deleteIcon}
          tintColor="#F08080"
          onPress={handleDeleteEvent}
        />
      </View>
      <View style={styles.timeContainer}>
        <MyButton
          icon={
            isEditing === event.id
              ? require('../assets/icons/down-arrow.png')
              : require('../assets/icons/right-arrow.png')
          }
          onPress={handleExpand}
          style={styles.icon}
        />
        <View style={styles.iconWrapper}>
          <View style={styles.startTimeWrapper}>
            <Text style={{color: 'black'}}>{event.startTime}</Text>
          </View>
          <View style={styles.endTimeWrapper}>
            <Text style={{color: 'black'}}>{event.endTime}</Text>
          </View>
        </View>
      </View>
      <Divider direction="vertical" color={color} marginHorizontal={15} />
      <View style={styles.contentContainer}>
        <View style={styles.titleWrapper}>
          <Text style={[styles.title, {color}]}>{event.title}</Text>
        </View>
        <View style={styles.detailsWrapper}>
          <View style={styles.locationWrapper}>
            <Text style={{fontSize: 12}}>{event.location}</Text>
          </View>
          {/* {event.subtasks.length && (
            <View style={styles.additionalInfoWrapper}>
              <Divider color="black" thickness={0.5} marginHorizontal={6} />
              {event.subtasks.length && (
                <View style={styles.countBadge}>
                  <Text style={styles.countText}>{event.subtasks.length}</Text>
                </View>
              )}
              {event.subtasks.map((subtask, index) => (
                <View key={index} style={styles.additionalInfoTextWrapper}>
                  <Text>{subtask.content}</Text>
                </View>
              ))}

            </View>
          )} */}
        </View>
        {isEditing === event.id && event.subtasks.length > 0 && (
          <View style={styles.checklistWrapper}>
            <View style={styles.checklistHeader}>
              <Text style={styles.checklist}>Checklists</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 8,
                marginTop: 10,
              }}>
              {event.subtasks.map((subtask, index) => (
                <View key={index}>
                  <View style={styles.taskItemContainer}>
                    <MyButton
                      icon={
                        subtask.done
                          ? require('../assets/icons/checked.png')
                          : require('../assets/icons/checkbox.png')
                      }
                      style={styles.taskIcon}
                      onPress={() => handleCheck(subtask.id)}
                    />
                    <Text
                      style={[
                        styles.taskTitle,
                        subtask.done && styles.completedText,
                      ]}
                      //numberOfLines={2}
                      ellipsizeMode="tail">
                      {subtask.content}
                    </Text>
                    <MyButton
                      icon={require('../assets/icons/delete.png')}
                      onPress={() => handleDeleteSubtask(subtask.id)}
                      style={styles.deleteIcon}
                    />
                  </View>
                  <Text
                    style={[
                      styles.dueDate,
                      subtask.done && styles.completedText,
                    ]}>
                    {`Due: ${subtask.ddl}`}
                  </Text>
                </View>
              ))}
              {/* <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}>
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.primaryButton]}>
                  <Text style={[styles.buttonText, styles.primaryButtonText]}>
                    + Checklist
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleItemContainer: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(235, 235, 245, 0.60)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 24,
    marginHorizontal: 16,
    minHeight: 80,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    color: '#010618',
    height: '100%',
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  icon: {
    height: 18,
    aspectRatio: 1,
  },
  startTimeWrapper: {
    fontFamily: 'Inter, sans-serif',
  },
  endTimeWrapper: {
    fontFamily: 'Inter, sans-serif',
  },
  contentContainer: {
    flex: 1,
  },
  titleWrapper: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  detailsWrapper: {
    display: 'flex',
    marginTop: 4,
    flexDirection: 'row',
    fontSize: 9,
    fontWeight: '400',
  },
  locationWrapper: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
  },
  additionalInfoWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  countBadge: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#3083FD',
    borderRadius: 8,
    alignItems: 'center',
    width: 16,
    justifyContent: 'center',
    height: 16,
    marginRight: 4,
  },
  countText: {
    color: '#FFF',
    fontSize: 10,
  },
  additionalInfoTextWrapper: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
  },
  checklist: {
    color: 'black',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: '700',
  },
  checklistWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 12,
  },
  checklistHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tasksContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  taskItemContainer: {
    alignItems: 'center',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    flex: 1,
  },
  absoluteIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 15,
  },
  taskIcon: {
    width: 24,
    height: 24,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 4,
  },
  taskTitle: {
    color: '#010618',
    fontFamily: 'Inter, sans-serif',
    fontSize: 12,
    fontWeight: '400',
    flex: 1,
  },
  dueDate: {
    color: '#21283F',
    fontFamily: 'Inter, sans-serif',
    fontSize: 9,
    fontWeight: '400',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 16,
    height: 40,
  },
  primaryButton: {
    backgroundColor: '#80B3FF',
  },
  secondaryButton: {
    borderColor: 'rgba(128, 179, 255, 1)',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  buttonText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: '#010618',
  },
  secondaryButtonText: {
    color: '#010618',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    gap: 8,
  },
});

export default EventCard;
