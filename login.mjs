/*
本模块负责登录的核心逻辑
调用login函数来获取登录后的utoken
*/

import {
  buildSignDataBody,
  decrypt,
  getRandomString,
  getTs,
  getUUID,
} from "./util.mjs";

import { apiConfig } from "./config.mjs";

function getLoginForm(mobile, pwd, headers) {
  /*
   * aaid oaid vaid 来自 java 原生api，看作是设备标识码
   * info uuid(大写)
   * mobile password 字面意思
   * nonce uuid(小写)
   * ts 时间戳
   * type 手机型号
   */
  return {
    aaid: getRandomString(),
    info: headers.uuid,
    mobile: mobile,
    nonce: getUUID().toLowerCase(),
    oaid: getRandomString(),
    password: pwd,
    ts: getTs(),
    type: "HUAWEI",
    vaid: getRandomString(),
  };
}

export async function login(mobile, pwd, headers) {
  const loginForm = getLoginForm(mobile, pwd, headers);
  const resp = await fetch(apiConfig.loginApi, {
    method: "POST",
    headers: headers,
    body: buildSignDataBody(loginForm),
  });
  const { data } = await resp.json();
  return { encryptStr: data, decryptJson: decrypt(data) };
}
