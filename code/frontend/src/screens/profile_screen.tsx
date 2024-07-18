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
} from 'react-native';

import GoBack from '../utils/go_back';
import DropdownInput from '../components/dropdown_input';
import {
  challengeOptions,
  identityAvatars,
  identityOptions,
  sleepOptions,
} from '../utils/offline';
import {getUser, portraitUpload} from '../services/userService';
import {logout} from '../services/loginService';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      data: challengeOptions,
      value: exercise,
      setValue: setExercise,
    },
  ];

  useEffect(() => {
    getUser()
      .then(res => {
        console.log(res);
        setSleep(res.sleep_schedule);
        setChallenge(res.challenge);
        setExercise(res.exercise);
        setIdentity(res.identity);
      })
      .catch(err => {
        console.log(err);
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
    console.log(portrait);
    portraitUpload(portrait)
      .then(res => {
        Alert.alert('Success', 'Portrait updated successfully');
      })
      .catch(err => {
        Alert.alert('Error', err);
      });
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        AsyncStorage.removeItem('auth'); //清除登录信息
        navigation.navigate('Login');
      })
      .catch(err => {
        Alert.alert('Error', err);
        navigation.navigate('Login');
      });
  };

  return (
    <View style={{backgroundColor: 'white', height: '100%'}}>
      <GoBack title="Settings" />
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
    </View>
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
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
    width: '100%',
    textAlign: 'left', // 使标题左对齐
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
  quitButton: {
    position: 'absolute',
    bottom: 100,
    right: 25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#80B3FF',
    paddingVertical: 11,
    paddingHorizontal: 15,
  },
  quitButtonText: {
    color: '#fff',
    fontSize: 16,
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
    width: 200,
    height: 200,
    borderRadius: 50,
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
    fontSize: 22,
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
    fontSize: 18,
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
    fontSize: 16,
  },

  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  inputLabel: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 16,
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
