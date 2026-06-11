const crypto = require("crypto");

const BASE_URL = "https://openapi.liblibai.cloud";
const TEXT2IMG_ENDPOINT = "/api/generate/webui/text2img";
const STATUS_ENDPOINT = "/api/generate/webui/status";

function loadEnvFile() {
  const fs = require("fs");
  const path = require("path");
  const envPath = path.join(__dirname, ".env");

  if (!fs.existsSync(envPath)) {
    return;
  }

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#") || !line.includes("=")) {
      continue;
    }

    const index = line.indexOf("=");
    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function randomNonce(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const bytes = crypto.randomBytes(length);

  for (const byte of bytes) {
    result += chars[byte % chars.length];
  }

  return result;
}

function signPath(pathname) {
  const accessKey = process.env.LIBLIB_ACCESS_KEY;
  const secretKey = process.env.LIBLIB_SECRET_KEY;

  if (!accessKey || !secretKey) {
    throw new Error("缺少 LIBLIB_ACCESS_KEY 或 LIBLIB_SECRET_KEY");
  }

  const timestamp = Date.now();
  const signatureNonce = randomNonce();
  const raw = `${pathname}&${timestamp}&${signatureNonce}`;
  const signature = crypto
    .createHmac("sha1", secretKey)
    .update(raw)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return `${pathname}?AccessKey=${encodeURIComponent(accessKey)}&Signature=${encodeURIComponent(signature)}&Timestamp=${timestamp}&SignatureNonce=${signatureNonce}`;
}

async function signedPost(pathname, payload) {
  const url = `${BASE_URL}${signPath(pathname)}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "ip-generator-local"
    },
    body: JSON.stringify(payload)
  });

  const text = await response.text();
  let data = text;

  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    const message = typeof data === "string" ? data : JSON.stringify(data);
    throw new Error(`LibLibAI 接口返回 ${response.status}: ${message}`);
  }

  return data;
}

function getLiblibConfigStatus() {
  const required = {
    LIBLIB_ACCESS_KEY: process.env.LIBLIB_ACCESS_KEY,
    LIBLIB_SECRET_KEY: process.env.LIBLIB_SECRET_KEY,
    LIBLIB_TEMPLATE_UUID: process.env.LIBLIB_TEMPLATE_UUID,
    LIBLIB_CHECKPOINT_ID: process.env.LIBLIB_CHECKPOINT_ID
  };

  return Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

function buildText2ImgPayload(loraPackage) {
  const count = Number(loraPackage.parameters?.count) || 4;
  const height = Number(loraPackage.parameters?.height) || 1536;

  return {
    templateUuid: process.env.LIBLIB_TEMPLATE_UUID,
    generateParams: {
      checkPointId: process.env.LIBLIB_CHECKPOINT_ID,
      prompt: loraPackage.positivePrompt,
      negativePrompt: loraPackage.negativePrompt,
      sampler: Number(process.env.LIBLIB_SAMPLER || 15),
      steps: Number(loraPackage.parameters?.steps) || 60,
      cfgScale: Number(process.env.LIBLIB_CFG_SCALE || 7),
      width: Number(process.env.LIBLIB_WIDTH || height),
      height,
      imgCount: count,
      randnSource: 0,
      seed: -1,
      restoreFaces: 0,
      additionalNetwork: [
        {
          modelId: loraPackage.versionUuid,
          weight: Number(loraPackage.weight) || 0.8
        }
      ]
    }
  };
}

async function submitLoraText2Img(loraPackage) {
  const missing = getLiblibConfigStatus();

  if (missing.length) {
    return {
      ok: false,
      missingConfig: missing,
      message: "LibLibAI 鉴权已接入，但还缺少文生图模板或底模版本配置。",
      requestPreview: buildText2ImgPayload({
        ...loraPackage,
        versionUuid: loraPackage.versionUuid || "<LORA_VERSION_UUID>"
      })
    };
  }

  const request = buildText2ImgPayload(loraPackage);
  const submitResult = await signedPost(TEXT2IMG_ENDPOINT, request);
  const generateUuid = submitResult?.data?.generateUuid;

  if (!generateUuid) {
    return {
      ok: true,
      submitted: true,
      request,
      submitResult
    };
  }

  return {
    ok: true,
    submitted: true,
    generateUuid,
    request,
    submitResult
  };
}

async function getGenerationStatus(generateUuid) {
  return signedPost(STATUS_ENDPOINT, { generateUuid });
}

loadEnvFile();

module.exports = {
  getLiblibConfigStatus,
  submitLoraText2Img,
  getGenerationStatus
};
