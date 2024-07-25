//离线调用asyncStorage存储的接口
import AsyncStorage from '@react-native-async-storage/async-storage';
import {portraitUpload} from './userService';

export async function storeObject(key: string, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getObject(key: string) {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export async function removeObject(key: string) {
  await AsyncStorage.removeItem(key);
}
//推送所有未推送的数据
export async function pushAll() {
  Promise.all([getObject('user_unpushed')]).then(([user_unpushed]) => {
    // 用户修改的画像数据
    if (user_unpushed) {
      portraitUpload(user_unpushed).then(user => {
        storeObject('user', user);
        removeObject('user_unpushed');
      });
    }
    // 用户修改的日程数据
  });
}

export async function clearAllUnpushed() {
  removeObject('user_unpushed');
}