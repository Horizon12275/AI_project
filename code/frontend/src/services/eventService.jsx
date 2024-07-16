import {BASEURL, Delete, USERPORT, get, post, put} from './requestService';
const PREFIX = `${BASEURL}:${USERPORT}/api/event`;
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
  const url = `${PREFIX}/add`;
  let result;

  result = await post(url, event);
  return result;
}


