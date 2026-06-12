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

async function generateGptImage({ prompt, count }) {
  const missing = getOpenAIConfigStatus();

  if (missing.length) {
    return {
      ok: false,
      missingConfig: missing,
      message: "缺少 OpenAI 图像生成鉴权配置。"
    };
  }

  const model = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
  const size = process.env.OPENAI_IMAGE_SIZE || "1024x1024";
  const imageCount = Math.max(1, Math.min(Number(count) || 1, Number(process.env.OPENAI_IMAGE_MAX_COUNT || 4)));
  const response = await fetch(`${process.env.OPENAI_BASE_URL || "https://api.openai.com/v1"}/images/generations`, {
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

    return {
      imageUrl: `data:image/png;base64,${item.b64_json}`
    };
  });

  return {
    ok: true,
    model,
    size,
    images,
    raw: data
  };
}

loadEnvFile();

module.exports = {
  generateGptImage
};
