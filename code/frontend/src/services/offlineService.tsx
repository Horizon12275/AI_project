//离线调用asyncStorage存储的接口
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser, portraitUpload} from './userService';
import {pushUnpushedEvents} from './eventService';
import {Alert} from 'react-native';

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
          console.log(user_unpushed);
          storeObject('user', user);
          removeObject('user_unpushed');
        });
      } else {
        getUser().then(user => {
          storeObject('user', user);
        });
      }

      // 用户修改的日程数据 先用map维护每一个event的最新状态
      let map = new Map<string, any>();
      events_unpushed.map((event: any) => {
        console.log(event);
        if (isNaN(event.id) && event.title == null) {
          map.delete(event.id);
          return;
        } //特判 新增了一个event后又删除了
        map.set(event.id, event); //维护最新状态
      });
      events_unpushed = Array.from(map.values()); //转换为数组
      //再把非数字的id转换为null 方便后端判断是新建还是修改
      events_unpushed.map((event: any) => {
        if (isNaN(event.id)) {
          event.id = null;
        }
      });

      console.log(events_unpushed);
      pushUnpushedEvents(events_unpushed)
        .then(events => {
          storeObject('events', events);
          storeObject('events_unpushed', []);
        })
        .catch(e => {
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
//获取所有日程 对应了服务器的getAllEvents接口
export async function getAllEventsOffline(date: string) {
  let events = await getObject('events');

  if (events == null) return [];
  return events.filter((event: any) => event.ddl == date);
}
//获取某一天的日程数量 对应了服务器的getEventNums接口
export async function getEventNumsOffline(year: number, month: number) {
  let events = await getObject('events');
  let eventNums = Array(31).fill(0);
  if (events == null) return eventNums;
  events.forEach((event: any) => {
    if (event.ddl == undefined) return;
    const [y, m, d] = event.ddl.split('-');
    if (parseInt(y) === year && parseInt(m) === month) {
      eventNums[parseInt(d) - 1]++;
    }
  });
  return eventNums;
}
