const methods = {
  lora: {
    title: "LoRA 模型生成工具",
    badge: "LoRA",
    linkLabel: "LoRA 模型链接",
    storageKey: "ip-generator-lora-link",
    defaultLink:
      "https://www.liblib.art/modelinfo/d783db56a3e64486a56ab2d5aceb6ec7?from=search&versionUuid=eda03e0cd07b4ccbbbed511dc4d9c9a3",
    outputName: "视觉角色方案",
    strengths: ["固定角色五官与服饰特征", "适合批量出图与风格统一", "可复用在海报、头像、周边场景"]
  },
  gpt: {
    title: "GPT 工作流生成工具",
    badge: "GPT",
    linkLabel: "GPT 工作流链接",
    storageKey: "ip-generator-gpt-link",
    outputName: "角色设定方案",
    strengths: ["补全世界观、性格与口头禅", "生成可继续投喂给绘图模型的提示词", "适合做角色矩阵与内容栏目"]
  },
  lib: {
    title: "Lib 风格模版生成工具",
    badge: "LIB",
    linkLabel: "Lib 风格模版链接",
    storageKey: "ip-generator-lib-link",
    outputName: "模版化风格方案",
    strengths: ["快速套用既有风格结构", "适合多风格横向比较", "便于沉淀团队标准化模版"]
  }
};

let currentMethod = "lora";

const methodCards = document.querySelectorAll(".tool-card");
const selectedMethodTitle = document.querySelector("#selectedMethodTitle");
const methodBadge = document.querySelector("#methodBadge");
const statusPill = document.querySelector("#statusPill");
const linkLabel = document.querySelector("#linkLabel");
const methodLinkInput = document.querySelector("#methodLinkInput");
const saveLinkButton = document.querySelector("#saveLinkButton");
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

function getStoredLink(method) {
  return localStorage.getItem(methods[method].storageKey) || methods[method].defaultLink || "";
}

function setMethod(method) {
  currentMethod = method;
  const config = methods[method];

  methodCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.method === method);
  });

  selectedMethodTitle.textContent = config.title;
  methodBadge.textContent = config.badge;
  linkLabel.textContent = config.linkLabel;
  methodLinkInput.value = getStoredLink(method);
  statusPill.textContent = methodLinkInput.value ? "已配置" : "待配置";
}

function saveCurrentLink() {
  const value = methodLinkInput.value.trim();
  if (value) {
    localStorage.setItem(methods[currentMethod].storageKey, value);
    statusPill.textContent = "已配置";
    return;
  }

  localStorage.removeItem(methods[currentMethod].storageKey);
  statusPill.textContent = "待配置";
}

function buildResult({ prompt, count, methodLink, remoteResult }) {
  const config = methods[currentMethod];
  const safePrompt = prompt || "保留创作空间，由生成方法补全视觉与人设细节";
  const tiles = Array.from({ length: Math.min(Number(count) || 1, 6) }, (_, index) => {
    return `<div class="visual-tile">${config.badge}-${index + 1}</div>`;
  }).join("");

  const strengths = config.strengths.map((item) => `<li>${item}</li>`).join("");
  const linkText = getLinkStatusText(methodLink, remoteResult);
  const remoteText = remoteResult?.ok ? formatRemoteResult(remoteResult.data) : "";

  return `
    <div class="result-visuals">${tiles}</div>
    <div class="result-copy">
      <h3>${config.outputName}</h3>
      <p>风格关键词：${safePrompt}。</p>
      <p>输出数量：${Number(count) || 1}</p>
      ${linkText}
      ${remoteText}
      <ul>${strengths}</ul>
    </div>
  `;
}

function getLinkStatusText(methodLink, remoteResult) {
  if (!methodLink) {
    return "<p>调用入口：尚未配置真实链接，当前为本地预览结果。</p>";
  }

  if (remoteResult?.ok) {
    return `<p>调用入口：<strong>${methodLink}</strong>，已完成接口调用。</p>`;
  }

  if (remoteResult?.error) {
    return `<p>调用入口：<strong>${methodLink}</strong>。调用失败：${remoteResult.error}</p>`;
  }

  return `<p>调用入口：<strong>${methodLink}</strong>，当前为本地预览结果。</p>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatRemoteResult(data) {
  if (data?.type === "doudou-ip-skin-skill" && data.plan) {
    const imageGallery = formatImageGallery(data.openaiImage?.images);

    if (imageGallery) {
      return imageGallery;
    }

    return `
      <div class="skin-result">
        <h4>${escapeHtml(data.plan.title)}</h4>
        <p>${escapeHtml(data.plan.direction)}</p>
        <div class="skin-meta">
          <span>${escapeHtml(data.plan.creativeSpace)}</span>
          <span>${escapeHtml(data.plan.palette)}</span>
          <span>${escapeHtml(data.count)} 组方向</span>
        </div>
        <div class="skin-section">
          <b>可编辑区域</b>
          <p>${escapeHtml(data.plan.editableAreas.join("、"))}</p>
        </div>
        <div class="skin-section">
          <b>生成提示词</b>
          <p>${escapeHtml(data.plan.positivePrompt)}</p>
        </div>
        <div class="skin-section">
          <b>负向提示词</b>
          <p>${escapeHtml(data.plan.negativePrompt)}</p>
        </div>
      </div>
    `;
  }

  if (data?.type === "liblib-style-skill" && data.promptPackage) {
    return `
      <div class="remote-result">
        <h4>Lib 风格包已生成</h4>
        <p>${escapeHtml(data.message)}</p>
        <dl>
          <dt>模型 UUID</dt>
          <dd>${escapeHtml(data.model?.modelUuid || "-")}</dd>
          <dt>版本 UUID</dt>
          <dd>${escapeHtml(data.model?.versionUuid || "-")}</dd>
          <dt>正向提示词</dt>
          <dd>${escapeHtml(data.promptPackage.positivePrompt)}</dd>
          <dt>负向提示词</dt>
          <dd>${escapeHtml(data.promptPackage.negativePrompt)}</dd>
        </dl>
      </div>
    `;
  }

  if (data?.type === "liblib-lora-skill" && data.loraPackage) {
    const images = data.liblibApi?.status?.images;
    const imageGallery = formatImageGallery(images);

    if (imageGallery) {
      return imageGallery;
    }

    return `
      <div class="remote-result">
        <h4>正在生成图片</h4>
        <p>${escapeHtml(formatLoraApiStatus(data.liblibApi))}</p>
      </div>
    `;
  }

  const output = typeof data === "string" ? data : JSON.stringify(data);
  return `<p>接口返回：${escapeHtml(output).slice(0, 800)}</p>`;
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

function formatImageGallery(images) {
  if (!Array.isArray(images) || images.length === 0) {
    return "";
  }

  const imageItems = images
    .map((image, index) => {
      return `
        <figure class="generated-image">
          <img src="${escapeHtml(image.imageUrl)}" alt="兜兜 LoRA 生成图 ${index + 1}" />
        </figure>
      `;
    })
    .join("");

  return `<div class="generated-gallery">${imageItems}</div>`;
}

async function pollLiblibStatus(generateUuid) {
  const startedAt = Date.now();
  const timeoutMs = 1000 * 60 * 6;

  while (Date.now() - startedAt < timeoutMs) {
    const response = await fetch(apiUrl("/api/liblib/status"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
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
  if (!payload.methodLink && currentMethod !== "gpt") {
    return null;
  }

  if (window.location.protocol === "file:") {
    return {
      ok: false,
      error: "当前是 file:// 打开页面，无法使用后端代理；请用 node server.js 启动后访问 http://localhost:4173"
    };
  }

  try {
    const response = await fetch(apiUrl("/api/generate"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: currentMethod,
        url: payload.methodLink,
        input: {
          prompt: payload.prompt,
          count: Number(payload.count) || 1
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        error: data.error || `接口返回 ${response.status}`
      };
    }

    return {
      ok: true,
      data
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message
    };
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

saveLinkButton.addEventListener("click", saveCurrentLink);

methodLinkInput.addEventListener("change", saveCurrentLink);

generatorForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  saveCurrentLink();

  const formData = new FormData(generatorForm);
  const payload = {
    prompt: (formData.get("prompt") || "").trim(),
    count: formData.get("count"),
    methodLink: (formData.get("methodLink") || "").trim()
  };

  resultContent.innerHTML = `
    <div class="result-copy">
      <h3>正在调用 ${methods[currentMethod].title}</h3>
      <p>如果链接是可调用 API，将通过本地代理发送生成请求；如果只是网页链接，会返回调用失败提示。</p>
    </div>
  `;
  resultEmpty.classList.add("hidden");
  resultContent.classList.remove("hidden");

  const remoteResult = await callGenerator(payload);

  if (remoteResult?.ok && remoteResult.data?.liblibApi?.generateUuid) {
    resultContent.innerHTML = buildResult({
      ...payload,
      remoteResult: {
        ok: true,
        data: {
          ...remoteResult.data,
          liblibApi: {
            ...remoteResult.data.liblibApi,
            status: {
              generateUuid: remoteResult.data.liblibApi.generateUuid,
              generateStatus: 2,
              percentCompleted: 0
            }
          }
        }
      }
    });

    const status = await pollLiblibStatus(remoteResult.data.liblibApi.generateUuid);
    remoteResult.data.liblibApi.status = status;
  }

  resultContent.innerHTML = buildResult({
    ...payload,
    remoteResult
  });
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
