import { getUUID, joinUrl } from "./util.mjs";
import CryptoJS from "crypto-js";

// url配置项
const apiConfig = {
  loginApi: joinUrl("/api/reg/login?ltype=1"),
  spotApi: joinUrl("/api/association/dataListByDevice/70"),
  signApi: joinUrl("/api/association/sign"),
  checkTimesApi: joinUrl("/api/association/checkTimes"),
};

// 请求头配置项
let headersConfig = {
  // 基础请求头，utoken信息为空
  base: {
    Host: "www.sportcampus.cn",
    "user-agent": "okhttp-okgo/jeasonlzy",
    "x-channel": "",
    e206b53e98e9ecc295427aa5e1a4c18b: "0,0,0,0,0,0",
    utoken: "",
    packagename: "com.example.gita.gxty",
    xxversionxx: "20180601",
    versionname: "2.9.5",
    versioncode: "505",
    uuid: getUUID(),
    platform: "android",
    "content-type": "application/x-www-form-urlencoded",
  },
};

// 加密配置项
const cipherConfig = {
  key: CryptoJS.enc.Utf8.parse("nO5Mm4zggvrbYyIJ"),
  iv: CryptoJS.enc.Utf8.parse("1111111111111111"),
  md5salt: "nO5Mm4zggvrbYyIJ0zbnKkq2sdb~4KscsiscARpddata",
};

// 签到设备请求配置项
const spotRequestConfig = {
  uuid: "fda50693-a4e2-4fb1-afcf-c6eb07647825",
  major: "10090",
  minor: "57628",
};

export { apiConfig, cipherConfig, headersConfig, spotRequestConfig };
