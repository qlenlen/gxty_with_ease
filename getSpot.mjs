import { getTs, getUUID, decrypt, buildSignDataBody } from "./util.mjs";
import { apiConfig, spotRequestConfig as cfg } from "./config.mjs";

function getBody() {
  return {
    ibeacons: `[{"uuid":"${cfg.uuid}","major":"${cfg.major}","minor":"${cfg.minor}"}]`,
    isBreakPoint: "0",
    nonce: getUUID().toLowerCase(),
    ts: getTs(),
    type: "2",
  };
}

export async function getSpot(headers) {
  const body = getBody();
  const resp = await fetch(apiConfig.spotApi, {
    method: "POST",
    headers: headers,
    body: buildSignDataBody(body),
  });
  const { data } = await resp.json();
  return { encryptStr: data, decryptJson: decrypt(data) };
}
