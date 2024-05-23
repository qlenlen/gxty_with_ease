import CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { cipherConfig } from "./config.mjs";

// 传入一串base64密文，返回解密后的json对象
function decrypt(t) {
  return JSON.parse(
    CryptoJS.AES.decrypt(t, cipherConfig.key, {
      iv: cipherConfig.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8)
  );
}

// 传入一个json对象，返回加密后的base64密文
function encrypt(t) {
  const n = CryptoJS.enc.Utf8.parse(JSON.stringify(t)),
    u = CryptoJS.AES.encrypt(n, cipherConfig.key, {
      iv: cipherConfig.iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
  return u.ciphertext.toString(CryptoJS.enc.Base64);
}

// 返回一个大写的uuid，去除中间的横杠
function getUUID() {
  return uuidv4().replace(/-/g, "").toUpperCase();
}

// 使用两个小写的uuid拼接，模拟ooid等信息
function getRandomString() {
  return getUUID().toLowerCase() + getUUID().toLowerCase();
}

// 传入一个json对象，返回签名（发送请求时的必须）
function getSign(form) {
  return CryptoJS.MD5(
    `${cipherConfig.md5salt}${JSON.stringify(form)}`
  ).toString();
}

// 获取时间戳
function getTs() {
  return new Date().getTime();
}

// 拼接路径，返回完整url
function joinUrl(path) {
  return `https://www.sportcampus.cn${path}`;
}

// 传入请求体的json对象
function buildSignDataBody(form) {
  return `sign=${getSign(form)}&data=${encodeURIComponent(encrypt(form))}`;
}

export {
  getSign,
  getRandomString,
  getUUID,
  getTs,
  decrypt,
  encrypt,
  joinUrl,
  buildSignDataBody,
};
