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
      const safeUrl = escapeHtml(image.imageUrl);
      const downloadName = `doudou-skin-${Date.now()}-${index + 1}.png`;
      const safeDownload = escapeHtml(downloadName);
      return `
        <figure class="generated-image">
          <button class="image-frame" type="button" data-lightbox-open="${safeUrl}" data-download-name="${safeDownload}" aria-label="放大查看 生成图 ${index + 1}">
            <img src="${safeUrl}" alt="生成图 ${index + 1}" />
            <span class="image-actions" aria-hidden="true">
              <span class="image-action" data-action="zoom">⤢ 放大</span>
              <span class="image-action" data-action="download">⬇ 下载</span>
            </span>
          </button>
        </figure>
      `;
    })
    .join("");
  return `<div class="generated-gallery">${imageItems}</div>`;
}

function setupLightbox() {
  // 事件委托到 resultContent，HTML 重新渲染后无需重绑
  if (resultContent.dataset.lightboxBound === "1") {
    return;
  }
  resultContent.dataset.lightboxBound = "1";
  resultContent.addEventListener("click", (event) => {
    const frame = event.target.closest(".image-frame");
    if (!frame) {
      return;
    }
    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "download") {
      event.preventDefault();
      event.stopPropagation();
      triggerDownload(frame.dataset.lightboxOpen, frame.dataset.downloadName);
      return;
    }
    openLightbox(frame.dataset.lightboxOpen, frame.dataset.downloadName);
  });
}

function openLightbox(url, downloadName) {
  if (!url) {
    return;
  }
  const lightbox = document.querySelector("#imageLightbox");
  const lightboxImage = document.querySelector("#lightboxImage");
  const lightboxDownload = document.querySelector("#lightboxDownload");
  if (!lightbox || !lightboxImage || !lightboxDownload) {
    return;
  }
  lightboxImage.src = url;
  lightboxImage.alt = downloadName ? `预览 ${downloadName}` : "生成图预览";
  // 用闭包暂存当前 url/下载名，避免 lightbox 内状态污染
  lightboxDownload.onclick = () => triggerDownload(url, downloadName);
  lightbox.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.querySelector("#imageLightbox");
  if (!lightbox) {
    return;
  }
  lightbox.classList.add("hidden");
  document.body.style.overflow = "";
  const lightboxImage = document.querySelector("#lightboxImage");
  if (lightboxImage) {
    lightboxImage.src = "";
  }
}

function triggerDownload(url, downloadName) {
  if (!url) {
    return;
  }
  // data URL 浏览器原生支持 <a download>，直接用最稳
  if (url.startsWith("data:")) {
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadName || "doudou-skin.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
    return;
  }
  // https URL：优先尝试 fetch + blob（避免被浏览器当页面打开），失败再降级
  fetch(url)
    .then((response) => (response.ok ? response.blob() : Promise.reject(new Error("fetch failed"))))
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = downloadName || "doudou-skin.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    })
    .catch(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = downloadName || "doudou-skin.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
}

function formatRemoteResult(data) {
  // 优先展示图：OpenAI image edit / generations
  const openaiGallery = formatImageGallery(data?.openaiImage?.images);
  if (openaiGallery) {
    return openaiGallery;
  }
  // 其次展示 LoRA 完成后的图（LibLibAI status.images）
  const loraGallery = formatImageGallery(data?.liblibApi?.status?.images);
  if (loraGallery) {
    return loraGallery;
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
      // status=5 通常会附带 images；上层 formatRemoteResult 会优先渲染图，这里只是兜底
      if (Array.isArray(status.images) && status.images.length > 0) {
        return `已完成 ${status.images.length} 张`;
      }
      return `已完成，generateUuid: ${liblibApi.generateUuid}（未返回图，请检查 LibLibAI 配额）`;
    }
    if (status?.generateStatus === 6) {
      return `生成失败：${status.generateMsg || "请稍后重试"}`;
    }
    if (status?.generateStatus === 7) {
      return `生成超时：${status.generateMsg || "请稍后重试"}`;
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

// lightbox 关闭交互
document.querySelectorAll("[data-lightbox-close]").forEach((node) => {
  node.addEventListener("click", closeLightbox);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

setupLightbox();
setMethod(currentMethod);
