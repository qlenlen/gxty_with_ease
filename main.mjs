import { headersConfig } from "./config.mjs";
import { login } from "./login.mjs";
import { getSpot } from "./getSpot.mjs";

let headers = headersConfig.base;

async function main() {
  const loginRes = await login("yours_mobile", "yours_pwd", headers);
  console.log(loginRes);
  headers.utoken = loginRes.decryptJson.utoken;
  const spotRes = await getSpot(headers);
  console.log(spotRes);
  console.log(spotRes.decryptJson[0]["beacon"]);
}

main().then((r) => {});
