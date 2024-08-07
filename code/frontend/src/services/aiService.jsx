import {AIURL, post} from './requestService';
const PREFIX = `${AIURL}`;
//
export async function getEat(question) {
  const url = `${PREFIX}/restaurants`;
  let opts = {
    method: 'POST',
    body: JSON.stringify({
      question: question,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  let res = await fetch(url, opts);
  return await res.json();
}
