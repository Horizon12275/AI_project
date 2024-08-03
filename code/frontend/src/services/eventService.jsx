import {BASEURL, Delete, get, post} from './requestService';
const PREFIX = `${BASEURL}/api/event`;
//获取登录用户某一天的所有事件
export const getAllEvents = async date => {
  const url = `${PREFIX}/getEvents?date=${date}`;
  let result;

  result = await get(url);
  return result;
};
//获取登录用户某一个月的所有事件数目 数组形式 第一个数代表1号有多少事件
export const getEventNums = async (year, month) => {
  const url = `${PREFIX}/getNums?year=${year}&month=${month}`;
  let result;

  result = await get(url);
  return result;
};
//为当前登录用户添加事件 body是json格式
export async function addEvent(event) {
  const url = `${PREFIX}/add_online`;
  let result;
  result = await post(url, event);
  return result;
}
//获取当前登录用户各个类别的事件的时间占比 返回一个数组
export async function getSummary(startDate, endDate) {
  const url = `${PREFIX}/summary?start=${startDate}&end=${endDate}`;
  let result;

  result = await get(url);
  return result;
}
//更新某个id的事件
export async function updateEvent(event) {
  const url = `${PREFIX}/update/${event.id}`;
  let result;
  result = await post(url, event);
  return result;
}
//删除某个id的事件
export async function deleteEvent(id) {
  const url = `${PREFIX}/delete/${id}`;
  let result;
  result = await Delete(url);
  return result;
}
//
export async function pushUnpushedEvents(events) {
  const url = `${PREFIX}/pushAll`;
  let result;
  result = await post(url, events);
  return result;
}
