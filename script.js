const methods = {
  lora: {
    title: "LoRA 模型生成工具",
    badge: "LoRA",
    defaultLink: "https://www.liblib.art/modelinfo/d783db56a3e64486a56ab2d5aceb6ec7?from=search&versionUuid=eda03e0cd07b4ccbbbed511dc4d9c9a3"
  },
  gpt: {
    title: "GPT 工作流生成工具",
    badge: "GPT",
    defaultLink: ""
  },
  lib: {
    title: "Lib 风格模版生成工具",
    badge: "LIB",
    defaultLink: ""
  }
};

let currentMethod = "lora";

const methodCards = document.querySelectorAll(".tool-card");
const selectedMethodTitle = document.querySelector("#selectedMethodTitle");
const methodBadge = document.querySelector("#methodBadge");
const generatorForm = document.querySelector("#generatorForm");
const resetButton = document.querySelector("#resetButton");
const resultEmpty = document.querySelector("#resultEmpty");
const resultContent = document.querySelector("#resultContent");

function getApiBaseUrl() {
  return (window.IP_TOOL_API_BASE_URL || "").replace(/\/+$/, "");
}

function apiUrl(path) {
  return `${getApiBaseUrl()}${path}`;
}

function setMethod(method) {
  currentMethod = method;
  const config = methods[method];

  methodCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.method === method);
  });

  selectedMethodTitle.textContent = config.title;
  methodBadge.textContent = config.badge;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildResult({ count, remoteResult }) {
  // 成功有图：直接展示
  if (remoteResult?.ok) {
    const remoteText = formatRemoteResult(remoteResult.data);
    if (remoteText) {
      return `<div class="result-visuals">${remoteText}</div>`;
    }
  }
  // 失败：展示错误
  if (remoteResult?.error) {
    return `<div class="result-visuals result-error">
      <p>⚠ ${escapeHtml(remoteResult.error)}</p>
    </div>`;
  }
  // 占位（点击生成前）
  const config = methods[currentMethod];
  const tiles = Array.from({ length: Math.min(Number(count) || 1, 6) }, (_, index) => {
    return `<div class="visual-tile">${config.badge}-${index + 1}</div>`;
  }).join("");
  return `<div class="result-visuals">${tiles}</div>`;
}

function formatImageGallery(images) {
  if (!Array.isArray(images) || images.length === 0) {
    return "";
  }
  const imageItems = images
    .map((image, index) => {
      return `
        <figure class="generated-image">
          <img src="${escapeHtml(image.imageUrl)}" alt="生成图 ${index + 1}" />
        </figure>
      `;
    })
    .join("");
  return `<div class="generated-gallery">${imageItems}</div>`;
}

function formatRemoteResult(data) {
  // 优先展示图
  const gallery = formatImageGallery(data?.openaiImage?.images);
  if (gallery) {
    return gallery;
  }
  // LoRA 还在轮询：显示 status
  if (data?.liblibApi?.status) {
    return `<div class="result-loading">
      <p>${escapeHtml(formatLoraApiStatus(data.liblibApi))}</p>
    </div>`;
  }
  return "";
}

function formatLoraApiStatus(liblibApi) {
  if (!liblibApi) {
    return "已生成本地参数包，尚未调用 LibLibAI。";
  }
  if (liblibApi.generateUuid) {
    const status = liblibApi.status;
    if (status?.generateStatus === 5) {
      return `已完成，generateUuid: ${liblibApi.generateUuid}`;
    }
    if (status?.generateStatus === 6) {
      return `生成失败，generateUuid: ${liblibApi.generateUuid}`;
    }
    if (status?.generateStatus === 7) {
      return `生成超时，generateUuid: ${liblibApi.generateUuid}`;
    }
    const percent = status?.percentCompleted ? `，进度 ${Math.round(status.percentCompleted * 100)}%` : "";
    return `已提交 LibLibAI 任务，generateUuid: ${liblibApi.generateUuid}${percent}`;
  }
  if (liblibApi.missingConfig?.length) {
    return `已接入 AccessKey/SecretKey，还缺少配置：${liblibApi.missingConfig.join(", ")}`;
  }
  if (liblibApi.ok) {
    return "已提交 LibLibAI，请查看接口返回。";
  }
  return liblibApi.message || "LibLibAI 调用未完成。";
}

async function pollLiblibStatus(generateUuid) {
  const startedAt = Date.now();
  const timeoutMs = 1000 * 60 * 6;
  while (Date.now() - startedAt < timeoutMs) {
    const response = await fetch(apiUrl("/api/liblib/status"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ generateUuid })
    });
    const data = await response.json();
    const status = data.data || data;
    if ([5, 6, 7].includes(status.generateStatus)) {
      return status;
    }
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
  return {
    generateUuid,
    generateStatus: 7,
    generateMsg: "本地轮询超时，任务可能仍在 LibLibAI 后台运行。"
  };
}

async function callGenerator(payload) {
  if (window.location.protocol === "file:") {
    return {
      ok: false,
      error: "当前是 file:// 打开页面，无法使用后端代理；请用 node server.js 启动后访问 http://localhost:4173"
    };
  }

  const methodLink = methods[currentMethod].defaultLink;

  try {
    const response = await fetch(apiUrl("/api/generate"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: currentMethod,
        url: methodLink,
        input: {
          prompt: payload.prompt,
          count: Number(payload.count) || 1,
          size: "1024x1024"
        }
      })
    });
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, error: data.error || `接口返回 ${response.status}` };
    }
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error.message };
  }
}

methodCards.forEach((card) => {
  card.addEventListener("click", () => setMethod(card.dataset.method));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMethod(card.dataset.method);
    }
  });
});

generatorForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(generatorForm);
  const payload = {
    prompt: (formData.get("prompt") || "").trim(),
    count: formData.get("count")
  };

  // loading 状态
  resultContent.innerHTML = `<div class="result-visuals result-loading">
    <div class="result-loading-spinner"></div>
    <p>正在生成中…</p>
  </div>`;
  resultEmpty.classList.add("hidden");
  resultContent.classList.remove("hidden");

  const remoteResult = await callGenerator(payload);

  // LoRA 流程需要轮询
  if (remoteResult?.ok && remoteResult.data?.liblibApi?.generateUuid) {
    remoteResult.data.liblibApi.status = {
      generateUuid: remoteResult.data.liblibApi.generateUuid,
      generateStatus: 2,
      percentCompleted: 0
    };
    resultContent.innerHTML = buildResult({ ...payload, remoteResult });

    const status = await pollLiblibStatus(remoteResult.data.liblibApi.generateUuid);
    remoteResult.data.liblibApi.status = status;
  }

  resultContent.innerHTML = buildResult({ ...payload, remoteResult });
  resultEmpty.classList.add("hidden");
  resultContent.classList.remove("hidden");
});

resetButton.addEventListener("click", () => {
  generatorForm.reset();
  setMethod("lora");
  resultContent.innerHTML = "";
  resultContent.classList.add("hidden");
  resultEmpty.classList.remove("hidden");
});

setMethod(currentMethod);
