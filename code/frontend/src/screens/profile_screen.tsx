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
  TouchableWithoutFeedback,
  TextInput,
  RefreshControl,
} from 'react-native';
import {
  challengeOptions,
  exerciseOptions,
  identityAvatars,
  identityOptions,
  sleepOptions,
} from '../utils/offline';
import {getUser, updateUser} from '../services/userService';
import {logout} from '../services/loginService';
import {
  clearAllUnpushed,
  getObject,
  removeObject,
  storeObject,
} from '../services/offlineService';
import SelectModal from '../components/select_modal';
import Loading from '../components/loading';
import MyButton from '../utils/my_button';

const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const items = [
    {
      label: 'sleep schedule',
      data: sleepOptions,
      value: user?.sleep_schedule,
      setValue: (value: number) => setUser({...user, sleep_schedule: value}),
    },
    {
      label: 'challenges',
      data: challengeOptions,
      value: user?.challenge,
      setValue: (value: number) => setUser({...user, challenge: value}),
    },
    {
      label: 'exercise',
      data: exerciseOptions,
      value: user?.exercise,
      setValue: (value: number) => setUser({...user, exercise: value}),
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    getObject('mode').then(mode => {
      if (mode == 'online') {
        //用户已登录 且为在线模式 从云端获取数据
        getUser().then(user => {
          storeObject('user', user);
          setUser(user);
          setLoading(false);
        });
      } else {
        //用户已登录 但为离线模式 从本地获取数据
        getObject('user').then(user => {
          if (user) {
            setUser(user);
          }
          setLoading(false);
        });
      }
    });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleImagePick = (value: number) => {
    setUser({...user, identity: value});
    setModalVisible(false);
  };

  const handleSave = () => {
    setLoading(true);
    getObject('mode').then(mode => {
      if (mode == 'online') {
        //用户已登录 且为在线模式 上传数据到云端 然后更新本地数据
        updateUser(user).then(newUser => {
          Alert.alert('Success', 'User profile updated successfully');
          storeObject('user', newUser);
          setLoading(false);
        });
      } else {
        //用户已登录 但为离线模式 保存数据到unpushed 然后更新本地数据
        Alert.alert(
          'Offline',
          'You are in offline mode now, your data will be uploaded when you are online again',
        );
        storeObject('user_unpushed', user); //保存未上传的数据
        //更新本地数据
        getObject('user').then(() => {
          storeObject('user', user);
          setLoading(false);
        });
      }
    });
    //更新界面渲染
    //setUser(user);
  };

  const handleLogout = () => {
    setLoading(true);
    getObject('mode').then(mode => {
      if (mode == 'online')
        logout()
          .then(() => {
            removeObject('auth'); //清除登录信息
            removeObject('user'); //清除用户信息
            setLoading(false);
            navigation.replace('Login');
          })
          .catch(err => {
            setLoading(false);
            Alert.alert('Error', err);
          });
      else {
        setLoading(false);
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
    user && (
      <ScrollView
        style={{backgroundColor: 'white', height: '100%'}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }>
        <Loading visible={loading} />
        <View style={styles.container}>
          <Text style={styles.titleText}>My Portrait</Text>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              {user.identity && (
                <Image
                  source={identityAvatars[user.identity - 1]}
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
          <View style={styles.container2}>
            <View style={styles.usernameContainer}>
              <Text style={styles.LabelText}>Email</Text>
              <Text style={styles.emailText}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.usernameContainer}>
              <Text style={styles.LabelText}>Username</Text>
              <TextInput
                value={user?.username}
                onChange={e => setUser({...user, username: e.nativeEvent.text})} //更新用户信息
                style={editing ? styles.editingText : styles.usernameText}
                editable={editing}></TextInput>
            </View>
            <MyButton
              icon={require('../assets/icons/pencil.png')}
              style={styles.avatar}
              onPress={() => setEditing(!editing)}
            />
          </View>
        </View>

        {items.map((item, index) => (
          <View style={styles.inputContainer} key={index}>
            <Text style={styles.inputLabel}>{item.label}</Text>
            <SelectModal
              style={styles.input}
              data={item.data}
              selectedValue={item.value}
              setSelectedValue={item.setValue}
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
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingBottom: 10,
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
    marginVertical: 20,
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
    width: 200,
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
    marginBottom: 15,
    paddingHorizontal: 25,
  },
  inputLabel: {
    fontFamily: 'Nunito, sans-serif',
    fontSize: 12,
    color: '#A8A6A7',
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    padding: 10,
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
  container2: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  usernameContainer: {
    flex: 1,
  },
  LabelText: {
    color: 'rgba(255, 195, 116, 1)',
    fontFamily: 'Inter',
    fontSize: 20,
    fontWeight: 'bold',
  },
  usernameText: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    height: 50,
  },
  editingText: {
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 50,
  },
  emailText: {
    marginTop: 5,
    fontFamily: 'Inter',
    fontSize: 18,
    fontWeight: 'bold',
    height: 50,
    paddingHorizontal: 10,
  },
  avatar: {
    height: 60,
    width: 60,
  },
});

export default ProfileScreen;
