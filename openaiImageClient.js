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

function getOpenAIConfigStatus() {
  const required = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
  };

  return Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);
}

function pickSize() {
  // gpt-image-2 支持更灵活的尺寸；用 1024x1024 是稳定的选择
  return process.env.OPENAI_IMAGE_SIZE || "1024x1024";
}

function getImageCount(count) {
  return Math.max(1, Math.min(Number(count) || 1, Number(process.env.OPENAI_IMAGE_MAX_COUNT || 4)));
}

function getModel() {
  return process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
}

function getBaseUrl() {
  return process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
}

// 方式一：纯文生图（兜底用，不推荐用于 Doudou）
async function generateGptImage({ prompt, count }) {
  const missing = getOpenAIConfigStatus();
  if (missing.length) {
    return {
      ok: false,
      missingConfig: missing,
      message: "缺少 OpenAI 图像生成鉴权配置。"
    };
  }

  const model = getModel();
  const size = pickSize();
  const imageCount = getImageCount(count);
  const response = await fetch(`${getBaseUrl()}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      n: imageCount
    })
  });

  const data = await response.json();
  if (!response.ok) {
    return {
      ok: false,
      message: data.error?.message || `OpenAI 图像接口返回 ${response.status}`,
      raw: data
    };
  }

  const images = (data.data || []).map((item) => {
    if (item.url) {
      return { imageUrl: item.url };
    }
    return { imageUrl: `data:image/png;base64,${item.b64_json}` };
  });

  return { ok: true, mode: "text2img", model, size, images, raw: data };
}

// 方式二：图生图（推荐用于 Doudou，用源图做 image edit，保留 IP 身份）
async function generateGptImageEdit({ prompt, sourceImageBase64, size, count }) {
  const missing = getOpenAIConfigStatus();
  if (missing.length) {
    return {
      ok: false,
      missingConfig: missing,
      message: "缺少 OpenAI 图像生成鉴权配置。"
    };
  }
  if (!sourceImageBase64) {
    return {
      ok: false,
      message: "缺少源图（sourceImageBase64），无法执行 image edit。请先调用 generateIpSkin() 选源图。"
    };
  }

  const model = getModel();
  const imageSize = size || pickSize();
  // image edit 端点一次只支持 1 张输出；如果要 4 张，调用方需要循环调用
  const n = 1;

  // 构造 multipart/form-data
  const FormDataNode = require("form-data");
  const form = new FormDataNode();
  form.append("model", model);
  form.append("prompt", prompt);
  form.append("size", imageSize);
  form.append("n", String(n));
  // image[] 是 OpenAI image edit 端点的字段
  form.append("image[]", Buffer.from(sourceImageBase64, "base64"), {
    filename: "source.png",
    contentType: "image/png"
  });

  const response = await fetch(`${getBaseUrl()}/images/edits`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      ...form.getHeaders()
    },
    body: form.getBuffer()
  });

  const data = await response.json();
  if (!response.ok) {
    return {
      ok: false,
      message: data.error?.message || `OpenAI image edit 接口返回 ${response.status}`,
      raw: data
    };
  }

  const images = (data.data || []).map((item) => {
    if (item.url) {
      return { imageUrl: item.url };
    }
    return { imageUrl: `data:image/png;base64,${item.b64_json}` };
  });

  return { ok: true, mode: "image_edit", model, size: imageSize, images, raw: data };
}

loadEnvFile();

module.exports = {
  generateGptImage,
  generateGptImageEdit
};
