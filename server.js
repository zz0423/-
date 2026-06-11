const http = require("http");
const fs = require("fs");
const path = require("path");
const { generateLibStyle } = require("./libStyleSkill");
const { generateLoraPackage } = require("./loraModelSkill");
const { generateIpSkin } = require("./ipSkinSkill");
const { submitLoraText2Img, getGenerationStatus } = require("./liblibClient");
const { generateGptImage } = require("./openaiImageClient");

const root = __dirname;
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT || 4173);
const corsOrigin = process.env.CORS_ORIGIN || "*";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function writeCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", corsOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
}

function sendJson(res, status, data) {
  writeCorsHeaders(res);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8"
  });
  res.end(JSON.stringify(data));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("请求体过大"));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("请求体不是有效 JSON"));
      }
    });
    req.on("error", reject);
  });
}

async function handleGenerate(req, res) {
  try {
    const body = await readJson(req);
    const targetUrl = body.url;

    if (body.method === "gpt") {
      const skinResult = generateIpSkin(body.input || {});
      const imageResult = await generateGptImage({
        prompt: skinResult.plan.positivePrompt,
        count: body.input?.count
      });

      sendJson(res, 200, {
        ...skinResult,
        openaiImage: imageResult
      });
      return;
    }

    if (!targetUrl || !/^https?:\/\//.test(targetUrl)) {
      sendJson(res, 400, { error: "请填写 http(s) API 链接" });
      return;
    }

    if (body.method === "lib" && targetUrl.includes("liblib.art/modelinfo")) {
      sendJson(res, 200, generateLibStyle(body.input || {}, targetUrl));
      return;
    }

    if (body.method === "lora" && targetUrl.includes("liblib.art/modelinfo")) {
      const packageResult = generateLoraPackage(body.input || {}, targetUrl);
      const submitResult = await submitLoraText2Img(packageResult.loraPackage);
      sendJson(res, 200, {
        ...packageResult,
        liblibApi: submitResult
      });
      return;
    }

    const upstream = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        method: body.method,
        input: body.input
      })
    });

    const text = await upstream.text();
    let data = text;

    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }

    if (!upstream.ok) {
      sendJson(res, upstream.status, {
        error: "上游接口调用失败",
        status: upstream.status,
        data
      });
      return;
    }

    sendJson(res, 200, {
      method: body.method,
      data
    });
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

function serveStatic(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(root, pathname));

  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream"
    });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    writeCorsHeaders(res);
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    sendJson(res, 200, {
      ok: true,
      service: "ip-lora-gpt-lib-toolkit"
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/generate") {
    handleGenerate(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/liblib/status") {
    readJson(req)
      .then((body) => getGenerationStatus(body.generateUuid))
      .then((data) => sendJson(res, 200, data))
      .catch((error) => sendJson(res, 500, { error: error.message }));
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method not allowed");
});

server.listen(port, host, () => {
  console.log(`IP generator running at http://${host}:${port}`);
});
