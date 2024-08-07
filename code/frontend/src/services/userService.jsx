import {BASEURL, get, post} from './requestService';
const PREFIX = `${BASEURL}/api/user`;

export async function getUser() {
  const url = `${PREFIX}/get`;
  let result;
  result = await get(url);
  return result;
}

export async function updateUser(user) {
  const url = `${PREFIX}/update`;
  let result;
  result = await post(url, user);
  return result;
}
