import { BASEURL, USERPORT, get, post, put } from "./requestService";
const PREFIX = `${BASEURL}:${USERPORT}/api/user`;

export async function getUser() {
  const url = `${PREFIX}/get`;
  let result;
  result = await get(url);
  return result;
}

export async function portraitUpload(portrait) {
  const url = `${PREFIX}/portrait`;
  let result;
  result = await post(url, portrait);
  return result;
}