import {BASEURL, Delete, post, put} from './requestService';
const PREFIX = `${BASEURL}/api/subtask`;

//修改子任务完成状态 sid是子任务的id
export const changeSubtaskDone = async sid => {
  const url = `${PREFIX}/changeDone/${sid}`;
  let result;
  try {
    result = await put(url);
    return result;
  } catch (e) {
    console.log(e);
    alert(e);
  }
};
// 删除某个id的子任务
export const deleteSubtask = async sid => {
  const url = `${PREFIX}/delete/${sid}`;
  let result;
  result = await Delete(url);
  return result;
};
//为某个id的事件添加子任务
export const addsubtaskItem = async (eid, content, deadline) => {
  const url = `${PREFIX}/add/${eid}?content=${content}&deadline=${deadline}`;
  let result;

  result = await post(url);
  return result;
};
