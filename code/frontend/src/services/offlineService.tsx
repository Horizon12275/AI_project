//离线调用asyncStorage存储的接口
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser, portraitUpload} from './userService';
import {pushUnpushedEvents} from './eventService';
import { Alert } from 'react-native';

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
  Promise.all([getObject('user_unpushed'), getObject('events_unpushed')]).then(
    ([user_unpushed, events_unpushed]) => {
      // 用户修改的画像数据
      if (user_unpushed) {
        portraitUpload(user_unpushed).then(user => {
          console.log('user:', user);
          storeObject('user', user);
          removeObject('user_unpushed');
        });
      } else {
        getUser().then(user => {
          console.log('user:', user);
          storeObject('user', user);
        });
      }
      // 用户修改的日程数据
      events_unpushed.map((event: any) => {
        if (isNaN(parseInt(event.id))) {
          event.id = null; //id为null代表新增 为数字代表修改
        }
      });
      pushUnpushedEvents(events_unpushed).then(events => {
        console.log('events:', events);
        storeObject('events', events);
        storeObject('events_unpushed', []);
      }).catch(e => {
        Alert.alert('Error', e);
      });
    },
  );
}

export async function clearAllUnpushed() {
  removeObject('user_unpushed');
  storeObject('events_unpushed', []);
}
//生成10位随机id 不包含数字 作为离线数据的id
export function generateId() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < 10; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}
