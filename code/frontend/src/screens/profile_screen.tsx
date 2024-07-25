import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';

import GoBack from '../utils/go_back';
import DropdownInput from '../components/dropdown_input';
import {
  challengeOptions,
  exerciseOptions,
  identityAvatars,
  identityOptions,
  sleepOptions,
} from '../utils/offline';
import {getUser, portraitUpload} from '../services/userService';
import {logout} from '../services/loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  clearAllUnpushed,
  getObject,
  removeObject,
  storeObject,
} from '../services/offlineService';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [sleep, setSleep] = useState<null | number>(null);
  const [challenge, setChallenge] = useState<null | number>(null);
  const [exercise, setExercise] = useState<null | number>(null);
  const [identity, setIdentity] = useState<null | number>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const items = [
    {
      label: 'sleep schedule',
      data: sleepOptions,
      value: sleep,
      setValue: setSleep,
    },
    {
      label: 'challenges',
      data: challengeOptions,
      value: challenge,
      setValue: setChallenge,
    },
    {
      label: 'exercise',
      data: exerciseOptions,
      value: exercise,
      setValue: setExercise,
    },
  ];

  useEffect(() => {
    getObject('mode').then(mode => {
      if (mode == 'online') {
        //用户已登录 且为在线模式 从云端获取数据
        getUser().then(user => {
          storeObject('user', user);
          setSleep(user.sleep_schedule);
          setChallenge(user.challenge);
          setExercise(user.exercise);
          setIdentity(user.identity);
        });
      } else {
        //用户已登录 但为离线模式 从本地获取数据
        getObject('user').then(user => {
          if (user) {
            setSleep(user.sleep_schedule);
            setChallenge(user.challenge);
            setExercise(user.exercise);
            setIdentity(user.identity);
          }
        });
      }
    });
  }, []);

  const handleImagePick = (value: number) => {
    setIdentity(value);
    setModalVisible(false);
  };

  const handleSave = () => {
    const portrait = {
      sleep_schedule: sleep,
      challenge: challenge,
      exercise: exercise,
      identity: identity,
    };
    getObject('mode').then(mode => {
      if (mode == 'online') {
        //用户已登录 且为在线模式 上传数据到云端 然后更新本地数据
        portraitUpload(portrait).then(newUser => {
          Alert.alert('Success', 'Portrait updated successfully');
          storeObject('user', newUser);
        });
      } else {
        //用户已登录 但为离线模式 保存数据到unpushed 然后更新本地数据
        Alert.alert(
          'Offline',
          'You are in offline mode now, your data will be uploaded when you are online again',
        );
        storeObject('user_unpushed', portrait); //保存未上传的数据
        //更新本地数据
        getObject('user').then(user => {
          user.sleep_schedule = sleep;
          user.challenge = challenge;
          user.exercise = exercise;
          user.identity = identity;
          storeObject('user', user);
        });
      }
    });
    //更新界面渲染
    setSleep(sleep);
    setChallenge(challenge);
    setExercise(exercise);
    setIdentity(identity);
  };

  const handleLogout = () => {
    getObject('mode').then(mode => {
      if (mode == 'online')
        logout()
          .then(() => {
            removeObject('auth'); //清除登录信息
            removeObject('user'); //清除用户信息
            navigation.replace('Login');
          })
          .catch(err => {
            Alert.alert('Error', err);
          });
      else {
        Alert.alert(
          'Warning',
          "You are in offline mode now, if you logout, you'll lose all unsynced data, are you sure to logout?",
          [
            {text: 'Cancel', onPress: () => {}},
            {
              text: 'OK',
              onPress: () => {
                clearAllUnpushed(); //清除未上传的数据
                removeObject('auth'); //清除登录信息
                removeObject('user'); //清除用户信息
                navigation.replace('Login');
              },
            },
          ],
        );
      }
    });
  };

  return (
    <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
      <View style={styles.container}>
        <Text style={styles.titleText}>My Portrait</Text>
        <View style={styles.imageContainer}>
          <View style={styles.imageWrapper}>
            {identity && (
              <Image
                source={identityAvatars[identity - 1]}
                style={styles.portraitImage}
              />
            )}
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={styles.editButton}>
              <Text style={styles.editButtonText}>✏️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {items.map((item, index) => (
        <View style={styles.inputContainer} key={index}>
          <Text style={styles.inputLabel}>{item.label}</Text>
          <DropdownInput
            data={item.data}
            selectedValue={item.value}
            setSelectedValue={item.setValue}
            style={styles.input}
          />
        </View>
      ))}
      <TouchableOpacity
        style={styles.saveButton}
        accessibilityRole="button"
        onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.quitButton}>
        <Text style={styles.quitButtonText}>Logout</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={identityOptions}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => handleImagePick(item.value)}
                  style={styles.modalItem}>
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    display: 'flex',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Inter, sans-serif',
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    width: '100%',
    textAlign: 'left', // 使标题左对齐
  },
  saveButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
    paddingHorizontal: 150,
  },
  saveButtonText: {
    color: '#000',
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  quitButton: {
    marginRight: 25,
    marginTop: 20,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  quitButtonText: {
    color: '#fff',
    fontSize: 12,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  portraitImage: {
    width: 120,
    height: 150,
    borderRadius: 30,
  },
  editButton: {
    position: 'absolute',
    right: -10,
    bottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 5,
  },
  editButtonText: {
    fontSize: 18,
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 12,
    color: '#000',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#80B3FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 12,
  },

  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  inputLabel: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 12,
    color: '#A8A6A7',
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    padding: 10,
    marginTop: 5,
    zIndex: 1,
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
});

export default ProfileScreen;
