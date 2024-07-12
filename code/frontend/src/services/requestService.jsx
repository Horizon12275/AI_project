export async function handleResponse(res) {
  if (res.code === 200) {
    return res.data;
  } else {
    throw res.message;
  }
}

export async function get(url) {
  let opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}

export async function post(url, data) {
  let opts = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}
export async function postText(url, data) {
  let opts = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "text/plain",
    },
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}
export async function postUrlencoded(url, data) {
  let formData = new URLSearchParams();
  for (let key in data) {
    formData.append(key, data[key]);
  }
  let opts = {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}
export async function postFormData(url, formData) {
  //千万不能手动设置Content-Type 浏览器会自动根据formData设置并且生成webkitboundary 如果手动设置会导致boundary不匹配
  let opts = {
    method: "POST",
    body: formData,
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}

export async function Delete(url) {
  let opts = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}

export async function put(url, data) {
  let opts = {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };
  let res = await fetch(url, opts);
  return await res.json().then(handleResponse);
}

// On Local Settings Below
// export const WSURL = "ws://localhost:8080/ws";
// export const BASEURL = "http://localhost:8080";
// export const PEERURL = "localhost";

// On Sever Settings Below
export const WSURL = "wss://localhost:8080/ws";
export const BASEURL = "http://192.168.233.1:8080";
export const PEERURL = "localhost";

export const PREFIX = `${BASEURL}/api`;
//export const API_DOCS_URL = `${BASEURL}/api-docs`;
export const DUMMY_RESPONSE = {
  ok: false,
  message: "网络错误！",
};
